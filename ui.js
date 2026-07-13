/*==================================================
    OmniAI UI Manager
==================================================*/

const UI = {

    chat: document.getElementById("messages"),

    input: document.getElementById("prompt"),

    send: document.getElementById("send"),

    loading: false,

    createBubble(role, text) {

        const bubble = document.createElement("div");

        bubble.className = "message " + role;

        bubble.innerHTML = text;

        this.chat.appendChild(bubble);

        this.scrollBottom();

        return bubble;

    },

    user(text) {

        return this.createBubble("user", text);

    },

    assistant(text) {

        return this.createBubble("assistant", text);

    },

    typing() {

        return this.createBubble(
            "assistant",
            "<div class='typing'>● ● ●</div>"
        );

    },

    removeTyping() {

        const typing = document.querySelector(".typing");

        if (typing) {

            typing.parentElement.remove();

        }

    },

    scrollBottom() {

        this.chat.scrollTop = this.chat.scrollHeight;

    },

    clearInput() {

        this.input.value = "";

    },

    disable() {

        this.loading = true;

        this.send.disabled = true;

        this.input.disabled = true;

    },

    enable() {

        this.loading = false;

        this.send.disabled = false;

        this.input.disabled = false;

    },

    notify(message) {

        console.log("[Notification]", message);

    }

};

window.UI = UI;

console.log("✅ UI Loaded");

