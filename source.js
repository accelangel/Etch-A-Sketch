const body = document.body;
const canvas = document.querySelector('.canvas');
const pixel = document.querySelector('.pixel');

const redButton = document.querySelector('.red');
const greenButton = document.querySelector('.green');
const blueButton = document.querySelector('.blue');
const eraserButton = document.querySelector('.eraser')
let paintColor = 'white';

const CANVAS_SIZE = 256;
const PIXEL_SIZE = 8;
const PIXEL_COUNT = CANVAS_SIZE / PIXEL_SIZE;

canvas.style.width = `${CANVAS_SIZE}px`;
canvas.style.height = `${CANVAS_SIZE}px`;

function drawCanvas() {
    for (i = 1; i <= PIXEL_COUNT * PIXEL_COUNT; i++) {
        createPixel(i);
    }
}

function createPixel(pixelNumber) {
    const pix = document.createElement('div');
    pix.setAttribute('id', `pix${pixelNumber}`);
    pix.classList.add('pixel');
    pix.style.width = `${PIXEL_SIZE}px`;
    pix.style.height = `${PIXEL_SIZE}px`;
    canvas.append(pix);
}

drawCanvas();

canvas.addEventListener("mousedown", () => {
    canvas.addEventListener('mouseover', e => {
        let mouseState = e.buttons;
        if (mouseState == 1) {
            console.log(e.target.id);
            let drawOn = document.getElementById(e.target.id);
            drawOn.style.backgroundColor = paintColor;
        }
    })
});

redButton.addEventListener('click', () => {
    paintColor = 'red';
});
greenButton.addEventListener('click', () => {
    paintColor = 'green';
});
blueButton.addEventListener('click', () => {
    paintColor = 'blue';
});
eraserButton.addEventListener('click', () => {
    paintColor = 'white';
});