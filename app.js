// --- CONFIGURATION ---
const API_KEY = '1215995692-onui8b2svri74b2omn0960lf70mlqbkb.apps.googleusercontent.com'; // Replace with your actual key

// --- CHAT LOGIC ---
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');
const chatWindow = document.getElementById('chat-window');

// Function to add a message to the UI
function addMessageToUI(text, isUser) {
    const row = document.createElement('div');
    row.className = 'message-row';
    
    const msg = document.createElement('div');
    msg.className = `message ${isUser ? 'user' : 'ai'}`;
    msg.textContent = text;
    
    row.appendChild(msg);
    chatMessages.appendChild(row);
    
    // Auto-scroll to the bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Event Listener for the input box
userInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter' && userInput.value.trim()) {
        const text = userInput.value;
        addMessageToUI(text, true); // Add user message
        userInput.value = '';
        
        // Add "Thinking..." or call your Gemini function here
        // const aiReply = await getGeminiResponse(text); 
        // addMessageToUI(aiReply, false); 
    }
});