//--------------------------------------------------Setup Variables
const canvas = document.querySelector('.canvas');
const pixel = document.querySelector('.pixel');

const colorsButton = document.querySelector('.colors');
const rainbowButton = document.querySelector('.rainbow');
const eraserButton = document.querySelector('.eraser')
const clearButton = document.querySelector('.clear')
const colorInput = document.getElementById('colorInput');

let canvasPixels = []; //Array to store 'id' of every pixel in the canvas
colorInput.value = '#00FFFB';
let brushColor = colorInput.value;//Initial color of the default brush
let brush = 'colors';

let previousButton = colorsButton;
//--------------------------------------------------Draw Canvas
const CANVAS_SIZE = 272;
const PIXEL_SIZE = 16;
const PIXEL_COUNT = CANVAS_SIZE / PIXEL_SIZE;

canvas.style.width = `${CANVAS_SIZE}px`;
canvas.style.height = `${CANVAS_SIZE}px`;

function drawCanvas() {
    for (i = 1; i <= PIXEL_COUNT * PIXEL_COUNT; i++) {
        createPixel(i);
        canvasPixels.push(`pix${i}`);
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

colorsButton.classList.add('selected');
drawCanvas();
//--------------------------------------------------The drama
function drawColors(e) {
    let drawOn = document.getElementById(e.target.id);
    if (e.buttons == 1) {
        if (brush == 'colors') {
            drawOn.style.backgroundColor = brushColor;
        }
        else if (brush == 'rainbow') {
            let randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            drawOn.style.backgroundColor = randomColor;
        }
    }
}

canvas.addEventListener("mousedown", e => {
    drawColors(e);
    canvas.addEventListener('mouseover', e => {
        drawColors(e);
    })
});

colorInput.addEventListener('input', () => {
    brushColor = colorInput.value;
    brush = 'colors';
})

colorsButton.addEventListener('click', () => {
    brushColor = colorInput.value;
    brush = 'colors';
    selectedButton(colorsButton);
})

rainbowButton.addEventListener('click', () => {
    brush = 'rainbow';
    selectedButton(rainbowButton);
})

eraserButton.addEventListener('click', () => {
    brush = 'colors';
    brushColor = 'white';
    selectedButton(eraserButton);
});

function selectedButton(button) {
    button.classList.add('selected');
    previousButton.classList.remove('selected');
    previousButton = button;
}

clearButton.addEventListener('click', () => {
    clearCanvas();
});

function clearCanvas() {
    for (id of canvasPixels) {
        let drawOn = document.getElementById(id);
        drawOn.style.backgroundColor = 'white';
    }
}


