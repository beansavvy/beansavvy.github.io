let tabNames = ['primary-hub-menu-tab-content', 'secondary-hub-menu-tab-content', 'tertiary-hub-menu-tab-content'];
let btnNames = ['primary-hub-menu-tab-btn', 'secondary-hub-menu-tab-btn', 'tertiary-hub-menu-tab-btn'];

// const popoutContent = {
//     games: `
//     <h1 class="table-header">Games</h1>
//     <table class="popout-content-table">
//         <colgroup>
//             <col style="width: 4%">
//             <col style="width: 32%">
//             <col style="width: 32%">
//             <col style="width: 32%">
//         </colgroup>
//         <thead>
//             <tr>
//                 <th class="b-btm"></th>
//                 <th class="b-right b-btm">Application</th>
//                 <th class="b-right b-btm">GitHub Repo</th>
//                 <th class="b-btm">Status</th>
//             </tr>
//         </thead>
    
//         <tbody>
//             <tr class="application-row">
//                 <td class="expand-indicator">+</td>
//                 <td>
//                     <a href="/text-game/">Text RPG</a>
//                 </td>
//                 <td>
//                     <a href="https://github.com/beansavvy/text-rpg-game" target="_blank">
//                         Repository
//                     </a>
//                 </td>
//                 <td>In Development</td>
//             </tr>
    
//             <tr class="application-details">
//                 <td colspan="4">
//                     <div class="application-details-content">
//                         <p>
//                             <strong>Description:</strong>
//                             A text-based RPG built using Next.js. Every time a new
//                             update is pushed to the Text RPG repo, a GitHub Action
//                             compiles the Next.js code into a static page and pushes
//                             it to the GitHub Pages repo.
//                         </p>
    
//                         <p>
//                             <strong>Concepts:</strong>
//                             Next.js, React, TypeScript, Context API, GitHub Actions
//                         </p>
    
//                         <p>
//                             <strong>Last Updated:</strong>
//                             August 2026
//                         </p>
//                     </div>
//                 </td>
//             </tr>
    
//             <tr class="application-row">
//                 <td class="expand-indicator b-top">+</td>
//                 <td class="b-top">
//                     <a href="/tic-tac-toe/">TicTacToe</a>
//                 </td>
//                 <td class="b-top">
//                     <a href="YOUR_REPO_URL" target="_blank">
//                         Repository
//                     </a>
//                 </td>
//                 <td class="b-top">Complete</td>
//             </tr>
    
//             <tr class="application-details">
//                 <td colspan="4">
//                     <div class="application-details-content">
//                         <p>
//                             <strong>Description:</strong>
//                             Simple TicTacToe game that contains three difficulties
//                             and stores wins and losses.
//                         </p>
    
//                         <p>
//                             <strong>Concepts:</strong>
//                             JavaScript, DOM manipulation, Minimax, Alpha-Beta Pruning
//                         </p>
    
//                         <p>
//                             <strong>Last Updated:</strong>
//                             August 2026
//                         </p>
//                     </div>
//                 </td>
//             </tr>
//         </tbody>
//     </table>
//     `,

//     forms: `
//         <h2>Web Forms</h2>
//         <p>Form projects go here.</p>
//     `,

//     popups: `
//         <h2>Popups</h2>
//         <p>Popup examples go here.</p>
//     `,

//     specialEffects: `
//         <h2>Special Effects</h2>
//         <p>Special effect projects go here.</p>
//     `
// };

let projects = [];

async function loadProjects() {
    const response = await fetch('./projects.json');

    if (!response.ok) {
        throw new Error(
            `Unable to load project data. Status: ${response.status}`
        );
    }

    projects = await response.json();
}

function getProjectsByType(type) {
    return projects.filter(project => project.type === type);
}

function createProjectTable(type, title) {
    const matchingProjects = getProjectsByType(type);

    if (matchingProjects.length === 0) {
        return `
            <h1 class="table-header">${title}</h1>

            <div class="empty-project-list">
                <p>No projects are currently available.</p>
            </div>
        `;
    }

    const rows = matchingProjects
        .map(createProjectRow)
        .join('');

    return `
        <h1 class="table-header">${title}</h1>

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
                ${rows}
            </tbody>
        </table>
    `;
}

function createProjectRow(project, index) {
    const borderClass = index > 0 ? 'b-top' : '';

    const concepts = Array.isArray(project.concepts)
        ? project.concepts.join(', ')
        : '';

    return `
        <tr
            class="application-row"
            data-project-id="${escapeHTML(project.id)}"
        >
            <td class="expand-indicator ${borderClass}">
                +
            </td>

            <td class="${borderClass}">
                <a href="${escapeHTML(project.application)}">
                    ${escapeHTML(project.name)}
                </a>
            </td>

            <td class="${borderClass}">
                <a
                    href="${escapeHTML(project.repository)}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Repository
                </a>
            </td>

            <td class="${borderClass}">
                ${escapeHTML(project.status)}
            </td>
        </tr>

        <tr
            class="application-details"
            data-project-details="${escapeHTML(project.id)}"
        >
            <td colspan="4">
                <div class="application-details-content">
                    <p>
                        <strong>Description:</strong>
                        ${escapeHTML(project.description)}
                    </p>

                    <p>
                        <strong>Concepts:</strong>
                        ${escapeHTML(concepts)}
                    </p>

                    <p>
                        <strong>Last Updated:</strong>
                        ${formatProjectDate(project.lastUpdated)}
                    </p>
                </div>
            </td>
        </tr>
    `;
}

function formatProjectDate(dateString) {
    if (!dateString) {
        return 'Unknown';
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return 'Unknown';
    }

    return date.toLocaleDateString(
        'en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    );
}

function escapeHTML(value) {
    if (value === null || value === undefined) {
        return '';
    }

    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function getPopoutContent(section) {
    switch (section) {
        case 'games':
            return createProjectTable(
                'game',
                'Games'
            );

        case 'forms':
            return createProjectTable(
                'form',
                'Web Forms'
            );

        case 'popups':
            return createProjectTable(
                'popup',
                'Popups'
            );

        case 'specialEffects':
            return createProjectTable(
                'specialEffect',
                'Special Effects'
            );

        default:
            return `
                <div class="empty-project-list">
                    <p>Unable to load this section.</p>
                </div>
            `;
    }
}

document.addEventListener('DOMContentLoaded', () => {

    try {
        await loadProjects();
    }
    catch (error) {
        console.error(
            'Failed to load projects:',
            error
        );
    }

    document.querySelectorAll('.primary-hub-menu-tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            toggleActiveTab(button, 'primary-hub-menu-tab-btn');
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
            
            setTimeout(() => {
                popoutDisplay.innerHTML = '';
            }, 500);
            
        }
        else{
            popoutDisplay.classList.add('popout-open');
            popoutDisplay.innerHTML = popoutContent[value];
            attachTableListeners();
        }
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
