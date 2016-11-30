// @flow
'use strict';

import Player from './Player';

export default class GameResult {
  winner : ?Player;
  tie : boolean;

  constructor(winner:?Player, tie:boolean) {
    this.winner = winner;
    this.tie = tie;

    if( this.winner && this.tie ) {
      throw new Error("if there ir a winner, then tie must be false.");
    }
  }

  gameOver() : boolean {
    return ( this.winner != null || this.tie );
  }
}
