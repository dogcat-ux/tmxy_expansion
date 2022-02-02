export default interface MAP {
  address: string
  content: IContent
  status: number
}

interface IContent {
  address: string
  addressDetail: IAddressDetail
  point: IPoint
}

interface IAddressDetail {
  city: string
  cityCode: number
  province: string
}

interface IPoint {
  x: string
  y: string
}


