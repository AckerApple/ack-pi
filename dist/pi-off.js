"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
exports.emitter = new rxjs_1.Subject();
process.once('SIGINT', function () {
    exports.emitter.next();
    process.exit();
});
//# sourceMappingURL=pi-off.js.map