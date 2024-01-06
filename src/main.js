import * as p5 from 'p5';
import './styles/style.css'
import { canvas } from './scripts/canvas.js';

const checkWidth = () => {
    let mainWidth = document.getElementById("main-canvas").offsetWidth;
    console.log(mainWidth);
    if (mainWidth > 1024 ) {
        mainWidth = 700;
    } else if (mainWidth > 640) {
        mainWidth = mainWidth - mainWidth * 0.2
    }
    return mainWidth;
}

document.querySelector('#app').innerHTML = `
<nav>
<h1 class="bg-blue-500 text-white p-4">Kufied</h1>
    <ul>
    </ul>
</nav>
<main id="main-canvas" class="my-5 bg-cyan-400"></main>
<div id="btn-container" class="p-2 flex flex-wrap gap-1"></div>
`
const mainWidth = checkWidth();
const P5 = new p5((p) => canvas(p, mainWidth));