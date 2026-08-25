let tabNames = ['primary-hub-menu-tab-content', 'secondary-hub-menu-tab-content', 'tertiary-hub-menu-tab-content'];
let btnNames = ['primary-hub-menu-tab-btn', 'secondary-hub-menu-tab-btn', 'tertiary-hub-menu-tab-btn'];

document.addEventListener('DOMContentLoaded', () => {

    // Function to load content into a section
    function loadContent(sectionId) {
        // console.log(sectionId);
        const section = document.getElementById('content-display');
        // console.log(section);
        if (section && contentMap[sectionId]) {
            section.innerHTML = contentMap[sectionId];
        }
    }

    document.querySelectorAll('.primary-hub-menu-tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            toggleActiveTab(button, 'primary-hub-menu-tab-btn');
            togglePopout(button.value);
        });
    });

    function toggleActiveTab(button, className) {
        if(button.classList.contains('active-tab')){
            button.classList.remove('active-tab');
        }
        else{
            document.querySelectorAll(`.${className}`).forEach(btn => {
                btn.classList.remove('active-tab');
            });
            button.classList.add('active-tab');
            button.classList.remove('inactive-tab');
        }
    }

    function togglePopout(value){
        
    }

    function toggleDisplay(element) {
        // console.log("TOGGLE DISPLAY");
        // console.log(element);
        element.style.display = element.style.display === 'block' ? 'none' : 'block';
    }

    function displayContent(content) {
        const contentDisplay = document.getElementById('content-display');
        contentDisplay.innerHTML = content.innerHTML;
        contentDisplay.style.display = 'block';
        closeAllContent();
    }

    function closeAllContent() {
        for(let i = 0; i < tabNames.length; i++) {
            const allContents = document.querySelectorAll(`.${tabNames[i]}`);
            allContents.forEach(content => {
                content.style.display = 'none';
            });
        }
        for(let i = 0; i < btnNames.length; i++) {
            const allBtns = document.querySelectorAll(`.${btnNames[i]}`);
            allBtns.forEach(btn => {
                btn.classList.remove('active-tab');
                btn.classList.add('inactive-tab');
            });
        }
    }

    function alignContent(content, button) {
        const buttonRect = button.getBoundingClientRect();
        const parentRect = button.parentElement.getBoundingClientRect();
        content.style.top = `${buttonRect.top - parentRect.top -2}px`;
    }

    
});

function fillBackground(){
    
}
