import styles from "./Projects.module.scss"
import { useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Ititle } from "@/interfaces/title.interface";
import { Project, Technology } from "@/interfaces";
import { Title } from "@/components/Title";
import { gsap } from "gsap";
import { useGsapInView } from '@/hooks/useGsapInView';
import { getProjects, getTechnologies } from "@/lib/firebase";

const title:Ititle = {
  d: "M25.8241 116.132C7.00002 110 -7.5002 144.632 25.8241 144.632C43.4997 144.632 68.282 128.496 94.7391 94.6325M175.824 5.13245C157 5.13242 128.324 44.6324 114.824 66.1324C108.34 76.3101 101.57 85.8899 94.7391 94.6325M96.3242 45.6325C57.8242 116.132 -21.1758 82.6325 51.8242 27.6325C114.824 -11.8675 240.224 23.6325 153.824 85.6325C118.324 105.632 94.7391 94.6325 94.7391 94.6325M175.824 113.132C188.158 99.1325 213.524 67.5325 216.324 53.1325C219.824 35.1325 198.324 71.6325 207.324 75.1325C216.324 78.6325 223.324 79.1325 233.824 72.6325C244.324 66.1325 222.324 101.632 220.324 103.132C218.324 104.632 198.324 145.632 233.824 120.132C269.324 94.6325 277.324 69.1325 266.324 80.1325C255.324 91.1325 240.824 134.132 259.324 132.632C277.824 131.132 294.324 114.133 299.824 90.1325C305.324 66.1325 284.324 63.1325 266.324 75.1325C248.324 87.1325 257.824 121.632 271.824 121.632C281.157 125.466 304.924 126.132 325.324 98.1325C350.824 63.1325 327.824 97 327.824 101.132C316.266 127.255 289 181.5 271.824 195.5C254 216.5 226 214.5 237.5 185C244.5 169.123 332.451 133.162 348 104.5C351.454 98.1325 374.5 85 389 82.5C403.558 79.9898 400.022 50.5515 369.5 71.1324C340 97.1324 345.5 137.5 369.5 126C376.833 123 404.146 108.5 405.5 103.5C412 79.5 466.5 43 445.5 88C442 95.5 451 79.5902 451 74C451 69.5 448.5 53 416.5 88C406.166 101.789 401.5 133.5 429.5 123.5C457.5 113.5 466 97.1324 466 97.1324C485.5 67.5 531.5 1 502 35.5C496.333 44.5 486.2 62.4 491 62C495.8 61.6 507.666 61.8333 513 62C518.333 62.1667 465 62.5 472.5 62C480 61.5 487 61.5 485.5 64C468.5 88.5 443.5 136.5 475.5 123.5C507.5 110.5 536 65.5 545.5 52.5C555 39.5 541.5 44 540 54.5C538.5 65 547.5 128.25 534 126C516 121.5 499.5 121.5 519 130C543.5 140.68 565.5 129 563.5 106M345 69V70H346V69H345Z",
  viewBox: "0 0 569 215",
  strokeDash: 2000,
  color: "accent",
  strokeWidth: 11,
  type: "inView",
  duration: 0.65,
}

const ProjectCard = ({ item, selected, setSelectedId }: { item: Project; selected: boolean; setSelectedId: (id: string | null) => void }) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const inView = useGsapInView(innerRef as any, { margin: "100000px 0px -100px 0px" });
  
  useEffect(() => {
    if (selected && inView) {
      gsap.fromTo(innerRef.current,{scale: 0.6, top: "50%", left: "50%", x:"-50%", y: "-50%"}, { scale: 1, top: "50%", left: "50%", x:"-50%", y: "-50%", transformOrigin: "center center", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", duration: 0.35, ease: "elastic.out(1.1, 1.3)" });
    } else if (!selected && inView){
      gsap.fromTo(innerRef.current,{scale: 0.8,opacity:0, x: 0, y:0}, { scale: 1, opacity: 1, x:0, y:0, boxShadow: "none", duration: 0.35, transformOrigin: "center center", ease: "elastic.out(1.1, 1.3)" });
    } else {
      gsap.fromTo(innerRef.current, {scale: 1, opacity: 1}, { scale: 0.8, opacity: 0, x: 0, y:0, duration: 0.3, ease: "elastic.out(1.1, 1.3)" });
    }
  }, [selected, inView]);
  
  return (
    <div className={styles.itemOuter}>
      <div
        ref={innerRef}
        className={selected ? styles.itemInnerSelected : styles.itemInner}
        onClick={() => setSelectedId(item.id)}
        >
        <img src={item.coverImage} alt={item.title} className={styles.img} />
        <div className={styles.overlay} style={{ display: selected? "flex": "none",pointerEvents: selected ? "auto" : "none", opacity: selected ? 1 : 0, transition: "opacity 0.2s" }} onClick={e => e.stopPropagation()}>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>{item.title}</h2>
            <p className={styles.description}>{item.description.en}</p>
          </div>
          <div className={styles.buttonsContainer}>
            {
              item.links?.map((link) => (
                <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.button} key={link.url}>{link.title}</a>
              ))
            }
          </div>
          <button className={styles.exit} onClick={() => setSelectedId(null)}>
            <svg className={styles.svg} viewBox="0 0 384 512">
              <path className={styles.path} d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [ loading, setLoading] = useState<boolean>(false);
  const [ error, setError] = useState<string | null>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(()=>{
        const fetchData= async ()=>{
            try{
                setLoading(true);
                const projectsData = await getProjects();
                setProjects(projectsData);
                setError(null);
            }catch(err){
                console.error("Error fetching data: ", err);
                setError("Failed to load data. Please try again later.");
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    },[])
  useEffect(() => {
    if (selectedId) {
      gsap.fromTo(backgroundRef.current,{opacity: 0, display: "flex"}, {display: "flex", opacity: 1, duration: 0.25, ease: "power2.out" });
    } else {
      gsap.fromTo(backgroundRef.current,{opacity: 1}, { opacity: 0, duration: 0.2, ease: "power2.out" });
      gsap.to(backgroundRef.current, { delay: 0.2, duration: 0, display: "none" });
    }
  }, [selectedId])

  return (
    <section id="projects" className={styles.projects}>
      <div ref={backgroundRef} className={styles.background} onClick={()=>setSelectedId(null)}/>
      <div className={styles.container} >
        <Title title={title} />
        <div className={styles.projectsContainer}>
          {projects && projects.map((item) => (
            <ProjectCard
              key={item.id}
              item={item}
              selected={selectedId === item.id}
              setSelectedId={setSelectedId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
