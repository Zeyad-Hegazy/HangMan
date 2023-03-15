const alphabet = "abcdefghijklmnopqrstuvwxyz";
let alphabetArray = Array.from(alphabet);

const letters = document.querySelector(".letters");

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
	celebrities: [
		"albert einstein",
		"isaac newton",
		"Ahmed Zewil",
		"Mohamed Salah",
		"messi",
		"Ronaldo",
	],
	countries: ["Egypt", "Qatar", "tunisia", "turkey"],
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

const guessSpans = document.querySelectorAll(".letters-guess span");
const theDraw = document.querySelector(".hangman-draw");
let wrongAttempts = 0;
let correctAttempts = [];

document.addEventListener("click", (e) => {
	let theStatus = false;
	if (e.target.className === "span-letter") {
		e.target.classList.add("clicked");

		let clickedLetter = e.target.innerHTML.toLowerCase();
		lettersAndSpaces.forEach((wordLetter, wordIndex) => {
			if (clickedLetter === wordLetter) {
				theStatus = true;

				correctAttempts.push(true);

				guessSpans.forEach((span, spanIndex) => {
					if (wordIndex === spanIndex) {
						span.innerHTML = wordLetter;
					}
				});
			}
		});

		if (theStatus === false) {
			++wrongAttempts;
			theDraw.classList.add(`wrong-${wrongAttempts}`);
			let failAudio = new Audio("./327736__distillerystudio__error-03.wav");
			failAudio.play();
			if (wrongAttempts === 8) {
				endGame();
			}
		} else {
			let successAudio = new Audio("./171671__leszek-szary__success-1.wav");
			successAudio.play();
			if (lettersAndSpaces.length === correctAttempts.length) {
				wonGame();
			}
		}
	}
});

const popUp = document.querySelector(".popUp");
const won = document.querySelector(".won");
const answer = document.getElementById("answer");
const refresh = document.querySelectorAll(".refresh");

function wonGame() {
	won.style.visibility = "visible";
	refresh.forEach((e) => {
		e.addEventListener("click", () => {
			window.location.reload();
		});
	});
}

function endGame() {
	answer.append(`The Word Is : ${randomWord}`);
	letters.style.pointerEvents = "none";
	refresh.forEach((e) => {
		e.addEventListener("click", () => {
			window.location.reload();
		});
	});
	popUp.style.visibility = "visible";
}
