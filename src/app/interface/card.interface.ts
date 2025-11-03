export interface Card {
    id : number ;
    title : string;
    wantedToAddCard : boolean;
    listOfTask : CardTask[];
}

export interface CardTask {
    id : number;
    taskName : string;
    assignedCard : string;
}