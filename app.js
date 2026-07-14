const GITHUB_TOKEN = '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';
const OWNER = 'Codeblub';
const REPO = 'Blub-AI';
const FILE_PATH = 'user_data.json';

// Fetch data from GitHub
async function getGitHubData() {
    const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
        headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
    });
    const data = await response.json();
    return JSON.parse(atob(data.content)); // Decode base64
}

// Update data on GitHub
async function updateGitHubData(newData) {
    const file = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
        headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
    });
    const fileData = await file.json();

    await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
        method: 'PUT',
        headers: { 
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            message: "Update Blub-AI memory",
            content: btoa(JSON.stringify(newData, null, 2)), // Encode base64
            sha: fileData.sha // Required to overwrite
        })
    });
}