// @ts-ignore
/* eslint-disable */
declare namespace API {
  type noticeRes = {
    status?:number
    data?: {
      item?:noticeResItem[],
      total?:number
    }
    error?:string
    msg?:string
  }
  type noticeDetailRes = {
    status?:number
    data?: noticeResItem,
    error?:string
    msg?:string
  }
  type noticeResItem = {
    id?:number
    content?:string
    created_at?:number
    title?:string
  }
  type noticeParam = {
    page_size?:number
    page_num?:number
  }

}
