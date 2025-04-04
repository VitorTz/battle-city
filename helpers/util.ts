import * as FileSystem from 'expo-file-system'
import { 
    API_CARD_WIDTH, 
    API_CARD_HEIGHT, 
    API_CARD_CROPPED_HEIGHT, 
    API_CARD_CROPPED_WIDTH 
} from "@/constants/AppConstants";
import { Dimensions } from "react-native";
import { DeckComment } from '@/types/DeckComment';
import { Card } from '@/types/Card';


export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const {
    width: deviceWidth, 
    height: deviceHeight
} = Dimensions.get('window');


export function wp(percentage: number) {
    const width = deviceWidth;
    return (percentage * width) / 100;
}


export function hp(percentage: number) {
    const height = deviceHeight;
    return (percentage * height) / 100;
}

export function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

export function getImageHeight(width: number) {
    return width * (API_CARD_HEIGHT / API_CARD_WIDTH)
}

export function getImageHeightCropped(width: number) {
    return width * (API_CARD_CROPPED_HEIGHT / API_CARD_CROPPED_WIDTH)
}


export function getItemGridDimensions(
    horizontalPadding: number,
    gap: number,
    columns: number,
    originalWidth: number,
    originalHeight: number
) {
    const width = (wp(100) - (horizontalPadding * 2) - ((columns * gap) - gap)) / columns
    const height = width * (originalHeight / originalWidth)
    return {width, height}
}

export const downloadImage = async (fileName: string, imageUrl: string) => {
    const imageFilePath = `${FileSystem.documentDirectory}${fileName}`
    try {        
        const {uri, status} = await FileSystem.downloadAsync(imageUrl, imageFilePath)
        return {path: uri, success: true, status}
    } catch (err) {
        console.log(err)        
        return {success: false, status: 500, path: ''}
    }
}

export function removeTrailingNewlines(str: string) {
    return str
        .trim()
        .replace(/^\n+/, '')
        .replace(/\n+$/, '')
}

export function max(a: number, b: number) {
    return a >= b ? a : b
}


export function min(a: number, b: number) {
    return a <= b ? a : b
}

export function compString(a: string, b: string): number {
    if (a < b) {
        return -1
    }
    else if (a == b) {
        return 0
    }
    return 1
}

export function sortCards(cards: Card[]): Card[] {
    return cards.sort((a, b) => {return compString(a.name, b.name)})
}

const SIDE_DECK_FRAMETYPES: (string | null)[] = ["Xyz", "Link", "Synchro", "Ritual", "Fusion"]

export function sortSideDeck(cards: Card[]): Card[] {
    return cards.sort((a, b) => {
        return SIDE_DECK_FRAMETYPES.indexOf(a.frametype) - SIDE_DECK_FRAMETYPES.indexOf(b.frametype);
    });
}

export function orderCards(cards: Card[]): Card[] {
    let monsters: Card[] = []
    let spells: Card[] = []
    let traps: Card[] = []
    let side: Card[] = []
    cards.forEach(item => {
        if (SIDE_DECK_FRAMETYPES.includes(item.frametype)) {
            side.push(item)
        }
        else if (item.attribute != null) {
            monsters.push(item)
        }
        else if (item.frametype == "Spell") {
            spells.push(item)
        }
        else if (item.frametype == "Trap") {
            traps.push(item)
        }
        else {
            side.push(item)
        }
    })
    monsters = sortCards(monsters)
    spells = sortCards(spells)
    traps = sortCards(traps)
    side = sortSideDeck(sortCards(side))
    return [...monsters, ...spells, ...traps, ...side]
}


export function cardToString(card: Card): string {
    return `
    #CARD
    name: ${card.name}
    card_id: ${card.card_id}
    archetype: ${card.archetype}
    attribute: ${card.attribute}
    frametype: ${card.frametype}
    race: ${card.race}    
    attack: ${card.attack}
    defence: ${card.defence}
    level: ${card.level}
    description: ${card.descr}
    `
}

export function deckToString(cards: Card[]): string {
    let monsters: string[] = []
    let spells: string[] = []
    let traps: string[] = []
    let side: string[] = []
    cards.forEach(item => {
        const s = cardToString(item)
        if (SIDE_DECK_FRAMETYPES.includes(item.frametype)) {
            side.push(s)
        }
        else if (item.attribute != null) {
            monsters.push(s)
        }
        else if (item.frametype == "Spell") {
            spells.push(s)
        }
        else if (item.frametype == "Trap") {
            traps.push(s)
        }
        else {
            side.push(s)
        }
    })
    let r = `
        #OBJECTIVE
        Build a Competitive Yu-Gi-Oh deck using a combination of this cards that
        can be used in a oficial tournament.        

        #LIMITED
        Each card can have a maximum of 3 copies in the deck

        #RETURN
        A list of cards with the template
        <num_copies> <card_name> <card_id>        
        
        #CARDS

        #MONSTERS
        ${monsters.join('\n')}

        #SPELLS
        ${spells.join('\n')}

        #TRAPS
        ${traps.join('\n')}

        #SIDE DECK
        ${side.join('\n')}
    `
    return r
}


export function nestComments(comments: DeckComment[]): DeckComment[] {
    const commentMap: Map<number, DeckComment> = new Map();
    const nestedComments: DeckComment[] = [];
    
    comments.forEach(comment => {
        comment.replies = [];
        commentMap.set(comment.comment_id, comment);
    });
    
    comments.forEach(comment => {
        if (comment.parent_comment_id !== null) {
            const parent = commentMap.get(comment.parent_comment_id);
            if (parent) {
                parent.replies.push(comment);
            }
        } else {
            nestedComments.push(comment);
        }
    });

    return nestedComments;
}