import * as inputs from "./pi-inputs"
import * as outputs from "./pi-outputs"

const pins = []

function paramPin(pin){
  return pins[ pin ] = pins[ pin ] || {read:0}
}

export interface driver{
  INPUT  : any
  OUTPUT : any
  LOW    : any
  HIGH   : any
  PUD_UP : any
  wiringPiSetup   : ()=>number
  pinMode         : (pin:number, type:any)=>void
  digitalRead     : (pin:number)=>any
  digitalWrite    : (pin:number,freq)=>void
  pullUpDnControl : (pin:number,state)=>void
  softPwmCreate   : (pin:number, low, high)=>void
  softPwmWrite    : (pin:number, freq)=>void
}


const defaultDriver:driver = {
  INPUT  : null,
  OUTPUT : null,
  LOW    : null,
  HIGH   : null,
  PUD_UP : null,
  wiringPiSetup:()=>null,
  pinMode:(pin, type)=>null,
  digitalRead:(pin)=>paramPin(pin).read,
  digitalWrite:(pin,freq)=>null,
  pullUpDnControl:(pin,state)=>null,
  softPwmCreate:(pin, low, high)=>null,
  softPwmWrite:(pin, freq)=>null
}

export function pi( driver:driver ){
  return new Pi( driver )
}

export class PiCondition{
  falses:any[]
  thens:(()=>any)[]
  lastResult:any
  condition:any
  reader:()=>any

  constructor(reader, condition){
    this.condition = condition
    this.reader = reader
    this.thens = []
    this.falses = []
  }
  
  setLastState(state){
    this.lastResult = this.condition===state
    return this
  }
  
  then(t){
    this.thens.push(t)
    return this
  }

  onFalse(f){
    this.falses.push(f)
    return this
  }
  
  process(){
    const value = this.reader()
    const result = value===this.condition
    
    if(this.lastResult===result)return;
    
    this.lastResult = result
    
    if( result ){
      this.processThens()
    }else{
      this.processFalses(value)
    }
  }

  processThens(){
    this.thens.forEach(t=>t())
  }

  processFalses(value){
    this.falses.forEach(f=>f(value))
  }
}

export class Pi{
  conditions:PiCondition[]
  interval:number

  constructor( public driver:driver=defaultDriver ){
    this.conditions = []
    this.connect()
  }
  
  //intended to be overridden
  connect(){
    if( this.driver.wiringPiSetup() == -1){
      throw new Error("Initialize wiringPi failed !")
    }
    return this
  }

  start(){
    if(this.interval)return this
    this.interval = <any>setInterval(()=>this.process(),0)
    return this
  }
  
  stop(){
    clearInterval(this.interval)
    delete this.interval
  }
  
  process(){
    this.conditions.forEach(c=>c.process())
  }
  
  when(reader, condition){
    const piCondition = new PiCondition(reader, condition)
    this.conditions.push( piCondition )
    return piCondition
  }
  
  killCondition( piCondition ){
    for(let x=this.conditions.length-1; x >= 0; --x){
      if( this.conditions[x] == piCondition ){
        this.conditions.splice(x,1)
        break
      }
    }
    return this
  }

  outputPin(num){
    return new outputs.OutputPin(num, this)
  }

  buzzer(num){
    return new outputs.Buzzer(num, this)
  }

  relay(num){
    return new outputs.Relay(num, this)
  }

  power(num){
    return new outputs.Power(num, this)
  }

  led(num){
    return new outputs.Led(num, this)
  }

  inputPin(num){
    return new inputs.InputPin(num, this)
  }

  btnPin(num){
    return new inputs.BtnPin(num, this)
  }
}