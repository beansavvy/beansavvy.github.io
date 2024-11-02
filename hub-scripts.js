let tabNames = ['primary-hub-menu-tab-content', 'secondary-hub-menu-tab-content', 'tertiary-hub-menu-tab-content'];
let btnNames = ['primary-hub-menu-tab-btn', 'secondary-hub-menu-tab-btn', 'tertiary-hub-menu-tab-btn'];

document.addEventListener('DOMContentLoaded', () => {
    // Define content for each final-tab section
    const contentMap = {
        'transmute-ah-calculator': `
            <div id="transmute-input-section">
                <label for="transmute-input">AH Exported String:</label>
                <input type="text" id="exported-ah-input" placeholder="Enter Exported AH String">
                <button id="calculate-btn">Calculate</button>
            </div>
            <div id="transmute-output-section">
                <table id="transmute-output-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Calculation results will be inserted here -->
                    </tbody>
                </table>
            </div>
        `,
        // Add more content for other sections if needed
    };

    // Function to load content into a section
    function loadContent(sectionId) {
        // console.log(sectionId);
        const section = document.getElementById('content-display');
        // console.log(section);
        if (section && contentMap[sectionId]) {
            section.innerHTML = contentMap[sectionId];
            attachEventListeners(sectionId);
        }
    }

    // Function to attach event listeners
    function attachEventListeners(sectionId) {
        if (sectionId === 'transmute-ah-calculator') {
            const calculateBtn = document.getElementById('calculate-btn');
            if (calculateBtn) {
                calculateBtn.addEventListener('click', calculateAHValues);
            }
        }
        // Add more event listeners for other sections if needed
    }

    document.querySelectorAll('.primary-hub-menu-tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            setActiveTab(button, 'primary-hub-menu-tab-btn');
            closeLowerLevelContent(button, 'primary-hub-menu-tab-content');
            const tabContent = button.nextElementSibling;
            if (tabContent && tabContent.classList.contains('primary-hub-menu-tab-content')) {
                alignContent(tabContent, button);
                toggleDisplay(tabContent);
            } else if (tabContent && button.className.includes('final-btn')) {
                displayContent(tabContent);
            }
        });
    });

    document.querySelectorAll('.secondary-hub-menu-tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            setActiveTab(button, 'secondary-hub-menu-tab-btn');
            closeLowerLevelContent(button, 'secondary-hub-menu-tab-content');
            const secondaryTabContent = button.nextElementSibling;
            if (secondaryTabContent && button.className.includes('final-btn')) {
                const sectionId = button.getAttribute('value');
                loadContent(sectionId);
                // displayContent(secondaryTabContent);
            }
        });
        button.addEventListener('mouseover', () => {
            setActiveTab(button, 'secondary-hub-menu-tab-btn');
            closeLowerLevelContent(button, 'secondary-hub-menu-tab-content');
            const secondaryTabContent = button.nextElementSibling;
            if (secondaryTabContent && secondaryTabContent.classList.contains('secondary-hub-menu-tab-content') && !button.className.includes('final-btn')) {
                alignContent(secondaryTabContent, button);
                secondaryTabContent.style.display = 'block';
            }
        });
    });

    document.querySelectorAll('.tertiary-hub-menu-tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            setActiveTab(button, 'tertiary-hub-menu-tab-btn');
            closeLowerLevelContent(button, 'tertiary-hub-menu-tab-content');
            // console.log(button);
            // const tertiaryTabContent = button.nextElementSibling;
            if (button.className.includes('final-btn')) {
                const sectionId = button.getAttribute('value');
                // console.log(sectionId);
                loadContent(sectionId);
                // displayContent(tertiaryTabContent);
            }
        });
        button.addEventListener('mouseover', () => {
            setActiveTab(button, 'tertiary-hub-menu-tab-btn');
            closeLowerLevelContent(button, 'tertiary-hub-menu-tab-content');
            const tertiaryTabContent = button.nextElementSibling;
            if (tertiaryTabContent && tertiaryTabContent.classList.contains('tertiary-hub-menu-tab-content') && !button.className.includes('final-btn')) {
                alignContent(tertiaryTabContent, button);
                tertiaryTabContent.style.display = 'block';
            }
        });
    });

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

    function closeLowerLevelContent(button, className) {
        let tabLevel = tabNames.indexOf(className);
        let btnLevel = tabLevel + 1;
        tabLevel = Math.min(tabLevel, tabNames.length - 1);
        
        for (let i = tabLevel; i < tabNames.length; i++) {
            const allContents = document.querySelectorAll(`.${tabNames[i]}`);
            
            allContents.forEach(content => {
                if (content !== button.nextElementSibling) {
                    content.style.display = 'none';
                    
                }
            });
        }
        if(btnLevel < btnNames.length) {
            for(let i = btnLevel; i < btnNames.length; i++) {
                const allBtns = document.querySelectorAll(`.${btnNames[i]}`);
                allBtns.forEach(btn => {
                    btn.classList.remove('active-tab');
                    btn.classList.add('inactive-tab');
                });
            }
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

    function alignContent(content, button) {
        const buttonRect = button.getBoundingClientRect();
        const parentRect = button.parentElement.getBoundingClientRect();
        content.style.top = `${buttonRect.top - parentRect.top -2}px`;
    }

    function setActiveTab(button, className) {
        document.querySelectorAll(`.${className}`).forEach(btn => {
            btn.classList.remove('active-tab');
        });
        button.classList.add('active-tab');
        button.classList.remove('inactive-tab');
    }

    function calculateAHValues() {
        console.log("CALCULATE AH VALUES");
        const input = document.getElementById('exported-ah-input').value;

        // Print ASCII code of each character in the input
        for (let i = 0; i < input.length; i++) {
            console.log(`Character: ${input[i]}, ASCII: ${input.charCodeAt(i)}`);
        }

        // Function to split input by spaces outside of quotes
        function splitInput(input) {
            let result = [];
            let current = '';
            let inQuotes = false;

            for (let i = 0; i < input.length; i++) {
                const char = input[i];

                if (char === '"') {
                    inQuotes = !inQuotes; // Toggle inQuotes state
                }

                if (char === ' ' && !inQuotes) {
                    if (current) {
                        result.push(current);
                        current = '';
                    }
                } else {
                    current += char;
                }
            }

            if (current) {
                result.push(current);
            }

            return result;
        }

        const rows = splitInput(input);
        let tableContent = '<table><tbody><tr><th>Name</th><th>Value</th></tr>'; // Initialize a string to build the table rows

        let rowOne = true;
        rows.forEach(row => {
            if(rowOne) {
                rowOne = false;
                ;
            }
            else{
            const columns = row.split(',');
            if (columns.length >= 2) {
                const value = parseFloat(columns[0].replace(/"/g, '')) / 10000;
                const name = columns[1].replace(/"/g, '');
                tableContent += `<tr><td>${name}</td><td>${value.toFixed(4)}</td></tr>`;
                }
            }
        });
    
        tableContent += '</tbody></table>';
        
        document.getElementById('transmute-output-section').innerHTML = tableContent;
        
        console.log(tableContent);
    }
});


