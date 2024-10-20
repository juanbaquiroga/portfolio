import { Main } from "@/components/Main"
import { About_me } from "@/components/About_me";
import Sidebar from "@/components/Sidebar";
import { Background } from "@/components/Background";
import { Projects } from "@/components/Projects";
import { Technologies } from "@/components/Technologies";

export default function Home() {
  return (
    <>
    {/* <Sidebar/>*/}
    <Background/> 
    <Main />
    <About_me/>
    <Projects/>
    <Technologies/>
    <div style={{"height":"100vh"}}>
    </div>
    </>
  );
}
