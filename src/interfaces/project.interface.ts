export interface Iproject {
    id: string;
    title: string;
    description: string;
    github?: string;
    url?: string;
    tecnologies: Array<string>;
    img: string;
}