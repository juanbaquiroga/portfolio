"use client"
import React, {useState, useEffect } from "react";
import { getProjects, getTechnologies } from "@/lib/firebase";
import { Project, Technology } from "@/interfaces";
import Link from "next/link";
import { Card } from "@/components/Slider/Card";
import styles from "./admin.module.scss"
import { Loading } from "@/components/Loading";
import { Ititle } from "@/interfaces/title.interface";
import { Title } from "@/components/Title";
import { Projects } from "@/layouts/Projects";
import { Slider } from "@/components/Slider";

const title: Ititle = {
    d: "M34.2436 113.5C-4 91.5 -16.9999 169.641 34.2439 149C69.0002 135 145.5 1 145.5 1C145.5 1 107 152 149.5 147.5C180.5 141 191.5 138.5 217.375 108.535C235.5 59.5 178.75 96.9999 169 116.5C157.75 139 174.5 153.5 202.5 122.5C356 -18.5001 270 -29 222 100C221.256 102 215.688 110.929 213 118.5C195.284 168.399 241.424 134.39 260 116.5C267 107.5 269.962 91.5 269 84C268.231 78 273 105.5 246.5 144C233.5 151.5 346 -11.5 297 135C279 149 380 35.5 342 116.5C317.5 173 373.5 122.5 378 113.5C378 113.5 395 90 395 88C395 80.5 333.5 189 407 115C432.5 69.5 427.039 62.588 425.5 76C424.123 88 389.5 152 392 144C398.18 124.225 499 37 449 106.5C416.5 170.5 478 124 479.5 113.5M69.5002 85.4999C78.5002 72.9999 95.2142 80.4999 113.5 80.4999C131.061 80.4999 153.5 84 158.5 71.9999M404 69V70H405V69H404Z",
    viewBox: "-5 -5 490 162",
    strokeDash: 2500,
    color: "accent",
    strokeWidth: 10,
    type: "oneTime"
}

export default function AdminPage() {
    const [ projects, setProjects ] = useState<Project[]>([]);
    const [ technologies, setTechnologies ] = useState<Technology[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(()=>{
        const fetchData= async ()=>{
            try{
                setLoading(true);
                const [projectsData, technologiesData] = await Promise.all([
                    getProjects(),
                    getTechnologies(),
                ])
                setProjects(projectsData);
                setTechnologies(technologiesData);
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

    if (loading){
        return <Loading/>
    }


    if (error){
        return <div>Error: {error}</div>
    }
  return(
        <main className={styles.main}>
            <Title title={title}/>
            <section className={styles.section}>
                <Slider items={technologies} speed="slow" pauseOnHover={true} />
                {/* {technologies.length>0?(
                    <div className={styles.container}>
                        {technologies.map((technology)=>(
                            <Card key={technology.id} {...technology} />
                        ))}
                    </div>
                ):(
                    <p>No technologies found</p>
                )} */}
                <Link href="/admin/technologies">
                    <button>Add New Technology</button>
                </Link>
            </section>
            <Projects />
            {/* <section>
                {projects.length>0?(
                    <ul>
                        {projects.map((project)=>(
                            <li key={project.id}>{project.title}</li>
                        ))}
                    </ul>
                ):(
                    <p>No projects found</p>
                )}
                </section> */}
                <Link href="/admin/projects">
                    <button>Add New Project</button>
                </Link>
        </main>
    )
}