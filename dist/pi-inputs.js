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
var pi_sample_1 = require("./pi-sample");
var pin_1 = require("./pin");
var InputPin = (function (_super) {
    __extends(InputPin, _super);
    function InputPin(num, Pi) {
        var _this = _super.call(this, num, Pi) || this;
        _this.type = "INPUT";
        Pi.driver.pinMode(num, Pi.driver.INPUT);
        return _this;
    }
    InputPin.prototype.getState = function () {
        return this.Pi.driver.digitalRead(this.num);
    };
    InputPin.prototype.setPi = function (Pi) {
        this.Pi = Pi;
        return this;
    };
    InputPin.prototype.getPi = function () {
        return this.Pi || (this.Pi = new pi_sample_1.Pi());
    };
    return InputPin;
}(pin_1.Pin));
exports.InputPin = InputPin;
var BtnPin = (function (_super) {
    __extends(BtnPin, _super);
    function BtnPin(num, Pi) {
        var _this = _super.call(this, num, Pi) || this;
        Pi.driver.pullUpDnControl(_this.num, Pi.driver.PUD_UP);
        return _this;
    }
    BtnPin.prototype.watch = function () {
        return new BtnWatch(this, this.getPi()).start();
    };
    return BtnPin;
}(InputPin));
exports.BtnPin = BtnPin;
var BtnWatch = (function () {
    function BtnWatch(Btn, Pi) {
        this.Btn = Btn;
        this.Pi = Pi;
        this.pressedProcesses = [];
        this.releasedProcesses = [];
        this.Pi = Pi;
        this.Btn = Btn;
    }
    BtnWatch.prototype.start = function () {
        var _this = this;
        this.piCondition = this.Pi.start()
            .when(function () { return _this.Btn.getState(); }, 1)
            .setLastState(this.Btn.getState())
            .then(function () { return _this.press(); })
            .onFalse(function (value) { return _this.release(); });
        return this;
    };
    BtnWatch.prototype.stop = function () {
        this.Pi.killCondition(this.piCondition);
    };
    BtnWatch.prototype.pressed = function (method) {
        this.pressedProcesses.push(method);
        return this;
    };
    BtnWatch.prototype.released = function (method) {
        this.releasedProcesses.push(method);
        return this;
    };
    BtnWatch.prototype.press = function () {
        this.pressedProcesses.forEach(function (p) { return p(); });
    };
    BtnWatch.prototype.release = function () {
        this.releasedProcesses.forEach(function (p) { return p(); });
    };
    return BtnWatch;
}());
exports.BtnWatch = BtnWatch;
