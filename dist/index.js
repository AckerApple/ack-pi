"use strict";
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
