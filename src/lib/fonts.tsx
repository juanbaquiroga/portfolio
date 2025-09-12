import { Inter, Julius_Sans_One, Poppins, Kumbh_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const jls = Julius_Sans_One({ subsets: ["latin"], weight: ["400"] });
const poppins = Poppins({ subsets: ["latin"], weight:["200","300","400","600"]})
const kumbh = Kumbh_Sans({ subsets: ["latin"], weight:["200","300","400", "500", "600"]})

export const fonts = {inter, jls, kumbh, poppins} 