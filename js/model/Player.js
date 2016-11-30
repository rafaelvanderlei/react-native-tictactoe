// @flow
'use strict';

type MarkType = "X" | "O";

export default class Player {
  name : string;
  mark : MarkType;

  constructor(name:string, mark:MarkType) {
    this.name = name;
    this.mark = mark;
  }
}
