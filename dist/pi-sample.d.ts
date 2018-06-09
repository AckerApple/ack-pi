import * as inputs from "./pi-inputs";
import * as outputs from "./pi-outputs";
export interface driver {
    INPUT: any;
    OUTPUT: any;
    LOW: any;
    HIGH: any;
    PUD_UP: any;
    wiringPiSetup: () => number;
    pinMode: (pin: number, type: any) => void;
    digitalRead: (pin: number) => any;
    digitalWrite: (pin: number, freq: any) => void;
    pullUpDnControl: (pin: number, state: any) => void;
    softPwmCreate: (pin: number, low: any, high: any) => void;
    softPwmWrite: (pin: number, freq: any) => void;
}
export declare function pi(driver: driver): Pi;
export declare class PiCondition {
    falses: any[];
    thens: (() => any)[];
    lastResult: any;
    condition: any;
    reader: () => any;
    constructor(reader: any, condition: any);
    setLastState(state: any): this;
    then(t: any): this;
    onFalse(f: any): this;
    process(): void;
    processThens(): void;
    processFalses(value: any): void;
}
export declare class Pi {
    driver: driver;
    conditions: PiCondition[];
    interval: number;
    constructor(driver?: driver);
    connect(): this;
    start(): this;
    stop(): void;
    process(): void;
    when(reader: any, condition: any): PiCondition;
    killCondition(piCondition: any): this;
    outputPin(num: any): outputs.OutputPin;
    buzzer(num: any): outputs.Buzzer;
    relay(num: any): outputs.Relay;
    power(num: any): outputs.Power;
    led(num: any): outputs.Led;
    inputPin(num: any): inputs.InputPin;
    btnPin(num: any): inputs.BtnPin;
}
