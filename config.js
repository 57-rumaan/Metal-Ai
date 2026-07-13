/*==================================================
    OmniAI Configuration File
    Version : 1.0
    Edit Only This File
==================================================*/

// =========================
// API SETTINGS
// =========================

const CONFIG = {

    API_KEY: "",

    PROVIDER: "huggingface",

    BASE_URL: "https://router.huggingface.co/v1/chat/completions",

    STREAM: true

};


// =========================
// MODELS
// Edit only these values
// =========================

const MODELS = {

    CHAT: "Qwen/Qwen3-32B",

    VISION: "",

    IMAGE: "",

    VIDEO: "",

    SPEECH: "",

    TTS: ""

};


// =========================
// AI SETTINGS
// =========================

const AI = {

    temperature:0.7,

    top_p:0.95,

    max_tokens:4096,

    frequency_penalty:0,

    presence_penalty:0

};


// =========================
// APP SETTINGS
// =========================

const APP = {

    NAME:"OmniAI",

    VERSION:"1.0",

    SAVE_CHAT:true,

    DARK_MODE:true,

    AUTO_SCROLL:true,

    SHOW_TOKENS:false,

    STREAM_TEXT:true

};


// =========================
// FEATURE FLAGS
// =========================

const FEATURES = {

    CHAT:true,

    VISION:true,

    IMAGE:true,

    VIDEO:true,

    VOICE:true,

    TTS:true,

    FILE_UPLOAD:true,

    WEB_SEARCH:true,

    MEMORY:true,

    EXPORT_CHAT:true

};


// =========================
// DON'T EDIT BELOW
// =========================

Object.freeze(CONFIG);

Object.freeze(MODELS);

Object.freeze(AI);

Object.freeze(APP);

Object.freeze(FEATURES);

