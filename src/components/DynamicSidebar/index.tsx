// DynamicSidebar.jsx
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("@/layouts/Sidebar"), {
    ssr: false, // Carga el componente solo en el cliente
    loading: () => <p>Loading...</p>, // Indicador mientras carga
});

export default Sidebar;
