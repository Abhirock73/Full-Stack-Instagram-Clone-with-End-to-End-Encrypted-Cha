// frontend/src/services/initializeKeys.js

import axios from "axios";
import {
    generateKeyPair,
    exportPublicKey,
    getPrivateKey,
    savePrivateKey,
} from "../utils/crypto";

export async function initializeKeys() {
    try {
        console.log("Initializing keys...");

        const privateKey = await getPrivateKey();

        if (privateKey) {
            console.log("Private key already exists.");
            return;
        }

        console.log("Generating key pair...");

        const keyPair = await generateKeyPair();

        const publicKey = await exportPublicKey(keyPair.publicKey);

        await savePrivateKey(keyPair.privateKey);

        console.log("Private key stored in IndexedDB.");

        await axios.post(
            "http://localhost:4000/api/v1/user/public-key",
            { publicKey },
            { withCredentials: true }
        );

        console.log("Public key uploaded.");
    } catch (err) {
        console.error("initializeKeys failed:", err);
        throw err;
    }
}

export default initializeKeys;