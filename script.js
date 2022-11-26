let alphabet = "abcdefghijklmnopqrstuvwxyz";
let alphabetArray = Array.from(alphabet);
let letters = document.querySelector(".letters");
alphabetArray.forEach((letter) => {
	let spanLetter = document.createElement("span");
	let letterInSpan = document.createTextNode(letter);
	spanLetter.className = "span-letter";
	spanLetter.appendChild(letterInSpan);
	letters.appendChild(spanLetter);
});

let words = {
	programming: ["JavaScript", "PhP", "Ruby", "CSS", "Python", "C"],
	Movies: [
		"Pulp Fiction",
		"Kill Bill",
		"irishman",
		"GoodFellas",
		"Casino",
		"Departed",
		"Scarface",
		"Godfather",
		"Taxi Driver",
		"UP",
		"lion King",
	],
	people: [
		"albert einstein",
		"isaac newton",
		"Ahmed Zewil",
		"Mohamed Salah",
		"messi",
		"Ronaldo",
	],
	countries: ["Egypt", "Qatar", " unitsia", "turkey"],
};

let allKays = Object.keys(words);
let randomKayNum = Math.floor(Math.random() * allKays.length);
let randomKay = allKays[randomKayNum];
let randomkayArray = words[randomKay];
let randomWordNum = Math.floor(Math.random() * randomkayArray.length);
// final random word
let randomWord = randomkayArray[randomWordNum].toLowerCase();
// //////////////////////////////////////////////////////
document.querySelector(".game-info .catigory span").innerHTML = randomKay;

let lettersAndSpaces = Array.from(randomWord);
let letterGuessContaier = document.querySelector(".letters-guess");

lettersAndSpaces.forEach((letter) => {
	let emptyspan = document.createElement("span");
	if (letter === " ") {
		emptyspan.classList = "has-space";
	}
	letterGuessContaier.appendChild(emptyspan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");
let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {
	let theStatus = false;
	if (e.target.className === "span-letter") {
		e.target.classList.add("clicked");

		let clickedLetter = e.target.innerHTML.toLowerCase();
		lettersAndSpaces.forEach((wordLetter, wordIndex) => {
			if (clickedLetter === wordLetter) {
				theStatus = true;
				guessSpans.forEach((span, spanIndex) => {
					if (wordIndex === spanIndex) {
						span.innerHTML = wordLetter;
					}
				});
			}
		});
		if (theStatus !== true) {
			wrongAttempts++;
			theDraw.classList.add(`wrong-${wrongAttempts}`);
			let failAudio = new Audio("./327736__distillerystudio__error-03.wav");
			failAudio.play();
			if (wrongAttempts === 8) {
				endGame();
			}
		} else {
			let successAudio = new Audio("./171671__leszek-szary__success-1.wav");
			successAudio.play();
		}
	}
});
let popUp = document.querySelector(".popUp");
let refresh = document.getElementById("refresh");

function endGame() {
	letters.style.pointerEvents = "none";
	refresh.addEventListener("click", () => {
		window.location.reload();
	});
	popUp.style.visibility = "visible";
}
