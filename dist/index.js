"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
function foo() {
    return require('./pi-sample').pi();
}
function live() {
    return require('./pi').pi();
}
function pi(liveMode) {
    return liveMode ? live() : foo();
}
exports.pi = pi;
__export(require("./OrdinalProcessor"));
