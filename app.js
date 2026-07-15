// --- 1. CONFIGURATION ---
// IMPORTANT: If you are using Codespaces, you can use process.env here. 
// Otherwise, replace 'YOUR_API_KEY' with your actual Gemini API key.
const API_KEY = 'AQ.Ab8RN6KvrfDqdeHPrfIOsNr37Mh_eaWW_yLZdYo21tuYQM1pFw'; 

// --- 2. ELEMENTS ---
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');
const chatWindow = document.getElementById('chat-window');

// --- 3. GOOGLE LOGIN CALLBACK ---
function handleCredentialResponse(response) {
    // 1. Decode your token (existing code)
    const base64Url = response.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const userProfile = JSON.parse(decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')));
    
    console.log("Welcome, " + userProfile.name);

    // 2. NEW: Hide the login button (change 'g_id_onload' to the ID of your login element)
    const loginElement = document.querySelector('.g_id_signin'); 
    if (loginElement) {
        loginElement.classList.add('hidden');
    }
    
    // 3. NEW: Show your chat interface
    const chatContainer = document.querySelector('#chat-container'); // Ensure your chat is in a div with this ID
    if (chatContainer) {
        chatContainer.classList.remove('hidden');
    }
}

// --- 4. CHAT LOGIC ---
function addMessageToUI(text, isUser) {
    const row = document.createElement('div');
    row.className = 'message-row';
    
    const msg = document.createElement('div');
    msg.className = `message ${isUser ? 'user' : 'ai'}`;
    msg.textContent = text;
    
    row.appendChild(msg);
    chatMessages.appendChild(row);
    
    // Auto-scroll
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function getGeminiResponse(userText) {
    const API_KEY = 'AQ.Ab8RN6KvrfDqdeHPrfIOsNr37Mh_eaWW_yLZdYo21tuYQM1pFw'; 
    // Change 'gemini-1.5-flash' to 'gemini-1.5-flash-latest' 
    // or just 'gemini-1.5-flash' depending on your specific project availability.
    // Sometimes using the base model works better:
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userText }] }]
            })
        });

        const data = await response.json();
        
        // If the model name is the issue, try 'gemini-1.5-pro' 
        // or check your Google AI Studio dashboard for the exact model name available.
        if (data.error) {
            console.error("Gemini API Error:", data.error.message);
            return "Error: " + data.error.message;
        }

        return data.candidates[0].content.parts[0].text;
    } catch (err) {
        return "Sorry, I couldn't reach the AI.";
    }
}

// --- 5. EVENT LISTENER ---
userInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter' && userInput.value.trim()) {
        const text = userInput.value;
        addMessageToUI(text, true); // Add your message
        userInput.value = '';
        
        const aiReply = await getGeminiResponse(text);
        addMessageToUI(aiReply, false); // Add AI message
    }
});







