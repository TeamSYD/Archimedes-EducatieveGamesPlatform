import {Card} from "../cards/card";
export class Set {
  constructor(id: number, filler: boolean){
    this.id = id;
    this.filler = filler;
  }
  id: number;
  filler : boolean;
  cards : Card[];
  cardId: number;
}
