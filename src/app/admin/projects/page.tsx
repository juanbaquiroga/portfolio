"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addProject, getTechnologies } from "@/lib/firebase";
import { Technology } from "@/interfaces";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import { Ititle } from "@/interfaces/title.interface";
import { Title } from "@/components/Title";
import styles from './projects.module.scss'
import gsap from "gsap";
import { ImageUploader } from "@/components/ImageUploader";


const title:Ititle = {
  d: "M25.8241 116.132C7.00002 110 -7.5002 144.632 25.8241 144.632C43.4997 144.632 68.282 128.496 94.7391 94.6325M175.824 5.13245C157 5.13242 128.324 44.6324 114.824 66.1324C108.34 76.3101 101.57 85.8899 94.7391 94.6325M96.3242 45.6325C57.8242 116.132 -21.1758 82.6325 51.8242 27.6325C114.824 -11.8675 240.224 23.6325 153.824 85.6325C118.324 105.632 94.7391 94.6325 94.7391 94.6325M175.824 113.132C188.158 99.1325 213.524 67.5325 216.324 53.1325C219.824 35.1325 198.324 71.6325 207.324 75.1325C216.324 78.6325 223.324 79.1325 233.824 72.6325C244.324 66.1325 222.324 101.632 220.324 103.132C218.324 104.632 198.324 145.632 233.824 120.132C269.324 94.6325 277.324 69.1325 266.324 80.1325C255.324 91.1325 240.824 134.132 259.324 132.632C277.824 131.132 294.324 114.133 299.824 90.1325C305.324 66.1325 284.324 63.1325 266.324 75.1325C248.324 87.1325 257.824 121.632 271.824 121.632C281.157 125.466 304.924 126.132 325.324 98.1325C350.824 63.1325 327.824 97 327.824 101.132C316.266 127.255 289 181.5 271.824 195.5C254 216.5 226 214.5 237.5 185C244.5 169.123 332.451 133.162 348 104.5C351.454 98.1325 374.5 85 389 82.5C403.558 79.9898 400.022 50.5515 369.5 71.1324C340 97.1324 345.5 137.5 369.5 126C376.833 123 404.146 108.5 405.5 103.5C412 79.5 466.5 43 445.5 88C442 95.5 451 79.5902 451 74C451 69.5 448.5 53 416.5 88C406.166 101.789 401.5 133.5 429.5 123.5C457.5 113.5 466 97.1324 466 97.1324C485.5 67.5 531.5 1 502 35.5C496.333 44.5 486.2 62.4 491 62C495.8 61.6 507.666 61.8333 513 62C518.333 62.1667 465 62.5 472.5 62C480 61.5 487 61.5 485.5 64C468.5 88.5 443.5 136.5 475.5 123.5C507.5 110.5 536 65.5 545.5 52.5C555 39.5 541.5 44 540 54.5C538.5 65 547.5 128.25 534 126C516 121.5 499.5 121.5 519 130C543.5 140.68 565.5 129 563.5 106M345 69V70H346V69H345Z",
  viewBox: "0 0 569 215",
  strokeDash: 2000,
  color: "accent",
  strokeWidth: 11,
  type: "oneTime",
  duration: 1,
  delay: 0.45
}
interface PreviewImage {
  id: string; // ID único necesario para la librería @dnd-kit (Draggable/Sortable)
  url: string; // URL temporal de previsualización creada con URL.createObjectURL(file)
  file: File; // Objeto File original asociado a la imagen, necesario para actualizar react-hook-form y la subida final
}

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description_en: z.string().min(1, "English description is required"),
  description_es: z.string().min(1, "Spanish description is required"),
  coverImage: z.any().refine(file => file?.length > 0, "Cover image is required"),
  images: z.any().refine(file => file?.length > 0, "At least one image is required"),
  technologies: z.array(z.string()).min(1, "Select at least one technology"),
  links: z
    .array(
      z.object({
        title: z.string().min(1, "Link title is required"),
        url: z.string().url("Invalid URL"),
      })
    )
    .optional(),
  featured: z.boolean().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const ProjectsPage = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [activeTab, setActiveTab] = useState(0); 
  const router = useRouter();

  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [carouselPreviews, setCarouselPreviews] = useState<PreviewImage[]>([]);
  const [carouselFiles, setCarouselFiles] = useState<File[]>([]); 

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionEnRef = useRef<HTMLDivElement>(null);
  const descriptionEsRef = useRef<HTMLDivElement>(null);
  const coverImageRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const technologiesRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    trigger, 
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      links: [{ title: "", url: "" }],
      featured: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const watchedCoverImage = watch('coverImage');
  const watchedImages = watch('images');


  // ===============================================
  // FUNCIONES DE ANIMACIÓN CON GSAP
  // ===============================================

  // 1. Animación de entrada inicial de todos los elementos
  const animateEntrance = () => {
    // Animación del subtítulo y el botón de acción inicial
    gsap.fromTo(containerRef.current,{scale: 0.8,opacity:0, x: 0, y:0}, { scale: 1, opacity: 1, x:0, y:0, boxShadow: "none", duration: 0.35, transformOrigin: "center center", ease: "elastic.out(1.1, 1.3)" });
    
    // Animación secuencial de los campos del primer paso
    const firstStepFields = tabContentRef.current?.querySelectorAll(`.step-0 .${styles.formGroup}, .step-0 .${styles.stepTitle}`);
    if (firstStepFields) {
        gsap.fromTo(firstStepFields, 
            { opacity: 0, scale: 0.8 }, 
            { 
                opacity: 1, 
                scale: 1, 
                duration: 0.4, 
                stagger: 0.1, // Aparecen en secuencia
                ease: "elastic.out(1.1, 1.3)",
                delay: 0.6 
            }
        );
    }
    const actions = actionsRef.current?.querySelectorAll(`.${styles.formActions} button`);
    if (actions) {
        gsap.fromTo(actions, 
            { opacity: 0, scale: 0.8 }, 
            { 
                opacity: 1, 
                scale: 1, 
                duration: 0.4, 
                stagger: 0.1, // Aparecen en secuencia
                ease: "elastic.out(1.1, 1.3)",
                delay: 1.1
            }
        );
    }
  };

  // 2. Animación de transición entre pasos
  const animateStepTransition = (direction: 'next' | 'back', newTab: number) => {
    if (!tabContentRef.current || !actionsRef.current) return;
    
    // Contenido actual (el que sale)
    const currentContent = tabContentRef.current.querySelector(`.step-${activeTab}`);
    
    // Botones de acción (el que desaparece/vuelve a entrar)
    const actionButtons = actionsRef.current.querySelectorAll(`.${styles.button}`);
    
    
    const tl = gsap.timeline();

    // 1. ANIMACIÓN DE SALIDA: Contenido actual y Botones
    tl.to([currentContent, actionButtons], {
        opacity: 0,
        scale: 0.8, // Escalar hacia adentro
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.05,
        onComplete: () => {
            // 2. CAMBIAR ESTADO: Esto hace que el nuevo contenido entre al DOM
            setActiveTab(newTab);
        }
    })
    
    // 3. ANIMACIÓN DE ENTRADA: Botones de Acción (Primero para que estén listos)
    // Usamos 'label' para apuntar al inicio de la animación del contenido.
    .addLabel("startNewContent", "+=0.1") 
    .fromTo(actionButtons, 
        { opacity: 0, scale: 0.8 }, 
        { 
            opacity: 1, 
            scale: 1, 
            duration: 0.4, 
            stagger: 0.1, 
            ease: "elastic.out(1.1, 1.3)", // Tu efecto elástico
        }, "startNewContent")
        
    // 4. ANIMACIÓN DE ENTRADA: Nuevo Contenido (Campos del formulario)
    // El nuevo contenido ya está en el DOM gracias a setActiveTab()
    .fromTo(`.step-${newTab} > *`, // Selecciona todos los hijos (título, formGroup, etc.)
        { opacity: 0, scale: 0.8 }, 
        { 
            opacity: 1, 
            scale: 1, 
            duration: 0.6, 
            stagger: 0.1, 
            ease: "elastic.out(1.1, 1.3)", // Tu efecto elástico
            clearProps: "all" // Limpia las propiedades de GSAP al terminar
        }, "<") // Usa '<' para que empiece al mismo tiempo que los botones (o un poco después)
};


  // ===============================================

  useEffect(() => {
    const fetchTech = async () => {
      const tech = await getTechnologies();
      setTechnologies(tech);
    };
    fetchTech();

    // Llamada a la animación inicial
    animateEntrance();
  }, []);// Cover Image Preview
  const handleCoverSelect = (newFilesList: FileList | null) => {
    if (!newFilesList || newFilesList.length === 0) {
        // Si no se selecciona nada, limpiamos (aunque el input se resetea)
        handleRemoveCoverImage(0); 
        return;
    }
    
    // Al ser mode='single', solo nos interesa el primer archivo (newFilesList[0])
    const file = newFilesList[0];
    
    // 1. Crear la URL de previsualización
    const newUrl = URL.createObjectURL(file);
    setCoverPreviewUrl(newUrl); // Actualiza el estado de la preview
    
    // 2. Actualizar react-hook-form con el FileList.
    // Creamos un nuevo DataTransfer para simular el FileList con solo el nuevo archivo.
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    setValue('coverImage', dataTransfer.files, { shouldValidate: true });
};

  // Carousel Images Preview (Sin DND, solo para visualización)
  useEffect(() => {
    const files = Array.from(watchedImages || []) as File[];
    if (files.length > 0) {
        // Al seleccionar archivos, generamos nuevas previews
        const newPreviews: PreviewImage[] = files.map(file => ({
            id: `${Date.now()}-${file.name}`, 
            url: URL.createObjectURL(file),
            file: file,
        }));
        // Nota: No se mantiene el estado anterior si se selecciona una nueva lista
        setCarouselPreviews(newPreviews);
    } else if (watchedImages === null || watchedImages === undefined || watchedImages.length === 0) {
      setCarouselPreviews([]);
    }
  }, [watchedImages]); // Dependencia del campo de react-hook-form

  const generatePreviewItem = (file: File): PreviewImage => ({
    id: `${Date.now()}-${Math.random()}-${file.name}`,
    url: URL.createObjectURL(file),
    file: file,
});

