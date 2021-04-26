"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wpi;
try {
    wpi = require('node-wiring-pi');
}
catch (err) {
    console.warn('Could not load node-wiring-pi, trying wiringpi-node', err);
    try {
        wpi = require('wiringpi-node');
    }
    catch (err) {
        throw 'Cannot load node-wiring-pi nor wiringpi-node';
    }
}
var pi_sample_1 = require("./pi-sample");
function pi() {
    return pi_sample_1.pi(wpi);
}
exports.pi = pi;
//# sourceMappingURL=pi.js.map