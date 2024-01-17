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
            // Remove "btn-active" class from all buttons
            const buttons = document.querySelectorAll('.tool-btn');
            buttons.forEach(button => button.classList.remove('btn-active'));

            // Add "btn-active" class to the clicked button
            document.getElementById("eraser").classList.add('btn-active');
        }
    });

    const handlePenTipChange = (newPenTip) => {
        console.log('Callback: Pen Tip Changed to', newPenTip);
        canvasInstance.setPentip(newPenTip);
        // Perform any additional actions you need here
    };

    const handleBackgroundChange = (newBg) => {
        console.log('Callback: Bg Changed to', newBg);
        canvasInstance.setBackground(newBg);
        // Perform any additional actions you need here
    };

    const pentipValue = customSelectElement("select-pentip", "selectPentip", handlePenTipChange);
    const backgroundValue = customSelectElement("select-background", "selectBackground", handleBackgroundChange);
};