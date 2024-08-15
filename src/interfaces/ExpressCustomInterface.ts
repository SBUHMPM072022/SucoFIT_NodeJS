import { Request } from "express";

export interface UserInfo{
    id: number,
    username: string,
    role_id: number,
    role: string,
    iat: number,
    exp: number
}

export interface CustomRequest extends Request {
    user?: UserInfo
    useragent?: any
}
