import React, { useEffect, useState } from 'react'
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import { withAuthenticator, Button, Heading, Text, TextField, View } from '@aws-amplify/ui-react';import '@aws-amplify/ui-react/styles.css';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);


function Square({value, onSquareClick})
{
  //const [value, setValue] = useState(null);

  // function handleClick()
  // {
  //   //setValue("X");

  //   console.log("Clicked " + value);
  // }
  return (<button className="square" onClick={onSquareClick}>
          {value}
        </button>);
}

export default function Board({signOut, user}) {

  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

 

  /////////////////////////////////////////////
  function handleClick(i)  {
    
    if ( squares[i] || calculateWinner(squares))
      return;
    
    const nextSquare = squares.slice();

    if ( xIsNext)
      nextSquare[i] = "X";
    else
      nextSquare[i] = "O";

    setXIsNext(!xIsNext);
    setSquares(nextSquare);
  }

   // calculate winner

   const winner = calculateWinner(squares );
   let status;
 
   if (winner)
     status = "Winner: " + winner;
   else
     status = "Next player: " + (xIsNext?'X':'O');

     
  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}></Square>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}></Square>
        <Square value={squares[2]}  onSquareClick={() => handleClick(2)}></Square>
    </div>
    <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}></Square>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}></Square>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}></Square>
    </div>
    <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}></Square>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}></Square>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}></Square>
    </div>

    </>
  );
 
   
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
    
  for ( let i = 0; i< lines.length; i++)
  {
    const [a,b,c] = lines[i];
    if ( squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
    {
        return squares[a];
    }
  }

  return null;
}
