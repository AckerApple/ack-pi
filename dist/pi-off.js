"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events = require("events");
exports.emitter = new events();
process.once('SIGINT', function () {
    exports.emitter.emit('exit');
    process.exit();
});
