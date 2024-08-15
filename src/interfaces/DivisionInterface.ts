export interface DivisionCreate {
    division_name: String
    division_description?: String
    created_user: String
}

export interface DivisionDelete {
    id: number
}