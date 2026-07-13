
/*==================================================
    OmniAI Storage Manager
==================================================*/

const Storage = {

    KEY: "omniai_chats",

    chats: [],

    load() {

        try {

            const data = localStorage.getItem(this.KEY);

            if (data) {

                this.chats = JSON.parse(data);

            } else {

                this.chats = [];

            }

        } catch (e) {

            console.error(e);

            this.chats = [];

        }

    },

    save() {

        localStorage.setItem(

            this.KEY,

            JSON.stringify(this.chats)

        );

    },

    add(message) {

        this.chats.push(message);

        this.save();

    },

    getAll() {

        return this.chats;

    },

    clear() {

        this.chats = [];

        this.save();

    },

    remove(index) {

        this.chats.splice(index,1);

        this.save();

    }

};

Storage.load();

window.Storage = Storage;

console.log("✅ Storage Ready");
