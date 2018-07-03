import {Arrangementen} from "./arrangementen";

export class Session{
  id: number;
  pin: number;
  createdAt: Date;
  remainingTime: String;
  arrangement: Arrangementen;
}
