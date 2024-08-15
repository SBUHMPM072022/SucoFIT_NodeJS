export interface UserRegister {
    fullname: String
    division_id: number
    email: String
    phone_number: String
    password: String,
    created_user: String
    role_id: number
}

export interface UserDelete {
    id: number
}