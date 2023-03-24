const themeButton = document.getElementById("theme-switcher");
const iconMoon = document.getElementById('icon-moon');
const iconSun = document.getElementById('icon-sun');
const textNode = themeButton.childNodes[0];



themeButton.addEventListener('click', switchTheme);

function switchTheme() {
 
        // Get all elements in the document
    const elements = document.querySelectorAll('*');
        // Loop through each element
    elements.forEach(element => {
      // Check if the element has a class
      if (element.classList.length > 0) {
        // Loop through each class of the element
        element.classList.forEach(className => {
          // Check if the class is 'light' or 'dark'
          if (className === 'light') {
            element.classList.remove('light');
            element.classList.add('dark');
            iconMoon.style.display= 'none';
            iconSun.style.display= 'block';
            textNode.textContent = 'LIGHT';
            themeButton.style.color = '#FFF';
                       
           
          } else if (className === 'dark') {
            element.classList.remove('dark');
            element.classList.add('light');
            iconMoon.style.display= 'block';
            iconSun.style.display= 'none';
            textNode.textContent = 'DARK';
            themeButton.style.color = '#4b6A9B';
            
                       
          }
        });
      }
    });
  }



