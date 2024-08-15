export interface EventTypeCreate {
    event_type: String
    event_type_description?: String
    created_user: String
}

export interface EventTypeDelete {
    id: number
}