const defaultSize = 16;

const drawWindow = document.getElementById('etchWindow');
function onLoad() {
    drawPixels(defaultSize);
    // Mouse control for the draw window
    // Controls mouse up function. If user releases mouse button, changes draw boolean to false
    document.querySelector('body').addEventListener('mouseup', function(){
    if (draw)
        draw = false;
    });    
    drawWindow.addEventListener('mousedown', () => draw = true);
}

function drawPixels(number) {
    for (let i = 0; i < number; i++) {
        // Create new row to append to drawWindow;
        let row = document.createElement('div');
        row.setAttribute('class', 'row');
        // Create pixels and add to row
        for (let j = 0; j < number; j++) {
            row.appendChild(createPixel());
        }
        // Append row to draw window
        drawWindow.appendChild(row);
    }
}

function createPixel() {
    const pixel = document.createElement('div');
    pixel.setAttribute('class', 'pixel');
    pixel.addEventListener('mousemove', changeBackground);
    return pixel;
}

let draw = false;       // Boolean dicates when pixels should be changed on mouseover 
// Color we draw in. Starts with the default value black.
let drawColor = document.querySelector('#colorPicker').value;

// Changes background to current color when moused over
function changeBackground(e) {
    // Don't do anything if mouse is not pressed
    if (!draw) {
        return;
    }
    // Gets the pixed that was pinged by the event
    const pixel = e.target;

    // Changes pixel background color
    pixel.style.backgroundColor = drawColor;
    e.stopPropagation();
}

function resetPixels() {
    const defaultBG = getComputedStyle(document.documentElement)
                    .getPropertyValue('--default-fill-color');
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(element => { 
        element.style.backgroundColor = defaultBG;
    });
}

function changeOutline() {
    const hide = document.querySelectorAll('.hide-outline');
    if (hide.length !== 0)
    {
        hide.forEach(element => {
            element.classList.remove('hide-outline');
        });
    }
    else {
        const addOutline = document.querySelectorAll('.pixel');
        addOutline.forEach(element => {
            element.classList.add('hide-outline');
        });
    }
}

function sliderUpdate() {
    const sliderSize = document.querySelector('#sliderSize');
    const gridSize = document.querySelector('#gridSize').value;
    sliderSize.innerText = `${gridSize} x ${gridSize}`;
    drawWindow.innerHTML = '';
    drawPixels(gridSize);
}

function changeColor() {
    // Update the brush color
    drawColor = document.querySelector('#colorPicker').value;
    // Update the color selector wrapper
    const btnClr = document.querySelector('.color-wrapper');
    btnClr.style.backgroundColor = drawColor;
}