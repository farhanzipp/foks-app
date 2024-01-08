import * as p5 from 'p5';
import './styles/style.css'
import { sketch } from './scripts/sketch.js';
import { toolsUi } from './scripts/toolsUi.js';

const checkWidth = () => {
    let mainWidth = document.getElementById("main-canvas").offsetWidth;
    console.log(mainWidth);
    if (mainWidth > 512 ) {
        mainWidth = 512;
    }
    return mainWidth;
}

document.querySelector('#app').innerHTML = `
<nav class="w-full">
    <div class="flex justify-between bg-blue-500 text-white p-4">
        <h1 class="font-bold">KUFPIX</h1>
        <p>v.1</p>
    </div>
</nav> 
<div id="btn-container" class="p-2">
    
</div>
<main id="main-canvas"></main>
<div id="btn-container1" class="p-2 flex flex-wrap gap-2">
    <button id="pen" class="tool-btn btn-active"><i class="fa-solid fa-pen"></i></button>
    <button id="eraser" class="tool-btn"><i class="fa-solid fa-eraser"></i></button>
    <button id="clear" class="tool-btn">Clr</button>

    <button id="btn-select" class="btn-select" value=""></button>
    <ul id="selectPentip">
        <li value="default" data-thumbnail="src/assets/eraser.png"></li>
        <li value="circle" data-thumbnail="src/assets/eraser.png"></li>
        <li value="hamzaN" data-thumbnail="src/assets/eraser.png"></li>
        <li value="hamzaE" data-thumbnail="src/assets/eraser.png"></li>
        <li value="hamzaS" data-thumbnail="src/assets/eraser.png"></li>
        <li value="hamzaW" data-thumbnail="src/assets/eraser.png"></li>
    </ul>
</div>
`
const mainWidth = checkWidth();

const sketchSettings = {
    canvasWidth: mainWidth,
    penTip: 'default',
  };

const canvasInstance = new p5((p) => sketch(p, sketchSettings));

toolsUi(canvasInstance);
