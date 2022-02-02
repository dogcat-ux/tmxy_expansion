// @ts-ignore
/* eslint-disable */
declare namespace API {
  type carouselsRes = {
    status?:number
    data?: {
      item?:carouselsResItem[],
      total?:number
    }
    error?:string
    msg?:string
  }
  type carouselsResItem = {
    id?:number
    img_path?:string
    created_at?:number
  }
}
