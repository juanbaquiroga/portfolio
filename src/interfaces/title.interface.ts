export interface Ititle {
    d:string;
    viewBox:string;
    strokeDash:number;
    color:"accent"|"color-2";
    strokeWidth: number;
    type: "inView" | "loading" | "oneTime";
    delay?: number;
    duration?: number;
}