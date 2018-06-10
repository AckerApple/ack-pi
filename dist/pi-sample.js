"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inputs = require("./pi-inputs");
var outputs = require("./pi-outputs");
var pins = [];
function paramPin(pin) {
    return pins[pin] = pins[pin] || { read: 0 };
}
var defaultDriver = {
    INPUT: null,
    OUTPUT: null,
    LOW: null,
    HIGH: null,
    PUD_UP: null,
    wiringPiSetup: function () { return null; },
    pinMode: function (pin, type) { return null; },
    digitalRead: function (pin) { return paramPin(pin).read; },
    digitalWrite: function (pin, freq) { return null; },
    pullUpDnControl: function (pin, state) { return null; },
    softPwmCreate: function (pin, low, high) { return null; },
    softPwmWrite: function (pin, freq) { return null; }
};
function pi(driver) {
    return new Pi(driver);
}
exports.pi = pi;
var PiCondition = (function () {
    function PiCondition(reader, condition) {
        this.condition = condition;
        this.reader = reader;
        this.thens = [];
        this.falses = [];
    }
    PiCondition.prototype.setLastState = function (state) {
        this.lastResult = this.condition === state;
        return this;
    };
    PiCondition.prototype.then = function (t) {
        this.thens.push(t);
        return this;
    };
    PiCondition.prototype.onFalse = function (f) {
        this.falses.push(f);
        return this;
    };
    PiCondition.prototype.process = function () {
        var value = this.reader();
        var result = value === this.condition;
        if (this.lastResult === result)
            return;
        this.lastResult = result;
        if (result) {
            this.processThens();
        }
        else {
            this.processFalses(value);
        }
    };
    PiCondition.prototype.processThens = function () {
        this.thens.forEach(function (t) { return t(); });
    };
    PiCondition.prototype.processFalses = function (value) {
        this.falses.forEach(function (f) { return f(value); });
    };
    return PiCondition;
}());
exports.PiCondition = PiCondition;
var Pi = (function () {
    function Pi(driver) {
        if (driver === void 0) { driver = defaultDriver; }
        this.driver = driver;
        this.outputPin = this.output;
        this.inputPin = this.input;
        this.conditions = [];
        this.connect();
    }
    Pi.prototype.connect = function () {
        if (this.driver.wiringPiSetup() == -1) {
            throw new Error("Initialize wiringPi failed !");
        }
        return this;
    };
    Pi.prototype.start = function () {
        var _this = this;
        if (this.interval)
            return this;
        this.interval = setInterval(function () { return _this.process(); }, 0);
        return this;
    };
    Pi.prototype.stop = function () {
        clearInterval(this.interval);
        delete this.interval;
    };
    Pi.prototype.process = function () {
        this.conditions.forEach(function (c) { return c.process(); });
    };
    Pi.prototype.when = function (reader, condition) {
        var piCondition = new PiCondition(reader, condition);
        this.conditions.push(piCondition);
        return piCondition;
    };
    Pi.prototype.killCondition = function (piCondition) {
        for (var x = this.conditions.length - 1; x >= 0; --x) {
            if (this.conditions[x] == piCondition) {
                this.conditions.splice(x, 1);
                break;
            }
        }
        return this;
    };
    Pi.prototype.output = function (num) {
        return new outputs.OutputPin(num, this);
    };
    Pi.prototype.buzzer = function (num) {
        return new outputs.Buzzer(num, this);
    };
    Pi.prototype.relay = function (num) {
        return new outputs.Relay(num, this);
    };
    Pi.prototype.power = function (num) {
        return new outputs.Power(num, this);
    };
    Pi.prototype.led = function (num) {
        return new outputs.Led(num, this);
    };
    Pi.prototype.input = function (num) {
        return new inputs.InputPin(num, this);
    };
    Pi.prototype.btnPin = function (num) {
        return new inputs.BtnPin(num, this);
    };
    return Pi;
}());
exports.Pi = Pi;
