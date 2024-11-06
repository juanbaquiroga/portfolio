import { Background } from "@/components/Background";
import { About_me } from "@/mobile/About_me";
import { Contact } from "@/mobile/Contact";
import { Main } from "@/mobile/Main";
import { Projects } from "@/mobile/Projects";
import { Technologies } from "@/mobile/Technologies";


export default function Home() {
  return (
    <>
    <Main/>
    <About_me/>
    <Background/> 
    <Projects/>
    <Technologies/>
    <Contact/>
    </>
  );
}
