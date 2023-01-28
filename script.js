const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = Number(canvas.getAttribute('width'));
const height = Number(canvas.getAttribute('height'));

let field = [];
let count = 0;
let timer;

canvas.addEventListener('click', (event) => {
	let x = event.offsetX;
	let y = event.offsetY;
	x = Math.floor(x / 10);
	y = Math.floor(y / 10);
	field[x][y] = 1;
	cellFill();
});

function cellFill() {
	ctx.clearRect(0, 0, width, height);
	for (let i = 0; i < width / 10; i++) {
		for (let j = 0; j < height / 10; j++) {
			if (field[i][j] == 1) {
				ctx.fillRect(i * 10, j * 10, 10, 10);
			}
		}
	}
}

function fieldFill() {
	for (let i = 0; i < width / 10; i++) {
		field[i] = [];
		for (let j = 0; j < height / 10; j++) {
			field[i][j] = 0;
		}
	}
}

fieldFill();

function startLife() {
	let newField = [];
	for (let i = 0; i < width / 10; i++) {
		newField[i] = [];
		for (let j = 0; j < height / 10; j++) {
			let neighbors = 0;
			if (field[edgePos(i) - 1][j] == 1) neighbors++;
			if (field[i][edgeNeg(j) + 1] == 1) neighbors++;
			if (field[edgeNeg(i) + 1][j] == 1) neighbors++;
			if (field[i][edgePos(j) - 1] == 1) neighbors++;
			if (field[edgePos(i) - 1][edgeNeg(j) + 1] == 1) neighbors++;
			if (field[edgeNeg(i) + 1][edgeNeg(j) + 1] == 1) neighbors++;
			if (field[edgeNeg(i) + 1][edgePos(j) - 1] == 1) neighbors++;
			if (field[edgePos(i) - 1][edgePos(j) - 1] == 1) neighbors++;

			if (field[i][j] == 0 && neighbors == 3) {
				newField[i][j] = 1;
			} else if (field[i][j] == 1 && (neighbors > 3 || neighbors < 2)) {
				newField[i][j] = 0;
			} else {
				newField[i][j] = field[i][j];
			}
		}
	}
	field = newField;
	cellFill();
	count++;
	document.getElementById('count').innerHTML = count;
	timer = setTimeout(startLife, 300);
}

function edgePos(i) {
	if (i == 0) return width / 10;
	else return i;
}

function edgeNeg(i) {
	if (i == height / 10 - 1) return -1;
	else return i;
}

document.getElementById('start').addEventListener('click', startLife);
