export  type GeneralResponseGeneric<T>={
    responseCode:number,
    responseMessage:string,
    responseBody:T
}

export  type GeneralResponse={
    responseCode:number,
    responseMessage:string
}