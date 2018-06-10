import { pin } from "./types";
import { PiCondition, Pi } from "./pi-sample";
export declare class Pin implements pin {
    num: number;
    Pi: Pi;
    mode: any;
    constructor(num: number, Pi: Pi);
}
export declare class InputPin extends Pin {
    constructor(num: any, Pi: any);
    getState(): any;
    setPi(Pi: any): this;
    getPi(): Pi;
}
export declare class BtnPin extends InputPin {
    constructor(num: any, Pi: any);
    watch(): BtnWatch;
}
export declare class BtnWatch {
    Btn: any;
    Pi: any;
    pressedProcesses: any[];
    releasedProcesses: any[];
    piCondition: PiCondition;
    constructor(Btn: any, Pi: any);
    start(): this;
    stop(): void;
    pressed(method: any): this;
    released(method: any): this;
    press(): void;
    release(): void;
}
