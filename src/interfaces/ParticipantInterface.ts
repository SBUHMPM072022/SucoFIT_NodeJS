export interface ParticipantCreate {
    event_id: number
    user_id: number
    join_date: String
    activity_start: String
    activity_stop: String
    duration?: number
    presence_latitude: String
    presence_longitude: String
    participant_evidence: String
    created_user?: String
}

export interface ParticipantFindId {
    id: number
}

export interface ParticipantDelete {
    id: number
}