import { pin } from "./types";
import { Pi } from "./pi-sample";
export declare class Pin implements pin {
    num: number;
    Pi: Pi;
    mode: "high" | "low" | any;
    type: "INPUT" | "OUTPUT";
    constructor(num: number, Pi: Pi);
}
