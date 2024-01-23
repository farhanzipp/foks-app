import * as p5 from 'p5';
import './styles/style.css'
import { sketch } from './scripts/sketch.js';
import { configureUi } from './scripts/configureUi.js';

document.querySelector('#app').innerHTML = `
    <nav>
        <div class="flex justify-between bg-blue-500 text-white p-4">
            <h1 class="font-bold">KUFIFY</h1>
            <p>v.1</p>
        </div>
    </nav>

    <div id="btn-container" class="p-3 flex gap-3 items-center">
        <input type="color" id="select-color" name="color" value="#333333" />
        <div class="flex">
            <label for="select-pensize">Pen Size : </label>
            <select id="select-pensize" class="" name="select-pensize">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
    </div>
    
    <main class="px-3">
        <div id="main-canvas"></div>
    </main>

    <div id="btn-container1" class="p-3 mt-9 flex justify-between">
        <button id="pen" class="tool-btn btn-active"><i class="fa-solid fa-pen"></i></button>
        <button id="eraser" class="tool-btn"><i class="fa-solid fa-eraser"></i></button>
        <button id="clear" class="tool-btn">Clr</button>
        
        <div class="custom-select-container">
            <button id="select-pentip" class="custom-select" value=""></button>
            <ul id="selectPentip" class="custom-select-ul">
                <li value="pen" data-thumbnail="src/assets/square.png"></li>
                <li value="circle" data-thumbnail="src/assets/circle.png"></li>
                <li value="hamzaN" data-thumbnail="src/assets/hamzaN.png"></li>
                <li value="hamzaE" data-thumbnail="src/assets/hamzaE.png"></li>
                <li value="hamzaS" data-thumbnail="src/assets/hamzaS.png"></li>
                <li value="hamzaW" data-thumbnail="src/assets/hamzaW.png"></li>
            </ul>
        </div>

        <div class="custom-select-container">
            <button id="select-background" class="custom-select" value=""></button>
            <ul id="selectBackground" class="custom-select-ul">
                <li value="background1" data-thumbnail="src/assets/bgBasic.png"></li>
                <li value="background2" data-thumbnail="src/assets/bgBasic.png"></li>
                <li value="background3" data-thumbnail="src/assets/bgBasic.png"></li>
                <li value="grid" data-thumbnail="src/assets/bgBasic.png"></li>
                <li value="dot" data-thumbnail="src/assets/bgBasic.png"></li>
            </ul>
        </div>

        <button id="download" class="tool-btn">Download</button>
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