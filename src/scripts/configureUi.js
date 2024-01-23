import { customSelectElement } from "./customSelectElement";

export const configureUi = (canvasInstance) => {
    document.getElementById("pen").addEventListener("click", () => {
        if (canvasInstance.setTool) {
            canvasInstance.setTool("pen");
            // Remove "btn-active" class from all buttons
            const buttons = document.querySelectorAll('.tool-btn');
            buttons.forEach(button => button.classList.remove('btn-active'));

            // Add "btn-active" class to the clicked button
            document.getElementById("pen").classList.add('btn-active');
        }
    });

    document.getElementById("clear").addEventListener("click", () => {
        if (canvasInstance.clearDrawing) {
            canvasInstance.clearDrawing();
        }
    });

    document.getElementById("eraser").addEventListener("click", () => {
        if (canvasInstance.setTool) {
            canvasInstance.setTool("eraser");

            const buttons = document.querySelectorAll('.tool-btn');
            buttons.forEach(button => button.classList.remove('btn-active'));

            document.getElementById("eraser").classList.add('btn-active');
        }
    });

    document.getElementById("download").addEventListener("click", () => {
        if (canvasInstance.downloadImage) {
            canvasInstance.downloadImage();
        }
    });

    document.getElementById("select-pensize").addEventListener("change", () => {
        const size = document.getElementById("select-pensize").value;
        if (canvasInstance.setPensize) {
            canvasInstance.setPensize(size);
        }
    });

    document.getElementById("select-color").addEventListener("change", () => {
        const color = document.getElementById("select-color").value;
        if (canvasInstance.setColor) {
            canvasInstance.setColor(color);
        }
    });

    //custom select with image
    const handlePenTipChange = (newPenTip) => {
        canvasInstance.setPentip(newPenTip);
    };

    const handleBackgroundChange = (newBg) => {
        canvasInstance.setBackground(newBg);
    };

    const pentipValue = customSelectElement("select-pentip", "selectPentip", handlePenTipChange);
    const backgroundValue = customSelectElement("select-background", "selectBackground", handleBackgroundChange);
};