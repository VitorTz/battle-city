

export type DeckComment = {
    comment_id: number,
    deck_id: number,
    user_id: string,
    user_vote_sum: number,
    user_name: string,
    user_image_url: string,
    comment: string,    
    parent_comment_id: number | null,
    vote_sum: number
    replies: DeckComment[]
}