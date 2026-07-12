/*==================================================
    OmniAI API Engine
    Version 1.0
==================================================*/

class OmniAPI {

    constructor() {

        this.controller = null;

        this.baseURL = CONFIG.BASE_URL;

        this.apiKey = CONFIG.API_KEY;

        this.model = MODELS.CHAT;

    }

    //==============================
    // Change Model
    //==============================

    setModel(model){

        this.model = model;

    }

    //==============================
    // Stop Generation
    //==============================

    stop(){

        if(this.controller){

            this.controller.abort();

        }

    }

    //==============================
    // Send Chat
    //==============================

    async chat(messages){

        this.controller = new AbortController();

        try{

            const response = await fetch(this.baseURL,{

                method:"POST",

                signal:this.controller.signal,

                headers:{

                    "Authorization":"Bearer "+this.apiKey,

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    model:this.model,

                    messages:messages,

                    temperature:AI.temperature,

                    max_tokens:AI.max_tokens,

                    top_p:AI.top_p,

                    stream:false

                })

            });

            if(!response.ok){

                throw new Error(

                    "API Error : "+response.status

                );

            }

            const data = await response.json();

            return data;

        }

        catch(error){

            console.error(error);

            throw error;

        }

    }

}

const API = new OmniAPI();
/*==================================================
    Streaming + Retry + Timeout
==================================================*/

OmniAPI.prototype.chatStream = async function(messages, onChunk){

    this.controller = new AbortController();

    const timeout = setTimeout(() => {
        this.controller.abort();
    }, 60000);

    try{

        const response = await fetch(this.baseURL,{
            method:"POST",
            signal:this.controller.signal,

            headers:{
                "Authorization":"Bearer " + this.apiKey,
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                model:this.model,
                messages:messages,
                temperature:AI.temperature,
                top_p:AI.top_p,
                max_tokens:AI.max_tokens,
                stream:true
            })

        });

        if(!response.ok){

            throw new Error("API Error " + response.status);

        }

        const reader = response.body.getReader();

        const decoder = new TextDecoder();

        while(true){

            const {done,value} = await reader.read();

            if(done) break;

            const chunk = decoder.decode(value);

            if(onChunk){

                onChunk(chunk);

            }

        }

        clearTimeout(timeout);

    }

    catch(error){

        clearTimeout(timeout);

        throw error;

    }

};


// Retry Request

OmniAPI.prototype.retry = async function(messages,retries=3){

    for(let i=0;i<retries;i++){

        try{

            return await this.chat(messages);

        }

        catch(e){

            if(i===retries-1){

                throw e;

            }

        }

    }

};


// Check API

OmniAPI.prototype.testConnection = async function(){

    try{

        const res = await this.chat([
            {
                role:"user",
                content:"Hello"
            }
        ]);

        return true;

    }

    catch{

        return false;

    }

};
/*==================================================
    OmniAI API Utilities
==================================================*/

// Get current model
OmniAPI.prototype.getModel = function () {
    return this.model;
};

// Get provider
OmniAPI.prototype.getProvider = function () {
    return CONFIG.PROVIDER;
};

// Update API Key
OmniAPI.prototype.setApiKey = function (key) {
    this.apiKey = key;
};

// Change Base URL
OmniAPI.prototype.setBaseURL = function (url) {
    this.baseURL = url;
};

// Ping API
OmniAPI.prototype.ping = async function () {

    try {

        const ok = await this.testConnection();

        return {
            success: ok,
            provider: CONFIG.PROVIDER,
            model: this.model
        };

    } catch (e) {

        return {
            success: false,
            error: e.message
        };

    }

};


// Generate unique chat id
function generateChatID() {

    return "chat_" +
        Date.now() +
        "_" +
        Math.random().toString(36).substring(2,8);

}


// Timestamp

function currentTime(){

    return new Date().toLocaleTimeString();

}


// Sleep helper

function sleep(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}


// Global API

window.API = API;
window.generateChatID = generateChatID;
window.currentTime = currentTime;
window.sleep = sleep;

console.log("✅ OmniAI API Loaded");

