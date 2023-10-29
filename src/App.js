import React, { useEffect, useState } from 'react'
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import { withAuthenticator, Button, Heading, Text, TextField, View } from '@aws-amplify/ui-react';import '@aws-amplify/ui-react/styles.css';
import Board from "./components/board";
import awsExports from "./aws-exports";


Amplify.configure(awsExports);

function Game({signOut, user}) {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    }
  
    function jumpTo(nextMove){
      // TODO
      setCurrentMove(nextMove);

    }

    const moves = history.map((squares, move)=>
    {
      let description;
      if ( move > 0) {
        description = 'Go to move #' + move;
      }
      else{
        description = 'Go to game start'
      }

      return (
        <li key={move}>
          <button onClick={()=>jumpTo(move)}>{description}</button>
        </li>
      )
    })
    return (
      <>
        <Heading level={1}>Hello {user.username}! Welcome to TicTacToe Game Online</Heading>

        <Button className='button' onClick={signOut}>Sign out</Button>
        <br></br><br></br><br></br>        <br></br><br></br><br></br>

        <div className="game">
     
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
      </>
      
    );
  }

  export default withAuthenticator(Game);


