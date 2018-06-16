"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var wpi = require('wiringpi-node');
var pi_sample_1 = require("./pi-sample");
__export(require("./pi-inputs"));
__export(require("./pi-outputs"));
function pi() {
    return pi_sample_1.pi(wpi);
}
exports.pi = pi;
