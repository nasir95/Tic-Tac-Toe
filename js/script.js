// IPO 

// Input Process Output

// 1) Define the inputs - Constants and State Variables

const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const KEY = {
    '1' :'X',
    '-1' :'O',
    'null': ''
};

// Things that change - turn, winner, gameboard

let turn, winner, gameboard;


// Need to cache elemnet references 

const squares = document.querySelectorAll('.square');
const message = document.querySelector('#message');

// Define my process

// Add event listeners
document.querySelector('#gameboard').addEventListener('click', handleClick);
document.querySelector('#reset').addEventListener('click', init);


// This is where I start or restart the game
init(); // Call the function to start the game

function init() {
    winner = false; // don't have a winner - starting from zero
    turn = 1;
    gameboard = [null, null, null, null, null, null, null, null, null];
    render();
}

function handleClick(evt){
    // Assign clicked square to a variable
    const selectedIndex = parseInt(evt.target.dataset.index);
    if(gameboard[selectedIndex] || winner) return;
    gameboard[selectedIndex] = turn;
    turn *= -1;
    winner = checkWinner();
    console.log(winner);
    render();
    
};

function render(){
    gameboard.forEach(function(elem, index) {
        squares[index].textContent = KEY[elem];
        
    });
    message.textContent = `${KEY[turn]}'s Turn`;
    if(winner == 1){
        message.textContent = `X Wins!`;
    }else if(winner == -1){
        message.textContent = 'O Wins!';
    }
    if(winner == 'T'){
        message.textContent = 'Tie Game';
    }
}

function checkWinner(){
    for(let i = 0; i < COMBOS.length; i++){
        if(Math.abs(gameboard[COMBOS[i][0]] + 
                    gameboard[COMBOS[i][1]] + 
                    gameboard[COMBOS[i][2]]) === 3) return gameboard[COMBOS[i][0]];
        }      
        if(gameboard.includes(null)) return false;
        return 'T';
}


