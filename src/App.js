import { useState } from "react";

function Square({value})
{
  //const [value, setValue] = useState(null);

  function handleClick()
  {
    //setValue("X");

    console.log("Clicked " + value);
  }
  return (<button className="square" onClick={handleClick}>
          {value}
        </button>);
}

export default function Board() {

  const [squares, setSquares] = useState(Array(9).fill(null));

  return (
    <>
    <div className="board-row">
        <Square value={squares[0]}></Square>
        <Square value={squares[1]}></Square>
        <Square value={squares[2]}></Square>
    </div>
    <div className="board-row">
        <Square value={squares[3]}></Square>
        <Square value={squares[4]}></Square>
        <Square value={squares[5]}></Square>
    </div>
    <div className="board-row">
        <Square value={squares[6]}></Square>
        <Square value={squares[7]}></Square>
        <Square value={squares[8]}></Square>
    </div>

    </>
  );
 
   
}
