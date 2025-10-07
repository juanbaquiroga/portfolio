"use client"
import React, {useState, useEffect } from "react";
import { getProjects, getTechnologies } from "@/lib/firebase";
import { Project, Technology } from "@/interfaces";
import Link from "next/link";

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
        return <div>Loading Dashboard...</div>
    }


    if (error){
        return <div>Error: {error}</div>
    }
  return(
        <div>
            <h1>Admin Dashboard</h1>
            <section>
                <h2>Projects ({projects.length})</h2>
                {projects.length>0?(
                    <ul>
                        {projects.map((project)=>(
                            <li key={project.id}>{project.title}</li>
                        ))}
                    </ul>
                ):(
                    <p>No projects found</p>
                )}
                <Link href="/admin/projects">
                    <button>Add New Project</button>
                </Link>
            </section>
        </div>
    )
}