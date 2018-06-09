export declare function op(): OrdinalProcessor;
export declare class OrdinalProcessor {
    stopped: boolean;
    started: boolean;
    index: number;
    inProcess: boolean;
    functions: any[];
    constructor();
    run(): this;
    stop(): this;
    rerun(): OrdinalProcessor;
    add(method: any, args: any): OrdinalProcessor;
    process(feed?: any): this;
    getArgsByDef(definition: any, feed: any): any[];
    then(method: any, args?: any[]): OrdinalProcessor;
    delay(ms: any): OrdinalProcessor;
    create(name: any, method: any): this;
    createFeed(name: any, method: any): this;
}
