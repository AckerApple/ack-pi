import { pin } from "./types"
import { Pi } from  "./pi-sample"

export class Pin implements pin{
  mode:any
  type:"INPUT"|"OUTPUT"
  
  constructor(
    public num:number,
    public Pi:Pi
  ){
    this.num = num
    this.Pi = Pi
  }
}
