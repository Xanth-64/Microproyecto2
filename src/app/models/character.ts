import { Origin } from './origin';

export interface Character {
    $key?: string;
    id: number;
    name: string;
    status: string;
    species: string;
    type:string;
    gender:string;
    origin:Origin;
    location:Location;
    image: string;
    episode: Array<string>;
    url: string;
    created: string;
    haveLike?: boolean;
    likes?: number;
}
