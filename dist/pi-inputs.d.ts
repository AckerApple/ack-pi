import { PiCondition, Pi } from "./pi-sample";
import { Pin } from "./Pin";
export declare class InputPin extends Pin {
    type: "INPUT";
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
