export interface Card {
    id: number;
    title: string;
    wantedToAddCard: boolean;
    listOfTask: CardTask[];
    viewMoreOptions ?: boolean;
}

export interface CardTask {
    id: number;
    taskName: string;
    assignedCard: string;
    checked?: boolean;
    isEditing ?: boolean;
}