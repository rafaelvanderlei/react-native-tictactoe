import TicTacToe from '../../js/TicTacToe';

describe('checkWinner', () => {
  it("X wins at horizontal line 0", () => {
    let tictactoe = new TicTacToe();
    tictactoe.state.matrix = [
      ['X','X','X'],
      ['O','O',''],
      ['','','']
    ]
    let winner = tictactoe.checkWinner();

    expect( winner.mark ).toBe('X');
    expect( tictactoe.winnerLinePosition.horizontal ).toBe(0);
  });

  it("X wins at horizontal line 1", () => {
    let tictactoe = new TicTacToe();
    tictactoe.state.matrix = [
      ['','',''],
      ['X','X','X'],
      ['O','O','']
    ]
    let winner = tictactoe.checkWinner();

    expect( winner.mark ).toBe('X');
    expect( tictactoe.winnerLinePosition.horizontal ).toBe(1);
  });

  it("X wins at horizontal line 2", () => {
    let tictactoe = new TicTacToe();
    tictactoe.state.matrix = [
      ['','',''],
      ['O','O',''],
      ['X','X','X']
    ]
    let winner = tictactoe.checkWinner();

    expect( winner.mark ).toBe('X');
    expect( tictactoe.winnerLinePosition.horizontal ).toBe(2);
  });

  it("O wins at horizontal line 0", () => {
    let tictactoe = new TicTacToe();
    tictactoe.state.matrix = [
      ['O','O','O'],
      ['X','X',''],
      ['','','']
    ]
    let winner = tictactoe.checkWinner();

    expect( winner.mark ).toBe('O');
    expect( tictactoe.winnerLinePosition.horizontal ).toBe(0);
  });

  it("O wins at horizontal line 1", () => {
    let tictactoe = new TicTacToe();
    tictactoe.state.matrix = [
      ['','',''],
      ['O','O','O'],
      ['X','X','']
    ]
    let winner = tictactoe.checkWinner();

    expect( winner.mark ).toBe('O');
    expect( tictactoe.winnerLinePosition.horizontal ).toBe(1);
  });

  it("O wins at horizontal line 2", () => {
    let tictactoe = new TicTacToe();
    tictactoe.state.matrix = [
      ['','',''],
      ['X','X',''],
      ['O','O','O']
    ]
    let winner = tictactoe.checkWinner();

    expect( winner.mark ).toBe('O');
    expect( tictactoe.winnerLinePosition.horizontal ).toBe(2);
  });

  it("X wins at vertical line 0", () => {
    let tictactoe = new TicTacToe();
    tictactoe.state.matrix = [
      ['X','',''],
      ['X','O',''],
      ['X','O','']
    ]
    let winner = tictactoe.checkWinner();

    expect( winner.mark ).toBe('X');
    expect( tictactoe.winnerLinePosition.vertical ).toBe(0);
  });

  it("X wins at vertical line 1", () => {
    let tictactoe = new TicTacToe();
    tictactoe.state.matrix = [
      ['','X',''],
      ['','X','O'],
      ['','X','O']
    ]
    let winner = tictactoe.checkWinner();

    expect( winner.mark ).toBe('X');
    expect( tictactoe.winnerLinePosition.vertical ).toBe(1);
  });

  it("X wins at vertical line 2", () => {
    let tictactoe = new TicTacToe();
    tictactoe.state.matrix = [
      ['','','X'],
      ['','O','X'],
      ['','O','X']
    ]
    let winner = tictactoe.checkWinner();

    expect( winner.mark ).toBe('X');
    expect( tictactoe.winnerLinePosition.vertical ).toBe(2);
  });

  it("O wins at vertical line 0", () => {
    let tictactoe = new TicTacToe();
    tictactoe.state.matrix = [
      ['O','',''],
      ['O','X',''],
      ['O','X','']
    ]
    let winner = tictactoe.checkWinner();

    expect( winner.mark ).toBe('O');
    expect( tictactoe.winnerLinePosition.vertical ).toBe(0);
  });

  it("O wins at vertical line 1", () => {
    let tictactoe = new TicTacToe();
    tictactoe.state.matrix = [
      ['','O',''],
      ['','O','X'],
      ['','O','X']
    ]
    let winner = tictactoe.checkWinner();

    expect( winner.mark ).toBe('O');
    expect( tictactoe.winnerLinePosition.vertical ).toBe(1);
  });

  it("O wins at vertical line 2", () => {
    let tictactoe = new TicTacToe();
    tictactoe.state.matrix = [
      ['','','O'],
      ['','X','O'],
      ['','X','O']
    ]
    let winner = tictactoe.checkWinner();

    expect( winner.mark ).toBe('O');
    expect( tictactoe.winnerLinePosition.vertical ).toBe(2);
  });

  it("X wins at diagonal line 0", () => {
    let tictactoe = new TicTacToe();
    tictactoe.state.matrix = [
      ['X','','O'],
      ['','X','O'],
      ['','','X']
    ]
    let winner = tictactoe.checkWinner();

    expect( winner.mark ).toBe('X');
    expect( tictactoe.winnerLinePosition.diagonal ).toBe(0);
  });

  it("X wins at diagonal line 1", () => {
    let tictactoe = new TicTacToe();
    tictactoe.state.matrix = [
      ['','','X'],
      ['','X','O'],
      ['X','','O']
    ]
    let winner = tictactoe.checkWinner();

    expect( winner.mark ).toBe('X');
    expect( tictactoe.winnerLinePosition.diagonal ).toBe(1);
  });

  it("O wins at diagonal line 0", () => {
    let tictactoe = new TicTacToe();
    tictactoe.state.matrix = [
      ['O','','X'],
      ['','O','X'],
      ['','','O']
    ]
    let winner = tictactoe.checkWinner();

    expect( winner.mark ).toBe('O');
    expect( tictactoe.winnerLinePosition.diagonal ).toBe(0);
  });

  it("O wins at diagonal line 1", () => {
    let tictactoe = new TicTacToe();
    tictactoe.state.matrix = [
      ['','','O'],
      ['','O','X'],
      ['O','','X']
    ]
    let winner = tictactoe.checkWinner();

    expect( winner.mark ).toBe('O');
    expect( tictactoe.winnerLinePosition.diagonal ).toBe(1);
  });
});
