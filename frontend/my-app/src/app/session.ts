import {Game} from "./game";

export class Session{
  id: number;
  pin: number;
  createdAt: Date;
  remainingTime: String;
  game: Game;
}
