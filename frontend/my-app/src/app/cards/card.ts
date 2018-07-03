import {Resource} from "../resource";
import {Game} from "../game";

export class Card {
  id: number;
  set_id: number;
  closedface_side_id: number;
  openface_side_id: number;
  game_id: number;
  game: Game;
  openface_side: Resource;
  closedface_side: Resource;
  set_length:number;
  flipped:boolean;
}
