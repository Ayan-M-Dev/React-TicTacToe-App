import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const handleCellPress = useCallback((index) => {
    if (board[index] !== '') {
      // Cell is already occupied. Do nothing.
      return;
    }

    // Update the clicked cell with the current player's mark
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Check for win/draw condition
    const isWin = checkWinCondition(newBoard, currentPlayer);
    const isDraw = !newBoard.includes('');

    if (isWin) {
      // Handle win condition
      console.log(`Player ${currentPlayer} wins!`);
      // Reset the board and other game variables
      resetGame();
    } else if (isDraw) {
      // Handle draw condition
      console.log("It's a draw!");
      // Reset the board and other game variables
      resetGame();
    } else {
      // Toggle current player
      setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
    }
  }, [board, currentPlayer]);

  const checkWinCondition = (board, player) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] === player && board[b] === player && board[c] === player) {
        return true;
      }
    }

    return false;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
  };

  useEffect(() => {
    resetGame();
  }, []);

  const renderCell = (index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.cell}
        onPress={() => handleCellPress(index)}
      >
        <Text style={styles.cellText}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe Game</Text>

      <View style={styles.board}>
        {board.map((_, index) => renderCell(index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Center the board horizontally
    alignItems: 'center', // Center the board vertically
  },
  cell: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  cellText: {
    fontSize: 36,
  },
});

export default App;
