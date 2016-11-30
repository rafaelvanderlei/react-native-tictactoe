// @flow
'use strict';

/*
A player can play a perfect game of Tic-tac-toe (to win or, at least, draw) if they choose the first available move from the following list, each turn, as used in Newell and Simon's 1972 tic-tac-toe program.[6]

1. Win: If you have two in a row, play the third to get three in a row.
2. Block: If the opponent has two in a row, play the third to block them.
3; Fork: Create an opportunity where you can win in two ways.
4. Block Opponent's Fork:

Option 1: Create two in a row to force the opponent into defending, as long as it doesn't result in them creating a fork or winning. For example, if "X" has a corner, "O" has the center, and "X" has the opposite corner as well, "O" must not play a corner in order to win. (Playing a corner in this scenario creates a fork for "X" to win.)

Option 2: If there is a configuration where the opponent can fork, block that fork.
5. Center: Play the center.
6. Opposite Corner: If the opponent is in the corner, play the opposite corner.
7. Empty Corner: Play an empty corner.
8. Empty Side: Play an empty side.
*/
