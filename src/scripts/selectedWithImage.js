export const customSelectElement = () => {
    const list = document.getElementById('selectPentip');
    const listElements = list.querySelectorAll('li');
    const selectButton = document.getElementById("btn-select");

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
        };
      });
      
      // set the button to first element initially
      selectButton.innerHTML = listElements[0].outerHTML;
      selectButton.setAttribute('value', listElements[0].getAttribute('value'));
      
      // toggle list visibility on button click
      selectButton.onclick = () => {
        list.style.display = list.style.display === 'inline' ? 'none' : 'inline';
      };
}