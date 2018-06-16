"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var pin_1 = require("./pin");
exports.Pin = pin_1.Pin;
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
var OrdinalProcessor_1 = require("./OrdinalProcessor");
exports.op = OrdinalProcessor_1.op;
exports.OrdinalProcessor = OrdinalProcessor_1.OrdinalProcessor;
__export(require("./pi-inputs"));
__export(require("./pi-outputs"));
