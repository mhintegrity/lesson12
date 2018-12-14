// Mark Harder, Basic Tic Tac Toe, Lesson 12, MHIntegrity
// setup the inital state of the board by creating our gameState variable.
// so that we can restart a new game by reinitializing the state, use a function.
// Games can be either turn based on realtime, this game is turn based.
let gameState = {};

InitializeBoardState();


function InitializeBoardState() {
    gameState = {
        board: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
        Next: "X",
        Winner: ""
    };

    // add events for when the users click on squares.
    document.querySelectorAll('.sq').forEach((element) => {
        element.addEventListener('click', MainGameLogic);
    });

    // Update the screen so it is ready to go for the first turn.
    UpdateScreenState();
}

// Use our gameState data to update what is displayed on our app page
function UpdateScreenState() {
    // If there is a winner show it.
    if (gameState.Winner === "") {
        document.getElementById('Winner').innerText = `It is ${gameState.Next}'s turn`;
    } else {
        if (gameState.Winner == "Tie") {
            document.getElementById('Winner').innerText = `The game is a Tie`;
        } else {
            document.getElementById('Winner').innerText = `The winner is ${gameState.Winner}`;
        }
    }

    // Update each of the board squares based on gameState
    for (let row = 0; row <= 2; row++) {
        for (let col = 0; col <= 2; col++) {
            document.getElementById(row.toString() + col.toString()).innerText = gameState.board[row][col];
        }
    }
}

// Event based game loop, called when the user click/chooses a game board square.
function MainGameLogic(event) {
    // event.target.id[0] returns a string, so we need to convert it to a number.
    let row = Number(event.target.id[0]);
    let col = Number(event.target.id[1]);

    // add the next X or O
    gameState.board[row][col] = gameState.Next;
    // change the next X or O
    gameState.Next = gameState.Next === "X" ? "O" : "X";

    // remove the event from the grid so there is no new event
    event.target.removeEventListener('click', MainGameLogic);

    // Check to see if we have a winner
    if (CheckForWinner()) {
        // After we have a winner remove the events for remaining squares so they don't fire.
        for (let row = 0; row <= 2; row++) {
            for (let col = 0; col <= 2; col++) {
                if (gameState.board[row][col] === "") {
                    document.getElementById(`${row}${col}`).removeEventListener('click', MainGameLogic);
                }
            }
        }
    };

    UpdateScreenState();
}

function CheckForWinner() {
    // Here is the simplest logic for checking every possibility for win.
    let row1 = gameState.board[0][0] + gameState.board[0][1] + gameState.board[0][2];
    let row2 = gameState.board[1][0] + gameState.board[1][1] + gameState.board[1][2];
    let row3 = gameState.board[2][0] + gameState.board[2][1] + gameState.board[2][2];
    
    // first check to see of the board is full
    if (row1.length + row2.length + row3.length === 9) {
        gameState.Winner = "Tie";
    }
    
    // check rows for win
    if (row1 === "XXX" || row2 === "XXX" || row3 === "XXX") {
        gameState.Winner = "X";
    }
    if (row1 === "OOO" || row2 === "OOO" || row3 === "OOO") {
        gameState.Winner = "O";
    }

    // check cols for win
    let col1 = gameState.board[0][0] + gameState.board[1][0] + gameState.board[2][0];
    let col2 = gameState.board[0][1] + gameState.board[1][1] + gameState.board[2][1];
    let col3 = gameState.board[0][2] + gameState.board[1][2] + gameState.board[2][2];    
    if (col1 === "XXX" || col2 === "XXX" || col3 === "XXX") {
        gameState.Winner = "X";
    }
    if (col1 === "OOO" || col2 === "OOO" || col3 === "OOO") {
        gameState.Winner = "O";
    }

    // check diaginal for win
    let x1 = gameState.board[0][0] + gameState.board[1][1] + gameState.board[2][2];
    let x2 = gameState.board[0][2] + gameState.board[1][1] + gameState.board[2][0];
    if (x1 === "XXX" || x2 === "XXX") {
        gameState.Winner = "X";
    }
    if (x1 === "OOO" || x2 === "OOO") {
        gameState.Winner = "O";
    }

    // Return true if the a winner has been found.
    return (gameState.Winner.length > 0);
}