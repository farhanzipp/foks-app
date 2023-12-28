export const createPixelEditor = (squareSize, noRows, noCols) => {
    const canvas = document.getElementById("pixelCanvas");
    const ctx = canvas.getContext('2d');
    let mouseIsPressed = false;
    let mouseButton;
    let mouseX;
    let mouseY;

    const displayGridPaper = () => {
        for (let row = 0; row < noRows; row++) {
            for (let col = 0; col < noCols; col++) {
                const x = col * squareSize;
                const y = row * squareSize;
                rect(x, y, squareSize, squareSize);
            }
        }
    };

    const displayCell = (x, y, color) => {
        const col = Math.floor(x / squareSize);
        const row = Math.floor(y / squareSize);

        if (col >= noCols || row >= noRows)
            return;

        const cellX = col * squareSize;
        const cellY = row * squareSize;

        fill(color);
        rect(cellX, cellY, squareSize, squareSize);
    };

    const loop = () => {
        if (mouseIsPressed) {
            const color = mouseButton === 0 ? "black" : "white";
            displayCell(mouseX, mouseY, color);
        }
    };

    const rect = (x, y, w, h) => {
        ctx.fillRect(x, y, w, h);
    };

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    canvas.addEventListener('mousedown', (e) => {
        mouseIsPressed = true;
        mouseButton = e.button;
    });

    canvas.addEventListener('mouseup', () => {
        mouseIsPressed = false;
    });

    return {
        setup: () => {
            displayGridPaper();
            setInterval(loop, 16);
        }
    };
};
