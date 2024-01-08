import { customSelectElement } from "./selectedWithImage";

export const toolsUi = (canvasInstance) => {
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
            // Remove "btn-active" class from all buttons
            const buttons = document.querySelectorAll('.tool-btn');
            buttons.forEach(button => button.classList.remove('btn-active'));

            // Add "btn-active" class to the clicked button
            document.getElementById("eraser").classList.add('btn-active');
        }
    });

    // Add more listeners as needed
    customSelectElement();

    document.getElementById("btn-select").addEventListener("change", (event) => {
        const newPenTip = event.target.value;
        canvasSettings.penTip = newPenTip;
    })

};