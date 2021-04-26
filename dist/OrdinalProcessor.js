"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function op() {
    return new OrdinalProcessor();
}
exports.op = op;
var OrdinalProcessor = (function () {
    function OrdinalProcessor() {
        this.stopped = false;
        this.started = false;
        this.index = -1;
        this.inProcess = false;
        this.functions = [];
    }
    OrdinalProcessor.prototype.run = function () {
        this.stopped = false;
        return this.process();
    };
    OrdinalProcessor.prototype.stop = function () {
        this.stopped = true;
        return this;
    };
    OrdinalProcessor.prototype.rerun = function () {
        var _this = this;
        return this.then(function (v) {
            _this.index = -1;
            return v;
        });
    };
    OrdinalProcessor.prototype.add = function (method, args) {
        this.functions.push({ method: method, args: args });
        return this.process();
    };
    OrdinalProcessor.prototype.process = function (feed) {
        var _this = this;
        if (this.stopped === true || this.inProcess === true) {
            return this;
        }
        ++this.index;
        var definition = this.functions[this.index];
        this.inProcess = true;
        var args = this.getArgsByDef(definition, feed);
        this.started = true;
        new Promise(function (res, rej) {
            res(definition.method.apply(definition.method, args));
        })
            .then(function (feed) {
            _this.inProcess = false;
            if (_this.functions.length > _this.index + 1) {
                _this.process(feed);
            }
        });
        return this;
    };
    OrdinalProcessor.prototype.getArgsByDef = function (definition, feed) {
        var args = [];
        if (this.started && definition.method.feed) {
            args.push(feed);
        }
        args.push.apply(args, definition.args);
        return args;
    };
    OrdinalProcessor.prototype.then = function (method, args) {
        method.feed = true;
        return this.add(method, args);
    };
    OrdinalProcessor.prototype.delay = function (ms) {
        return this.then(function (v) {
            return new Promise(function (res, rej) {
                setTimeout(function () { return res(v); }, ms);
            });
        });
    };
    OrdinalProcessor.prototype.create = function (name, method) {
        this[name] = function () {
            this.add(method, arguments);
            return this;
        }.bind(this);
        return this;
    };
    OrdinalProcessor.prototype.createFeed = function (name, method) {
        this[name] = function () {
            this.then(method, arguments);
            return this;
        }.bind(this);
        return this;
    };
    return OrdinalProcessor;
}());
exports.OrdinalProcessor = OrdinalProcessor;
//# sourceMappingURL=OrdinalProcessor.js.map