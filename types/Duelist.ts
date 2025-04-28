import { ImageDB } from "./ImageDB"
import { TagUser } from "./UserTag"


export type Duelist = {
    user_id: string
    username: string
    country: string
    image: ImageDB | null
    bio: string | null
    tags: TagUser[]
}