import { Main } from "@/layouts/Main"
import { About_me } from "@/layouts/About_me";
import Sidebar from "@/layouts/Sidebar";
import { Background } from "@/components/Background";
import { Projects } from "@/layouts/Projects";
import { Technologies } from "@/layouts/Technologies";
import { Contact } from "@/layouts/Contact";

export default function Home() {
  return (
    <>
    {/* <Sidebar/>*/}
    <Background/> 
    <Main />
    <About_me/>
    <Projects/>
    <Technologies/>
    <Contact/>
    <div style={{"height":"100vh"}}>
    </div>
    </>
  );
}
