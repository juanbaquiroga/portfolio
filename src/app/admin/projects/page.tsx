"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addProject, getTechnologies } from "@/lib/firebase";
import { Technology } from "@/interfaces";
import { useRouter } from "next/navigation";
import slugify from "slugify";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description_en: z.string().min(1, "English description is required"),
  description_es: z.string().min(1, "Spanish description is required"),
  coverImage: z.any(),
  images: z.any(),
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
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
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

  useEffect(() => {
    const fetchTech = async () => {
      const tech = await getTechnologies();
      setTechnologies(tech);
    };
    fetchTech();
  }, []);

  const uploadFile = async (file: File) => {
    const response = await fetch(`/api/upload-blob?filename=${file.name}`, {
      method: "POST",
      body: file,
    });
    const { url } = await response.json();
    return url;
  };

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const coverImageUrl = await uploadFile(data.coverImage[0]);
      const imageUrls = await Promise.all(
        Array.from(data.images as FileList).map((file) => uploadFile(file))
      );

      const selectedTechnologies = technologies.filter((tech) =>
        data.technologies.includes(tech.id)
      );

      const newProject = {
        title: data.title,
        slug: slugify(data.title, { lower: true, strict: true }),
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <input {...register("title")} placeholder="Title" />
      {errors.title && <p>{errors.title.message}</p>}

      {/* Descriptions */}
      <textarea {...register("description_en")} placeholder="Description (EN)" />
      {errors.description_en && <p>{errors.description_en.message}</p>}
      <textarea {...register("description_es")} placeholder="Description (ES)" />
      {errors.description_es && <p>{errors.description_es.message}</p>}

      {/* File Uploads */}
      <label>Cover Image</label>
      <input type="file" {...register("coverImage")} />
      {errors.coverImage && <p>{errors.coverImage.message?.toString()}</p>}

      <label>Project Images</label>
      <input type="file" {...register("images")} multiple />
      {errors.images && <p>{errors.images.message?.toString()}</p>}

      {/* Technologies */}
      <label>Technologies</label>
      <div>
        {technologies.map((tech) => (
          <div key={tech.id}>
            <input
              type="checkbox"
              value={tech.id}
              {...register("technologies")}
            />
            <label>{tech.title}</label>
          </div>
        ))}
      </div>
      {errors.technologies && <p>{errors.technologies.message}</p>}

      {/* Links */}
      <label>Links</label>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            {...register(`links.${index}.title`)}
            placeholder="Link Title"
          />
          <input {...register(`links.${index}.url`)} placeholder="Link URL" />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ title: "", url: "" })}>
        Add Link
      </button>

      {/* Featured */}
      <label>
        <input type="checkbox" {...register("featured")} />
        Featured Project
      </label>

      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectsPage;