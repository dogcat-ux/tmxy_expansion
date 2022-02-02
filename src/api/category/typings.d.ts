// @ts-ignore
/* eslint-disable */
declare namespace API {
  type categoryRes = {
    status?:number
    data?: {
      item?:categoryItem[],
      total?:number
    }
    error?:string
    msg?:string
  }
  type categoryItem = {
    id?:number
    category_name?:string
    created_at?:number
  }
}
