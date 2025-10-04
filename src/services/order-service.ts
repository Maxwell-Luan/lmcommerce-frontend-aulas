import type { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import type { OrderDTO } from "../models/order";


export function findByIdRequest(id: number){

    const config : AxiosRequestConfig = {
        method: 'GET',
        url: `/orders/${id}`,
        withCredentials: true,
    }

    return requestBackend(config);

}

export function placeOrderRequest(cart: OrderDTO){
    
    const config : AxiosRequestConfig = {
        method: "POST",
        url: '/orders',
        withCredentials: true,
        data: cart
    }

    return requestBackend(config);
}