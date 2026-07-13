/*==================================================
    OmniAI Model Manager
==================================================*/

const ModelManager = {

    providers: {

        huggingface: {

            name: "Hugging Face",

            endpoint: "https://router.huggingface.co/v1/chat/completions",

            apiKey: CONFIG.API_KEY,

            models: [

                MODELS.CHAT

            ]

        }

    },

    currentProvider: "huggingface",

    currentModel: MODELS.CHAT,

    getProvider() {

        return this.providers[this.currentProvider];

    },

    getModel() {

        return this.currentModel;

    },

    setModel(modelId) {

        this.currentModel = modelId;

        Settings.save();

    },

    addModel(modelId) {

        this.providers.huggingface.models.push(modelId);

    },

    listModels() {

        return this.providers.huggingface.models;

    }

};

window.ModelManager = ModelManager;

console.log("✅ Model Manager Loaded");