// ⬅️ ¡NUEVA FUNCIÓN CLAVE! Maneja la adición incremental
const handleCarouselSelect = (newFilesList: FileList | null) => {
    if (!newFilesList || newFilesList.length === 0) return;

    const newFilesArray = Array.from(newFilesList);
    
    // Combinar archivos existentes con los nuevos
    const combinedFiles = [...carouselFiles, ...newFilesArray];
    
    // Aplicar límite si es necesario (ej: maxFiles = 10)
    const max = 10; 
    const finalFiles = combinedFiles.slice(0, max); 

    // 1. Actualizar el estado interno de archivos
    setCarouselFiles(finalFiles); 

    // 2. Generar las previews a partir de la nueva lista de archivos
    const newPreviews = finalFiles.map(generatePreviewItem);
    setCarouselPreviews(newPreviews);
    
    // 3. Actualizar react-hook-form con el FileList completo y validamos
    const dataTransfer = new DataTransfer();
    finalFiles.forEach(file => dataTransfer.items.add(file));
    setValue('images', dataTransfer.files, { shouldValidate: true });
};
  // 🛑 FUNCIÓN PARA REMOVER LA IMAGEN DE PORTADA
  const handleRemoveCoverImage = (indexToRemove: number) => {
    // 1. Limpiar la URL de previsualización (es crucial para evitar fugas de memoria)
    if (coverPreviewUrl) {
        URL.revokeObjectURL(coverPreviewUrl);
    }
    setCoverPreviewUrl(null);
    
    // 2. Limpiar el valor en react-hook-form
    setValue('coverImage', undefined, { shouldValidate: true });
};


  // 🛑 FUNCIÓN PARA REMOVER UNA IMAGEN DEL CARRUSEL (SIN REORDENACIÓN)
  const handleRemoveCarouselImage = (indexToRemove: number) => {
    // 1. Filtrar las previews
    const newPreviews = carouselPreviews.filter((_, index) => index !== indexToRemove);
    setCarouselPreviews(newPreviews);

    // 2. Filtrar la lista de archivos reales
    const newFiles = carouselFiles.filter((_, index) => index !== indexToRemove);
    setCarouselFiles(newFiles); // Actualizar el estado incremental

    // 3. Actualizar el campo 'images' de react-hook-form
    const dataTransfer = new DataTransfer();
    newFiles.forEach(file => dataTransfer.items.add(file));
    setValue('images', dataTransfer.files, { shouldValidate: true });
    
    // 4. Limpiar URL obsoleta (Opcional, pero buena práctica)
    URL.revokeObjectURL(carouselPreviews[indexToRemove].url);
};

  const uploadFile = async (file: File, slug: string, cover:boolean, index?: number) => {
    const formData = new FormData();
    formData.append('imageFile', file);
    formData.append('slug', slug);
    cover? formData.append("name", "cover"): formData.append("name", `image${index}`);

    const response = await fetch(`/api/upload-blob`, {
      method: "POST",
      body: formData,
    });
    const { url } = await response.json();
    return url;
  };

  const onSubmit = async (data: ProjectFormData) => {
    const slug = slugify(data.title, { lower: true, strict: true });
    try {
      const coverImageUrl = await uploadFile(data.coverImage[0], slug, true);
      const imageUrls = await Promise.all(
        Array.from(data.images as FileList).map((file, index) => uploadFile(file, slug, false, index + 1))
      );

      const selectedTechnologies = technologies.filter((tech) =>
        data.technologies.includes(tech.id)
      );

      const newProject = {
        title: data.title,
        slug: slug,
        description: {
          en: data.description_en,
          es: data.description_es,
        },
        coverImage: coverImageUrl,
        images: imageUrls,
        technologies: selectedTechnologies,
        links: data.links || [],
        featured: data.featured || false,
      };

      await addProject(newProject);
      router.push("/admin");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };
  
  const handleNext = async () => {
    let fieldsToValidate: (keyof ProjectFormData)[] = [];

    if (activeTab === 0) {
      fieldsToValidate = ['title', 'description_en', 'description_es'];
    } else if (activeTab === 1) {
      fieldsToValidate = ['coverImage', 'images'];
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
        // Animación de paso hacia adelante
        animateStepTransition('next', activeTab + 1);
    }
  };

  const handleBack = () => {
    if (activeTab > 0) {
      // Animación de paso hacia atrás
      animateStepTransition('back', activeTab - 1);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      gsap.to(e.target, { scale: 1.02, duration: 0.2, ease: "power2.out" });
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      gsap.to(e.target, { scale: 1, duration: 0.2, ease: "power2.out" });
  };
  

  return (
    <main className={styles.main}>
        <div className={styles.container} ref={containerRef}>
          <Title title={title} />
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            
            <div className={styles.tabContent} ref={tabContentRef}>
              
              {/* === PASO 0: Basic Info (Title, Descriptions) === */}
              {activeTab === 0 && (
                <div className={`${styles.stepContent} step-0`}>
                  <h3 className={styles.stepTitle}>Step 1: Basic Information</h3>
                  <div ref={titleRef} className={styles.formGroup}>
                    <label htmlFor="title" className={styles.label}>Title</label>
                    <input {...register("title")} className={styles.input} type="text" id="title" onFocus={handleFocus} onBlur={handleBlur}/>
                    {errors.title && <p className={styles.error}>{errors.title.message}</p>}
                  </div>
                  <div className={styles.formGroup} ref={descriptionEnRef}>
                    <label htmlFor="description_en" className={styles.label}>Description (English)</label>
                    <textarea {...register("description_en")} className={styles.textarea} id="description_en" onFocus={handleFocus} onBlur={handleBlur}/>
                    {errors.description_en && <p className={styles.error}>{errors.description_en.message}</p>}
                  </div>
                  <div className={styles.formGroup} ref={descriptionEsRef}>
                    <label htmlFor="description_es" className={styles.label}>Descripción (Español)</label>
                    <textarea {...register("description_es")} className={styles.textarea} id="description_es" onFocus={handleFocus} onBlur={handleBlur}/>
                    {errors.description_es && <p className={styles.error}>{errors.description_es.message}</p>}
                  </div>
                </div>
              )}
              
              {/* === PASO 1: Media & Files === */}
              {activeTab === 1 && (
                <div className={`${styles.stepContent} step-1`}>
                  <h3 className={styles.stepTitle}>Step 2: Media and Files</h3>
                  <div className={styles.formGroup} ref={coverImageRef}>
                    <ImageUploader
                        id="coverImage"
                        label="Cover Image"
                        
                        // ⬅️ CLAVE 1: Pasamos el URL de portada como un ARRAY de items de preview
                        previewItems={coverPreviewUrl 
                            ? [{ id: 'cover', url: coverPreviewUrl }] 
                            : []
                        }
                        
                        // ⬅️ CLAVE 2: Usamos la nueva función de remoción (el componente le pasa el índice)
                        onRemoveItem={handleRemoveCoverImage} 
                        
                        // ⬅️ CLAVE 3: Pasamos la nueva función para manejar el evento onChange del input
                        onFilesSelect={handleCoverSelect}
                        
                        // El register se mantiene solo para la validación inicial de Zod
                        register={register("coverImage")} 
                        error={errors.coverImage?.message?.toString()}
                    />
                    {errors.coverImage && <p className={styles.error}>{errors.coverImage.message?.toString()}</p>}
                </div>
                  <div className={styles.formGroup} ref={imagesRef}>
                    <ImageUploader
                      id="images"
                      label="Carousel Images"
                      mode="multiple"
                      maxFiles={10}
                      previewItems={carouselPreviews} 
                      onRemoveItem={handleRemoveCarouselImage} 
                      
                      // ⬅️ CLAVE: Pasamos la nueva función incremental
                      onFilesSelect={handleCarouselSelect} 
                      
                      // ⬅️ CLAVE: Mantenemos el register para que Zod sepa que el campo existe
                      register={register("images")} 
                      error={errors.images?.message?.toString()}
                    />
                    {errors.images && <p className={styles.error}>{errors.images.message?.toString()}</p>}
                  </div>
                </div>
              )}

              {/* === PASO 2: Metadata & Links === */}
              {activeTab === 2 && (
                <div className={`${styles.stepContent} step-2`}>
                  <h3 className={styles.stepTitle}>Step 3: Metadata and Links</h3>
                  
                  {/* Technologies */}
                  <div className={styles.formGroup} ref={technologiesRef}>
                    <label htmlFor="technologies" className={styles.label}>Technologies</label>
                    <div className={styles.technologiesContainer}>
                      {technologies.map((tech)=>(
                        <div key={tech.id} className={styles.techContainer}>
                          <input
                            className={styles.checkbox}
                            type="checkbox"
                            value={tech.id}
                            id={`technology-${tech.id}`}
                            {...register("technologies")}
                          />
                          <label className={styles.techButton} htmlFor={`technology-${tech.id}`}>{tech.title}</label>
                        </div>
                      ))}
                    </div>
                    {errors.technologies && <p className={styles.error}>{errors.technologies.message}</p>}
                  </div>
                  
                  {/* Links */}
                  <div className={styles.linksContainer} ref={linksRef}>
                    <label htmlFor="links" className={styles.label}>Links</label>
                    {fields.map((field, index)=>(
                      <div key={field.id} className={styles.linkContainer}>
                        <input {...register(`links.${index}.title`)} placeholder="Link Title" className={styles.input} />
                        <input {...register(`links.${index}.url`)} placeholder="Link URL" className={styles.input} />
                        <button className={styles.button} type="button" onClick={() => remove(index)}>Remove</button>
                      </div>
                    ))}
                    <button className={`${styles.button} ${styles.addLinkButton}`} type="button" onClick={() => append({ title: "", url: "" })}>Add Link</button>
                    {errors.links && <p className={styles.error}>{errors.links.message?.toString()}</p>}
                  </div>

                  {/* Featured Checkbox */}
                  <div className={`${styles.formGroup} ${styles.featuredContainer}`} ref={featuredRef}>
                    <label className={styles.label}>
                      <input type="checkbox" {...register("featured")} className={styles.checkboxVisible} />
                      Featured Project (Mostrar en página principal)
                    </label>
                  </div>
                </div>
              )}

            </div> 
            
            {/* Botones de navegación y sumit */}
            <div className={styles.formActions} ref={actionsRef}>
              {activeTab > 0 && (
                <button type="button" className={`${styles.button} ${styles.backButton}`} onClick={handleBack}>
                  ← Back
                </button>
              )}
              
              {activeTab < 2 ? (

                <button type="button" className={styles.button} onClick={handleNext}>
                  Next →
                </button>
              ) : (
                
                <button type="submit" className={styles.button}>
                  Create Project
                </button>
              )}
            </div>

          </form>
      </div>
    </main>
  );
};

export default ProjectsPage;