// @ts-ignore
/* eslint-disable */
declare namespace API {
  type loginParam = {
    stu_number?: string,
    password?: string
  }

  type loginRes = {
    status?: number
    data?: {
      user?: loginResItem[],
      token?: string
    }
    msg?: string
    error?: string
  }

  type loginResItem = {
    user_name?: string
    stu_number?: string
    phone_number?: string
    authority?: number
    avatar?: string
  }
}
