import { Hero } from "../components/UI/Hero"
import { About } from "./About"
import { ExperienceGet } from "./Experience/ExperienceGet"
import { ProfileGet } from "./Profile/ProfileGet"
import { ProjectGet } from "./Projects/ProjectGet"
import { SkillGet } from "./Skills/SkillGet"

export const Home =()=>{
    return (
        <>
         <Hero/>
         <ExperienceGet/>
         <ProjectGet/>
         <SkillGet/>
         {/* <ProfileGet/> */}
        </>
    )
}