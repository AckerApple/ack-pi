import * as inputs from './pi-inputs'
import { emitter as offObserver } from './pi-off'

export class OutputPin extends inputs.Pin{
  isHigh:boolean
  interval:number
  num:number

  constructor(num, public Pi){
    super(num, Pi)
    Pi.driver.pinMode(this.num, Pi.driver.OUTPUT)


    offObserver.once("exit",()=>{
      this.destroy()
    })
  }

  destroy(){}
  
  setupOnOff(){
    this.Pi.connect()
  }

  /*write(freq){
    
  }*/

  pinMode(freq){
    this.Pi.driver.pinMode(this.num, this.Pi.driver.OUTPUT)//switch to onoff mode incase was pwm
  }
  
  softPwmCreate(lowNum, highNum){
    this.Pi.driver.softPwmCreate(this.num, lowNum, highNum)
  }

  softPwmWrite( index ){
    this.Pi.driver.softPwmWrite(this.num, index)
  }

  //led on, open relay
  low(){
    this.setupOnOff()
    this.Pi.driver.digitalWrite(this.num, this.Pi.driver.LOW)
    this.isHigh = false
    return this
  }

  //led off, closed relay
  high(){
    this.pinMode( this.Pi.driver.OUTPUT )
    this.Pi.driver.digitalWrite(this.num, this.Pi.driver.HIGH)
    this.isHigh = true
    return this
  }

  toggle(){
    if( this.isHigh ){
      this.low()
    }else{
      this.high()
    }
  }

  toggleUpdate(){
    if( this.isHigh ){
      this.low()
    }else{
      this.high()
    }
  }

  blink(interval){
    interval = interval || 300
    this.interval = setInterval(()=>{
      this.toggleUpdate()
    },interval)
  }

  blinkExactly(num, delay){
    return new Promise((res,rej)=>{
      if(num===0)return res()
      
      num = num || 5
      delay = delay || 200
      this.toggleUpdate()

      setTimeout(()=>{
        res( this.blinkExactly(num-1, delay) )
      },delay)
    })
  }
  
  breath( pace, gap ){
    this.Pi.driver.softPwmCreate(this.num, 0, 100)
    
    pace = pace || 20
    gap = gap || 1000
    let index = 100//off
    let goingOn = true
    
    const runner = ()=>{
      goingOn ? --index : ++index 
      this.Pi.driver.softPwmWrite(this.num, index)
    }
    
    const cpu = ()=>{
      runner()
      
      if( index===100 || index===0 ){
        goingOn = !goingOn
        
        if( index===100 ){
          clearInterval(this.interval)
          setTimeout(()=>{
            if( !this.interval )return//was turned off during wait to breath again
            
            this.interval = setInterval(cpu,pace)
          },gap)
        }
      }
    }
    
    this.interval = setInterval(cpu,pace)
  }
}

export class Power extends OutputPin{
  offIsLow:boolean

  off(){
    return this.offIsLow ? this.low() : this.high()
  }

  on(){
    return this.offIsLow ? this.high() : this.low()
  }

  destroy(){
    super.destroy()
    this.off()
  }
}

export class Led extends Power{}
export class Buzzer extends Power{}

export class Relay extends OutputPin{
  offIsLow:boolean = true

  off(){
    return this.low()
  }

  on(){
    return this.high()
  }

  close(){
    return this.high()
  }

  open(){
    return this.low()
  }

  destroy(){
    super.destroy()
    this.off()
  }
}