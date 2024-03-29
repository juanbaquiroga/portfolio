import React from "react";
import Courses from "./courses/ContainerCursos";
import ContainerSkills from "./skills/SkillsContainer";
import Projects from "./projects/ContainerPojects";
import down from "../../assets/down.png";
import { VscGithubAlt } from 'react-icons/vsc';
import { CiLinkedin } from 'react-icons/ci';
const Home =() =>{
    
    return(
        <>

        <main className="inicio">
            <h1 className="title">Hi, I am <br></br> Juan Bautista</h1>
            <h3 className="title2">full stack developer</h3>

            <div className="networks">
                <a alt='github' className="socialNetwork" href="https://github.com/juanbaquiroga"><VscGithubAlt style={{fontSize:'40px'}}/></a>
                <a alt='linkedin' className="socialNetwork" href="https://linkedin.com/in/juanbaquiroga"><CiLinkedin style={{fontSize:'40px'}}/></a>
            </div>
            <a href="#courses"><img className="arrow-down" src={down} alt="arrow down" /></a>
        </main>
            <Courses/>
            <ContainerSkills/>
            <Projects/>
        </>
    )
}
export default Home