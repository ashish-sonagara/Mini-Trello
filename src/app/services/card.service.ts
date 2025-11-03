import { Injectable } from "@angular/core";
import { Card, CardTask } from "../interface/card.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CardService {

    private card: Card[] = JSON.parse(sessionStorage.getItem('cards') || 'null')
        ?? [{
            id: 0,
            title: "To Do",
            wantedToAddCard: false,
            listOfTask: []
        },
        {
            id: 1,
            title: "Doing",
            wantedToAddCard: false,
            listOfTask: []
        },
        {
            id: 2,
            title: "Done",
            wantedToAddCard: false,
            listOfTask: []
        }
        ]

    cards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>(this.card);
    cardsLength$: BehaviorSubject<number> = new BehaviorSubject<number>(this.card.length)

    storeCardToSessionStorage() {
        let CardList: Card[] = this.cards$.value;
        // console.log("this is the first time adding Cards to the session storage", CardList)
        sessionStorage.setItem('cards', JSON.stringify(CardList));
    }

    getCardFromSessionStorage(): Card[] {
        let data = sessionStorage.getItem('cards');
        if (data) {
            let cardList: Card[] = JSON.parse(data);
            return cardList
        }
        else {
            return []
        }
    }

    updatedCardList(newCardList: Card[]) {
        this.cards$.next(newCardList);
        this.storeCardToSessionStorage()
    }

    addAnotherCard(newCard: Card) {
        let cardList: Card[] = [...this.cards$.value, newCard];
        this.cards$.next(cardList);
        this.cardsLength$.next(cardList.length)
        this.storeCardToSessionStorage()
    }

}   