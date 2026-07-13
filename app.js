/*==================================================
    OmniAI Application
    Version 1.0
==================================================*/

const messages = document.getElementById("messages");
const prompt = document.getElementById("prompt");
const send = document.getElementById("send");
const newChat = document.getElementById("newChat");

let chatHistory = [];

//==============================
// Scroll
//==============================

function scrollBottom(){

    messages.scrollTop = messages.scrollHeight;

}

//==============================
// Add Message
//==============================

function addMessage(role,text){

    const box = document.createElement("div");

    box.className = role;

    box.innerHTML = marked.parse(text);

    messages.appendChild(box);

    scrollBottom();

    return box;

}

//==============================
// Send
//==============================

async function sendMessage(){

    const text = prompt.value.trim();

    if(text==="") return;

    addMessage("user",text);

    chatHistory.push({

        role:"user",

        content:text

    });

    prompt.value="";

    const aiBox = addMessage(

        "assistant",

        "⏳ Thinking..."

    );

    try{

        const response = await API.chat(chatHistory);

        const answer =
        response.choices[0].message.content;

        aiBox.innerHTML = marked.parse(answer);

        chatHistory.push({

            role:"assistant",

            content:answer

        });

    }

    catch(error){

        aiBox.innerHTML =
        "❌ " + error.message;

    }

}

//==============================
// Events
//==============================

send.addEventListener(

"click",

sendMessage

);

prompt.addEventListener(

"keydown",

function(e){

if(e.key==="Enter" && !e.shiftKey){

e.preventDefault();

sendMessage();

}

}

);

//==============================
// New Chat
//==============================

newChat.onclick=()=>{

messages.innerHTML="";

chatHistory=[];

addMessage(

"assistant",

"# Welcome 👋\n\nHow can I help you today?"

);

};

//==============================

window.onload=()=>{
    Settings.load();
Storage.load();

document.getElementById("loading").style.display="none";

scrollBottom();

};
/*==================================================
    OmniAI Application
    Part 2
==================================================*/

// Save Chat
function saveChats() {
    localStorage.setItem(
        "omni_chat_history",
        JSON.stringify(chatHistory)
    );
}

// Load Chat
function loadChats() {

    const saved = localStorage.getItem("omni_chat_history");

    if (!saved) return;

    chatHistory = JSON.parse(saved);

    messages.innerHTML = "";

    chatHistory.forEach(msg => {

        addMessage(msg.role, msg.content);

    });

}

// Copy Message
function copyMessage(text){

    navigator.clipboard.writeText(text);

}

// Typing Animation

function showTyping(){

    return addMessage(
        "assistant",
        "● ● ●"
    );

}

// Auto Save

setInterval(()=>{

    saveChats();

},3000);


// Restore

window.addEventListener("load",()=>{

    loadChats();

});

// Sidebar Mobile

const sidebar=document.getElementById("sidebar");

const menu=document.querySelector(".logo");

if(menu){

menu.onclick=()=>{

sidebar.classList.toggle("show");

};

}


// Escape HTML

function escapeHTML(text){

return text
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;");

}


// Clear Chat

function clearChat(){

chatHistory=[];

messages.innerHTML="";

saveChats();

}


// Export Chat

function exportChat(){

const blob=new Blob(

[JSON.stringify(chatHistory,null,2)],

{type:"application/json"}

);

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="chat.json";

a.click();

}


// Character Counter

prompt.addEventListener("input",()=>{

const len=prompt.value.length;

console.log("Characters:",len);

});

console.log("✅ OmniAI App Loaded");
/*==================================================
    OmniAI Application
    Part 3
==================================================*/

// ==============================
// Regenerate Last Response
// ==============================

async function regenerateLast() {

    if (chatHistory.length < 2) return;

    while (
        chatHistory.length &&
        chatHistory[chatHistory.length - 1].role === "assistant"
    ) {
        chatHistory.pop();
    }

    messages.removeChild(messages.lastElementChild);

    try {

        const loading = showTyping();

        const response = await API.chat(chatHistory);

        const answer = response.choices[0].message.content;

        loading.innerHTML = marked.parse(answer);

        chatHistory.push({
            role: "assistant",
            content: answer
        });

        saveChats();

    } catch (err) {

        addMessage("assistant", "❌ " + err.message);

    }

}

// ==============================
// Stop Generation
// ==============================

function stopGeneration() {

    API.stop();

}

// ==============================
// Copy All Chat
// ==============================

function copyConversation() {

    const text = chatHistory
        .map(m => `${m.role.toUpperCase()}\n${m.content}`)
        .join("\n\n");

    navigator.clipboard.writeText(text);

}

// ==============================
// Chat Title
// ==============================

function generateTitle() {

    if(chatHistory.length===0)
        return "New Chat";

    return chatHistory[0].content
        .substring(0,30);

}

// ==============================
// Theme
// ==============================

function toggleTheme(){

    document.body.classList.toggle("light");

}

// ==============================
// Token Estimate
// ==============================

function estimateTokens(text){

    return Math.ceil(text.length/4);

}

// ==============================
// Auto Resize
// ==============================

prompt.addEventListener("input",()=>{

    prompt.style.height="50px";

    prompt.style.height=
    prompt.scrollHeight+"px";

});

// ==============================
// Keyboard Shortcut
// Ctrl + Enter
// ==============================

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key==="Enter"){

        sendMessage();

    }

});

// ==============================

console.log("✅ App Part 3 Loaded");
/*==================================================
    OmniAI Application
    Part 4 - UI Controls
==================================================*/

// ==============================
// Notification
// ==============================

function notify(message, type = "info") {

    const toast = document.createElement("div");

    toast.className = "toast " + type;

    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2500);

}


// ==============================
// Copy Button
// ==============================

document.addEventListener("click", function(e){

    if(!e.target.classList.contains("copy-btn")) return;

    navigator.clipboard.writeText(

        e.target.dataset.text

    );

    notify("Copied");

});


// ==============================
// Loading
// ==============================

function setLoading(state){

    send.disabled = state;

    prompt.disabled = state;

}


// ==============================
// Online Status
// ==============================

window.addEventListener("online",()=>{

    notify("Internet Connected","success");

});

window.addEventListener("offline",()=>{

    notify("No Internet","error");

});


// ==============================
// Settings
// ==============================

function openSettings(){

    console.log("Settings");

}

function closeSettings(){

    console.log("Close Settings");

}


// ==============================
// Search Chats
// ==============================

function searchChats(query){

    return chatHistory.filter(m=>

        m.content

        .toLowerCase()

        .includes(

            query.toLowerCase()

        )

    );

}


// ==============================
// About
// ==============================

console.log(APP.NAME);

console.log(APP.VERSION);

console.log("Ready.");

