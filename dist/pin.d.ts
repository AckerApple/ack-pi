import { pin } from "./types";
import { Pi } from "./pi-sample";
export declare class Pin implements pin {
    num: number;
    Pi: Pi;
    type: "INPUT" | "OUTPUT";
    mode?: "HIGH" | "LOW";
    constructor(num: number, Pi: Pi);
}
