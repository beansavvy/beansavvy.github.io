const fs = require('fs');
const path = require('path');

const ROOT = process.argv[2] || '.';

const PROJECT_DIRECTORIES = [
    'games',
    'applications',
    'projects'
];

const projectFiles = [];

function findProjectFiles(directory) {
    const entries = fs.readdirSync(directory, {
        withFileTypes: true
    });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            findProjectFiles(fullPath);
        }

        if (
            entry.isFile() &&
            entry.name === 'project.json'
        ) {
            projectFiles.push(fullPath);
        }
    }
}

for (const directory of PROJECT_DIRECTORIES) {
    const fullPath = path.join(ROOT, directory);

    if (fs.existsSync(fullPath)) {
        findProjectFiles(fullPath);
    }
}

const projects = projectFiles
    .map(file => {
        return JSON.parse(
            fs.readFileSync(file, 'utf8')
        );
    })
    .filter(project => !project.hidden);

projects.sort((a, b) => {
    return new Date(b.lastUpdated) - new Date(a.lastUpdated);
});

fs.writeFileSync(
    path.join(ROOT, 'projects.json'),
    JSON.stringify(projects, null, 2) + '\n'
);

console.log(
    `Generated projects.json with ${projects.length} projects.`
);