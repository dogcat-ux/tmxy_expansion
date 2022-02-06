// @ts-ignore
/* eslint-disable */
declare namespace API {
  type WxConfig = {
    status: number
    data: WxConfigItem,
    msg: string,
    error: string
  }

  type WxConfigItem = {
    app_id: string,
    nonce_str: string,
    timestamp: number,
    signature: string
  }
}
