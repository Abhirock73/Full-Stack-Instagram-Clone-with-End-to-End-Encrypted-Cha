import { openDB } from "idb";

const dbPromise = openDB("InstagramE2EE", 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains("keys")) {
            db.createObjectStore("keys");
        }
    },
});

export default dbPromise;