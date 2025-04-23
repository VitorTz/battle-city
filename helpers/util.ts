import * as FileSystem from 'expo-file-system'
import { 
    API_CARD_WIDTH, 
    API_CARD_HEIGHT, 
    API_CARD_CROPPED_HEIGHT, 
    API_CARD_CROPPED_WIDTH 
} from "@/constants/AppConstants";
import { Dimensions } from "react-native";
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

