"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wpi = require('wiringpi-node');
var pi_sample_1 = require("./pi-sample");
function pi() {
    return pi_sample_1.pi(wpi);
}
exports.pi = pi;
