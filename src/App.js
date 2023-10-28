import React, { useEffect, useState } from 'react'
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import { withAuthenticator, Button, Heading, Text, TextField, View } from '@aws-amplify/ui-react';import '@aws-amplify/ui-react/styles.css';
import Board from "./components/board";
import awsExports from "./aws-exports";


Amplify.configure(awsExports);

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const currentSquares = history[history.length - 1];
  
    function handlePlay(nextSquares) {
      setHistory([...history, nextSquares]);
      setXIsNext(!xIsNext);
    }
  
    return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{/*TODO*/}</ol>
        </div>
      </div>
    );
  }



