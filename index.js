let numOfSquares = 6;
const squares = document.querySelectorAll('.square');
const resetButton = document.querySelector('#reset');
const headParagraph = document.querySelector('#head');
const colorDisplay = document.querySelector('#colorDisplay');
const message = document.querySelector('#message');
const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');

easyBtn.addEventListener('click', e => {
	easyBtn.classList.add('selected');
	hardBtn.classList.remove('selected');
	numOfSquares = 3;
	colors = generateSomeRandomColors(numOfSquares);
	for (let i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = 'none';
		}
	}
	resetGame();
});
hardBtn.addEventListener('click', e => {
	easyBtn.classList.remove('selected');
	hardBtn.classList.add('selected');
	numOfSquares = 6;
	colors = generateSomeRandomColors(numOfSquares);
	for (let i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = 'block';
	}
	resetGame();
});

//generating rgb color
const generateRGB = () => {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	return `rgb(${r}, ${g}, ${b})`;
};
//looping and pushing to the array
const generateSomeRandomColors = num => {
	let colorsArr = [];
	for (let i = 0; i < num; i++) {
		colorsArr.push(generateRGB());
	}
	return colorsArr;
};
let colors = generateSomeRandomColors(numOfSquares);
//reset the game
resetButton.addEventListener('click', e => {
	colors = generateSomeRandomColors(numOfSquares);
	displaySquares();
	resetGame();
});
//choose  a random color from our colors array
const pickColor = () => {
	let randomColorIndex = Math.floor(Math.random() * colors.length);
	return colors[randomColorIndex];
};

let pickedColor = pickColor();
colorDisplay.textContent = pickedColor;
displaySquares();
function displaySquares() {
	for (let i = 0; i < colors.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener('click', e => {
			let clickedColor = e.target.style.backgroundColor;
			if (clickedColor === pickedColor) {
				message.textContent = 'Correct!';
				message.style.color = '#09bf09';
				resetButton.textContent = 'play again ?!';
				for (const square of squares) {
					square.style.backgroundColor = e.target.style.backgroundColor;
					headParagraph.style.backgroundColor = e.target.style.backgroundColor;
				}
			} else {
				e.target.style.backgroundColor = '#232323';
				message.textContent = 'Try Again';
				message.style.color = '#f00';
			}
		});
	}
}
function resetGame() {
	message.textContent = '';
	headParagraph.style.backgroundColor = 'steelblue';
	if (resetButton.textContent === 'play again ?!') {
		resetButton.textContent = 'new colors';
	}
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
}
