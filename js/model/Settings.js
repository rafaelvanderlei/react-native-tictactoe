// @flow
'use strict';

import Player from './Player';

export default class Settings {
  player1 : Player;
  player2 : Player;

  constructor(player1:Player, player2:Player) {
    this.player1 = player1;
    this.player2 = player2;
  }

  getPlayerByMark( mark : string ) : Player {
    if( mark == this.player1.mark ) {
      return this.player1;
    }
    if( mark == this.player2.mark ) {
      return this.player2;
    }
    throw new Error('invalid mark.');
  }
}
