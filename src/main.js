import * as p5 from 'p5';
import './styles/style.css'
import { sketch } from './scripts/sketch.js';
import { configureUi } from './scripts/configureUi.js';

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

    <button id="select-pentip" class="custom-select" value=""></button>
    <ul id="selectPentip">
        <li id="pentip" value="pen" data-thumbnail="src/assets/square.png"></li>
        <li id="pentip" value="circle" data-thumbnail="src/assets/circle.png"></li>
        <li id="pentip" value="hamzaN" data-thumbnail="src/assets/hamzaN.png"></li>
        <li id="pentip" value="hamzaE" data-thumbnail="src/assets/hamzaE.png"></li>
        <li id="pentip" value="hamzaS" data-thumbnail="src/assets/hamzaS.png"></li>
        <li id="pentip" value="hamzaW" data-thumbnail="src/assets/hamzaW.png"></li>
    </ul>
</div>
`
const checkWidth = () => {
    let mainWidth = document.getElementById("main-canvas").offsetWidth;
    console.log(mainWidth);
    if (mainWidth > 512 ) {
        mainWidth = 512;
    }
    return mainWidth;
}

const mainWidth = checkWidth();

const sketchSettings = {
    canvasWidth: mainWidth
};

const canvasInstance = new p5((p) => sketch(p, sketchSettings));

configureUi(canvasInstance);