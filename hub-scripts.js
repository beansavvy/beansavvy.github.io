let tabNames = ['primary-hub-menu-tab-content', 'secondary-hub-menu-tab-content', 'tertiary-hub-menu-tab-content'];
let btnNames = ['primary-hub-menu-tab-btn', 'secondary-hub-menu-tab-btn', 'tertiary-hub-menu-tab-btn'];

const backgroundCanvas = document.getElementById('background-canvas');
const bgCtx = backgroundCanvas.getContext('2d');

const popoutContent = {
    games: `
    <h1 class="table-header">Games</h1>
    <table class="popout-content-table">
        <colgroup>
            <col style="width: 4%">
            <col style="width: 32%">
            <col style="width: 32%">
            <col style="width: 32%">
        </colgroup>
        <thead>
            <tr>
                <th class="b-btm"></th>
                <th class="b-right b-btm">Application</th>
                <th class="b-right b-btm">GitHub Repo</th>
                <th class="b-btm">Status</th>
            </tr>
        </thead>
    
        <tbody>
            <tr class="application-row">
                <td class="expand-indicator">+</td>
                <td>
                    <a href="/text-game/">Text RPG</a>
                </td>
                <td>
                    <a href="https://github.com/beansavvy/text-rpg-game" target="_blank">
                        Repository
                    </a>
                </td>
                <td>In Development</td>
            </tr>
    
            <tr class="application-details">
                <td colspan="4">
                    <div class="application-details-content">
                        <p>
                            <strong>Description:</strong>
                            A text-based RPG built using Next.js. Every time a new
                            update is pushed to the Text RPG repo, a GitHub Action
                            compiles the Next.js code into a static page and pushes
                            it to the GitHub Pages repo.
                        </p>
    
                        <p>
                            <strong>Concepts:</strong>
                            Next.js, React, TypeScript, Context API, GitHub Actions
                        </p>
    
                        <p>
                            <strong>Last Updated:</strong>
                            August 2026
                        </p>
                    </div>
                </td>
            </tr>
    
            <tr class="application-row">
                <td class="expand-indicator b-top">+</td>
                <td class="b-top">
                    <a href="/tic-tac-toe/">TicTacToe</a>
                </td>
                <td class="b-top">
                    <a href="YOUR_REPO_URL" target="_blank">
                        Repository
                    </a>
                </td>
                <td class="b-top">Complete</td>
            </tr>
    
            <tr class="application-details">
                <td colspan="4">
                    <div class="application-details-content">
                        <p>
                            <strong>Description:</strong>
                            Simple TicTacToe game that contains three difficulties
                            and stores wins and losses.
                        </p>
    
                        <p>
                            <strong>Concepts:</strong>
                            JavaScript, DOM manipulation, Minimax, Alpha-Beta Pruning
                        </p>
    
                        <p>
                            <strong>Last Updated:</strong>
                            August 2026
                        </p>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    `,

    forms: `
        <h2>Web Forms</h2>
        <p>Form projects go here.</p>
    `,

    popups: `
        <h2>Popups</h2>
        <p>Popup examples go here.</p>
    `,

    specialEffects: `
        <h2>Special Effects</h2>
        <p>Special effect projects go here.</p>
    `
};




document.addEventListener('DOMContentLoaded', () => {

    // createBackground();

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
            toggleActiveTabPopout(button.value)
        }
        else{
            document.querySelectorAll(`.${className}`).forEach(btn => {
                btn.classList.remove('active-tab');
            });
            button.classList.add('active-tab');
            button.classList.remove('inactive-tab');
            toggleActiveTabPopout(button.value)
        }
    }

    function toggleActiveTabPopout(value){
        const popoutDisplay = document.getElementById('display-popout-container');
        if(popoutDisplay.classList.contains('popout-open')){
            popoutDisplay.classList.remove('popout-open');
            
            await.delay(500);
            popoutDisplay.innerHTML = '';
        }
        else{
            popoutDisplay.classList.add('popout-open');
            popoutDisplay.innerHTML = popoutContent[value];
            attachTableListeners();
        }
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

function attachTableListeners(){
    const popoutTable = document.querySelector('.popout-content-table');

    popoutTable.addEventListener('click', event => {
        if (event.target.closest('a')) return;

        const row = event.target.closest('.application-row');

        if (!row) return;

        const detailsRow = row.nextElementSibling;

        if (detailsRow?.classList.contains('application-details')) {
            // detailsRow.classList.toggle('open');
            const isOpen = detailsRow.classList.toggle('open');

            const indicator = row.querySelector('.expand-indicator');

            if (indicator) {
                indicator.innerHTML = isOpen ? '\-' : '+';
            }
        }

        
    });
}
