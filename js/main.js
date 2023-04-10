const themeButton = document.getElementById("theme-switcher");
const iconMoon = document.getElementById('icon-moon');
const iconSun = document.getElementById('icon-sun');
const textNode = themeButton.childNodes[0];



themeButton.addEventListener('click', switchTheme);

function switchTheme() {
 
       
    const elements = document.querySelectorAll('*');
        
    elements.forEach(element => {
      // Check if the element has a class
      if (element.classList.length > 0) {
        
        element.classList.forEach(className => {
          
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



