"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var pin_1 = require("./pin");
var pi_off_1 = require("./pi-off");
var OutputPin = (function (_super) {
    __extends(OutputPin, _super);
    function OutputPin(num, Pi) {
        var _this = _super.call(this, num, Pi) || this;
        _this.Pi = Pi;
        _this.type = "OUTPUT";
        Pi.driver.pinMode(_this.num, Pi.driver.OUTPUT);
        pi_off_1.emitter.once("exit", function () {
            _this.destroy();
        });
        return _this;
    }
    OutputPin.prototype.destroy = function () { };
    OutputPin.prototype.setupOnOff = function () {
        this.Pi.connect();
    };
    OutputPin.prototype.applyPinMode = function () {
        this.Pi.driver.pinMode(this.num, this.Pi.driver.OUTPUT);
    };
    OutputPin.prototype.softPwmCreate = function (lowNum, highNum) {
        this.Pi.driver.softPwmCreate(this.num, lowNum, highNum);
    };
    OutputPin.prototype.softPwmWrite = function (index) {
        this.Pi.driver.softPwmWrite(this.num, index);
    };
    OutputPin.prototype.low = function () {
        this.setupOnOff();
        this.Pi.driver.digitalWrite(this.num, this.Pi.driver.LOW);
        this.isHigh = false;
        return this;
    };
    OutputPin.prototype.high = function () {
        this.applyPinMode();
        this.Pi.driver.digitalWrite(this.num, this.Pi.driver.HIGH);
        this.isHigh = true;
        return this;
    };
    OutputPin.prototype.toggle = function () {
        if (this.isHigh) {
            this.low();
        }
        else {
            this.high();
        }
    };
    OutputPin.prototype.toggleUpdate = function () {
        if (this.isHigh) {
            this.low();
        }
        else {
            this.high();
        }
    };
    OutputPin.prototype.blink = function (interval) {
        var _this = this;
        interval = interval || 300;
        this.interval = setInterval(function () {
            _this.toggleUpdate();
        }, interval);
    };
    OutputPin.prototype.blinkExactly = function (num, delay) {
        var _this = this;
        return new Promise(function (res, rej) {
            if (num === 0)
                return res();
            num = num || 5;
            delay = delay || 200;
            _this.toggleUpdate();
            setTimeout(function () {
                res(_this.blinkExactly(num - 1, delay));
            }, delay);
        });
    };
    OutputPin.prototype.breath = function (pace, gap) {
        var _this = this;
        this.Pi.driver.softPwmCreate(this.num, 0, 100);
        pace = pace || 20;
        gap = gap || 1000;
        var index = 100;
        var goingOn = true;
        var runner = function () {
            goingOn ? --index : ++index;
            _this.Pi.driver.softPwmWrite(_this.num, index);
        };
        var cpu = function () {
            runner();
            if (index === 100 || index === 0) {
                goingOn = !goingOn;
                if (index === 100) {
                    clearInterval(_this.interval);
                    setTimeout(function () {
                        if (!_this.interval)
                            return;
                        _this.interval = setInterval(cpu, pace);
                    }, gap);
                }
            }
        };
        this.interval = setInterval(cpu, pace);
    };
    return OutputPin;
}(pin_1.Pin));
exports.OutputPin = OutputPin;
var Power = (function (_super) {
    __extends(Power, _super);
    function Power() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Power.prototype.off = function () {
        return this.offIsLow ? this.low() : this.high();
    };
    Power.prototype.on = function () {
        return this.offIsLow ? this.high() : this.low();
    };
    Power.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.off();
    };
    return Power;
}(OutputPin));
exports.Power = Power;
var Led = (function (_super) {
    __extends(Led, _super);
    function Led() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Led;
}(Power));
exports.Led = Led;
var Buzzer = (function (_super) {
    __extends(Buzzer, _super);
    function Buzzer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Buzzer;
}(Power));
exports.Buzzer = Buzzer;
var Relay = (function (_super) {
    __extends(Relay, _super);
    function Relay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.offIsLow = true;
        return _this;
    }
    Relay.prototype.off = function () {
        return this.low();
    };
    Relay.prototype.on = function () {
        return this.high();
    };
    Relay.prototype.close = function () {
        return this.high();
    };
    Relay.prototype.open = function () {
        return this.low();
    };
    Relay.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.off();
    };
    return Relay;
}(OutputPin));
exports.Relay = Relay;
//# sourceMappingURL=pi-outputs.js.map