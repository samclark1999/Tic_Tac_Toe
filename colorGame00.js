const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [gameState, setGameState] = React.useState([]);
  
  let status = `${checkForWinner(gameState)} Wins!`;
  let playerTurn = `Next Player ${player == '0' ? 'Player 1' : 'Player 2'}`;

  const takeTurn = (id) => {
    setGameState([...gameState, { id: id, player: player }]);
    setPlayer((player + 1) % 2); 
    return player;
  };

  function renderSquare(i) { 
    return <Square takeTurn={takeTurn} id={i}></Square>;
  };

  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div><div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      <div id="info">
        <h1 id="turn">{playerTurn}</h1>
        <h1>{status}</h1>
      </div>

    </div>
  );
};


const Square = ({id, takeTurn}) => {
  const mark = ['O', 'X', 'Empty'];
  const [filled, setFilled] = React.useState(false);
  const [tik, setTik] = React.useState(2);
 
  return (
    <button className = {tik == '1' ? 'red' : 'white'}
     onClick={() => {
      setTik(takeTurn(id));
      setFilled(true);
      console.log(`square: ${id} filled by: ${tik}`);
    }}>
      <h1>{mark[tik]}</h1>
    </button>
  );
};


const Game = () => {
  return (
    <div className="game">
    <Board></Board>
  </div>

  );
};

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 5, 6],
];

const checkForWinner = (gameState) => {
  if (gameState.length < 5) return "No Winner Yet";
  let p0 = gameState.filter((item) => {
    if (item.player == 0) return item;
  });
  p0 = p0.map((item) => item.id);
  let px = gameState.filter((item) => {
    if (item.player == 1) return item;
  });
  px = px.map((item) => item.id);
  if (p0 != null && px != null) {
    var win0 = win.filter((item) => {
      return isSuperset(new Set(p0), new Set(item));
    });
    var winX = win.filter((item) => {
      return isSuperset(new Set(px), new Set(item));
    });
  }
  if (win0.length > 0) return "Player O ";
  else if (winX.length > 0) return "Player X ";
  return "No Winner Yet";
};

function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
