//--------------------------------------------------Setup Variables
const canvas = document.querySelector('.canvas');
const pixel = document.querySelector('.pixel');

const colorsButton = document.querySelector('.colors');
const rainbowButton = document.querySelector('.rainbow');
const eraserButton = document.querySelector('.eraser')
const clearButton = document.querySelector('.clear')
const resizeButton = document.querySelector('.resize');
const gridButton = document.getElementById('showGrid')

let canvasPixels = []; //Array to store 'id' of every pixel in the canvas
colorInput.value = '#00FFFB'; //Fixes a bug in github pages where default is black
let brushColor = '#00FFFB'; //Initial color of the default brush
let brush = 'colors';


let previousButton = colorsButton;
//--------------------------------------------------Draw Canvas
const CANVAS_SIZE = 320;
const gridOptions = [4, 8, 16, 32, 64];
let gridOptionsIndex = 2;

canvas.style.width = `${CANVAS_SIZE}px`;
canvas.style.height = `${CANVAS_SIZE}px`;

resizeButton.addEventListener('click', () => {
    gridOptionsIndex = (gridOptionsIndex + 1) % gridOptions.length;
    resizeButton.textContent = `${gridOptions[gridOptionsIndex]}x${gridOptions[gridOptionsIndex]}`;
    canvas.innerHTML = '';
    drawCanvas(gridOptions[gridOptionsIndex]);
});

function drawCanvas(gridOption) {
    canvasPixels = [];
    let pixelSize = CANVAS_SIZE / gridOption;
    for (i = 0; i < gridOption * gridOption; i++) {
        createPixel(i, pixelSize);
        canvasPixels.push(`pix${i}`);
    }
}

function createPixel(pixelNumber, pixelSize) {
    const pix = document.createElement('div');
    pix.setAttribute('id', `pix${pixelNumber}`);
    pix.classList.add('pixel');
    pix.style.width = `${pixelSize}px`;
    pix.style.height = `${pixelSize}px`;
    canvas.append(pix);
}

colorsButton.classList.add('selected');
drawCanvas(gridOptions[gridOptionsIndex]);
//--------------------------------------------------Draw Colors
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
    if (button != previousButton) {
        button.classList.add('selected');
        previousButton.classList.remove('selected');
        previousButton = button;
    }
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

