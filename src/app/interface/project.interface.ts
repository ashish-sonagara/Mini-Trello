import { Card } from "./card.interface";

export interface Project {
    id: number;
    title: string;
    imageURL : string;
    assignedUserEmail : string;
    cardList: Card[];
}