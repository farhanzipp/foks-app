import * as p5 from 'p5';
import './style/style.css'
import { sketch } from './scripts/sketch.js';
import { canvas } from './scripts/canvas.js';

// const P5 = new p5(sketch);
const P5 = new p5(canvas);

document.querySelector('#app').innerHTML = `
    <h1>Kufi Drawing Canvas</h1>
    <main></main>
`