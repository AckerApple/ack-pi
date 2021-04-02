import { pin } from "./types"
import { Pi } from  "./pi-sample"

export class Pin implements pin{
  type: "INPUT" | "OUTPUT"
  mode?: "HIGH" | "LOW"

  constructor(
    public num:number,
    public Pi:Pi
  ){
    this.num = num
    this.Pi = Pi
  }
}
