import { PiCondition, Pi } from  "./pi-sample"
import { Pin } from "./pin"

export class InputPin extends Pin{
  type:"INPUT" = "INPUT"

  constructor(num, Pi){
    super(num, Pi)
    Pi.driver.pinMode(num, Pi.driver.INPUT)
  }

  //intended to be overridden
  getState() {
    return this.Pi.driver.digitalRead(this.num)
  }

  setPi(Pi){
    this.Pi = Pi
    return this
  }

  getPi(){
    return this.Pi || (this.Pi = new Pi())
  }
}

export class BtnPin extends InputPin{
  constructor(num, Pi){
    super(num, Pi)
    // Pull up to 3.3V,make GPIO1 a stable level
    Pi.driver.pullUpDnControl(this.num, Pi.driver.PUD_UP);
  }

  watch(){
    return new BtnWatch(this, this.getPi()).start()
  }
}

export class BtnWatch{
  pressedProcesses:any[]
  releasedProcesses:any[]
  piCondition:PiCondition

  constructor(public Btn, public Pi){
    this.pressedProcesses = []
    this.releasedProcesses = []
    this.Pi = Pi
    this.Btn = Btn
  }

  start(){
    this.piCondition = this.Pi.start()
    .when( ()=>this.Btn.getState(), 1 )
    .setLastState( this.Btn.getState() )
    .then(()=>this.press())
    .onFalse(value=>this.release())

    return this
  }

  stop(){
    this.Pi.killCondition( this.piCondition )
  }

  pressed(method){
    this.pressedProcesses.push(method)
    return this
  }

  released(method){
    this.releasedProcesses.push(method)
    return this
  }

  press(){
    this.pressedProcesses.forEach(p=>p())
  }

  release(){
    this.releasedProcesses.forEach(p=>p())
  }
}