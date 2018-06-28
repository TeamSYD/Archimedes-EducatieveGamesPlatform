import {DateObject} from "ngx-bootstrap/chronos/types";

export class Session{
  id: number;
  pin: number;
  createdAt: Date;
  remainingTime: String;
}
