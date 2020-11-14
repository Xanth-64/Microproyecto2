import { Character } from './character';

export interface APIResponse {
    info:{
        count:number,
        pages:number,
        next:string,
        prev:string,
    }
    results: Array<Character>
}
