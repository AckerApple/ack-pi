import * as inputs from './pi-inputs';
export declare class OutputPin extends inputs.Pin {
    Pi: any;
    isHigh: boolean;
    interval: number;
    num: number;
    constructor(num: any, Pi: any);
    destroy(): void;
    setupOnOff(): void;
    pinMode(freq: any): void;
    softPwmCreate(lowNum: any, highNum: any): void;
    softPwmWrite(index: any): void;
    low(): this;
    high(): this;
    toggle(): void;
    toggleUpdate(): void;
    blink(interval: any): void;
    blinkExactly(num: any, delay: any): Promise<{}>;
    breath(pace: any, gap: any): void;
}
export declare class Power extends OutputPin {
    offIsLow: boolean;
    off(): this;
    on(): this;
    destroy(): void;
}
export declare class Led extends Power {
}
export declare class Buzzer extends Power {
}
export declare class Relay extends OutputPin {
    offIsLow: boolean;
    off(): this;
    on(): this;
    close(): this;
    open(): this;
    destroy(): void;
}