export interface RewardCreate {
    start_date: string
    end_date: string
    start_rank: string
    end_rank: string
}

export interface RewardUpdate {
    description: string
    prize: number
}