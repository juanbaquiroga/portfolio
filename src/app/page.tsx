import { Main } from "@/components/Main"
import { About_me } from "@/components/About_me";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <>
    <Sidebar/>
    <Main />
    <About_me/>
    <div style={{"height":"100vh"}}>

    </div>
    </>
  );
}
