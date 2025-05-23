import { ImageDB } from "./ImageDB"
import { TagUser } from "./UserTag"


export type AppUser = {
    username: string
    image: ImageDB | null
    bio: string | null
    tags: TagUser[]
}