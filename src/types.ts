export interface pin{
  num  : number
  type : "INPUT" | "OUTPUT"
  mode?: "HIGH" | "LOW"  // maybe only for output
}