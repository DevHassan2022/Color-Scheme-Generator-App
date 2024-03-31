// DOM
const toggle = document.querySelector('.dropdown-toggle')
const menu = document.querySelector('.dropdown-menu')

// Colors Array
let colorsArray = []

// Event Listener To Toggle Dropdown Menu Display
toggle.addEventListener('click', ()=> {
    menu.style.display = menu.style.display === 'block'? 'none' : 'block'
})

// Event Delegation for Clicks on Dropdown Items
menu.addEventListener('click', e => {
    if(e.target.classList.contains('dropdown-item')){
        const items = document.querySelectorAll('.dropdown-item')
        const selectedItem = e.target
        items.forEach(item => item.classList.remove('selected'))
        selectedItem.classList.add('selected')
        toggle.textContent = selectedItem.textContent
    }
})

// Mode Setting Functionality
document.getElementById('get-colorscheme-btn').addEventListener('click', ()=> {
       const selectedModeElement = document.querySelector('.selected')
       const selectedMode = selectedModeElement ? selectedModeElement.dataset.value : 'monochrome'
       getColorSchemes(selectedMode)  
})

// Interacting With The Color API To Fetch Color Schemes
function getColorSchemes(selectedMode) {
    const selectedColor = document.getElementById('selected-color')
    fetch(`https://www.thecolorapi.com/scheme?hex=${selectedColor.value.slice(1)}&mode=${selectedMode}`)
        .then(res => res.json())
        .then(data => {
            colorsArray = data.colors
            getColorsHtml()
        });
}

//Function To Extract Color Codes And Generate HTML 
function getColorsHtml() {
    let colorsHTML = ''
    let colorHexCodes = ''
   
    colorsArray.forEach(color => {
        const colorCode = color.hex.value
        
        colorsHTML += `<div class="color-column" style="background:${colorCode}" onclick="copyToClipboard('${colorCode}')"></div>`
        colorHexCodes += `<p class="color-hex-values" onclick="copyToClipboard('${colorCode}')">${colorCode}</p>`
    })
    
    renderColors(colorsHTML, colorHexCodes)
}

// Function To Render Color Columns
function renderColors(colorsHTML, colorHexCodes) {
    document.getElementById('color-columns-container').innerHTML = colorsHTML
    document.getElementById('color-codes-container').innerHTML = colorHexCodes    
}


// Function to copy hex value to clipboard
function copyToClipboard(text) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showCopiedMessage(text)
}

// Function to display copies message
function showCopiedMessage(text) {
    const message = document.createElement('div');
    message.textContent = `Copied!  ${text}`;
    message.classList.add('copied-message');
    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 1000);
}