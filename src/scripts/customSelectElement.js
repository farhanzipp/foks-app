export const customSelectElement = (buttonId, listId, onChangeCallback) => {
    const selectButton = document.getElementById(buttonId);
    const list = document.getElementById(listId);

    if (!selectButton || !list) {
        console.error('Button or list not found. Check the provided IDs.');
        return null; // or some default value indicating an error
    }

    const listElements = list.querySelectorAll('li');

    listElements.forEach((element) => {
        // set image
        element.innerHTML = `<img src="${element.getAttribute('data-thumbnail')}"/>`;

        // change current selection on click on item
        element.onclick = () => {
            // hide selection list
            list.style.display = 'none';

            // set selected
            selectButton.setAttribute('value', element.getAttribute('value'));
            selectButton.innerHTML = element.outerHTML;

            // Return the selected value through the callback function
            let pentipValue = element.getAttribute('value');
            onChangeCallback(pentipValue);
        };
    });

    // set the button to the first element initially
    selectButton.innerHTML = listElements[0].outerHTML;
    selectButton.setAttribute('value', listElements[0].getAttribute('value'));

    // toggle list visibility on button click
    selectButton.onclick = () => {
        list.style.display = list.style.display === 'inline' ? 'none' : 'inline';
    };

    // Return the initial selected value
    return listElements[0].getAttribute('value');
};


