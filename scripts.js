// 1. setup board
// 2. user should be able to click a box and a mark shows up
// 3. put an onclick on the first square
// ---when user clicks, call functionthat putas x on the box
// MILESTONE
// 4. keep track of who's turn it is
// 5. when a square is clicked put the symbol in and change who's turn it is
// 6. keep player from overwriting a square
// 7. we need a win checker

var whosTurn = 1 //init whosTurn to player 1
var player1Squares = [];
var player2Squares = [];
var someoneWon = false;
var computerPlayer = false;

// setup winners array
var winningCombos = [
	['A1','B1','C1'],
	['A2','B2','C2'],
	['A3','B3','C3'],	
	['A1','A2','A3'],
	['B1','B2','B3'],
	['C1','C2','C3'],
	['A1','B2','C3'],
	['A3','B2','C1']
];

	// console.log(winningCombos)

function onePlayerGame(){
	computerPlayer = true;

}

function resetGame(){
	whosTurn = 1 //init whosTurn to player 1
	player1Squares = [];
	player2Squares = [];
	someoneWon = false;
	computerPlayer = false;
	message = ""
	document.getElementById('message').innerHTML = message;
	var squareDivs = document.getElementsByClassName('square');
	for(var i = 0; i < 9; i++){
		squareDivs[i].innerHTML = " ";
		squareDivs[i].className = "square";
	}
}

function markSquare(currentSquare){
	if((currentSquare.innerHTML === "X") || (currentSquare.innerHTML === "O")){
		// console.log("Someone is there. stop cheating.");
		return "taken";
	}else if(someoneWon){
		console.log("Someone already won")
	}else{

		if(whosTurn === 1){
			currentSquare.innerHTML = "X";
			whosTurn = 2;
			player1Squares.push(currentSquare.id);
			checkWin(1, player1Squares);
			
			if(computerPlayer){
				computerMove();
			}
		}else{
			currentSquare.innerHTML = "O";
			whosTurn = 1;
			player2Squares.push(currentSquare.id);
			checkWin(2, player2Squares);
		}
	}
}

function computerMove(){
	// find a random square
	var needASquare = true;
	var squareDivs = document.getElementsByClassName('square');
	while(needASquare){
		var randomNumber = (Math.ceil(Math.random() * 8)) + 1;
		var randomSquare = squareDivs[randomNumber];
		isTaken = markSquare(randomSquare);
		console.log(isTaken);
		if(isTaken !== "taken"){
			needASquare = false;
		}
	}
}

function checkWin(whoJustWent, currentPlayerSquares){
	//outer length
	for(var i = 0; i < winningCombos.length; i++){
		// innerloop
		var rowCount = 0;
		for(var j = 0; j < winningCombos[i].length; j++){
			// console.log(winningCombos[i][j]);
			var winningSquare = winningCombos[i][j];
			if (currentPlayerSquares.indexOf(winningSquare) > -1){
				//hit! player has this square somwhere.
				rowCount++;
			}
		}
		if(rowCount === 3){
			console.log("Player" + whoJustWent + " won!")
			gameOver(whoJustWent, winningCombos[i]);
			break;
		}
	// console.log("combo complete")
	}
}

function gameOver(whoJustWon, winningCombo){
	var message = "Congrats to player " + whoJustWon + ". You just won with " + winningCombo + ".";
	document.getElementById('message').innerHTML = message;
	for(var i = 0; i <winningCombo.length; i++){
		document.getElementById(winningCombo[i]).className += ' winning-square';
	}
	someoneWon = true;
}