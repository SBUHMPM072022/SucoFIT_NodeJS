export interface EventCreate {
    event_name: String
    event_description: String
    event_type_id: number
    pic: String
    location: String
    latitude: String
    longitude: String
    registration_start_date: String
    registration_end_date: String
    event_start_date: String
    event_end_date: String
    point: number
    created_user?: String
    updated_user?: String
}

export interface EventFindId {
    id: number
}

export interface EventDelete {
    id: number
}