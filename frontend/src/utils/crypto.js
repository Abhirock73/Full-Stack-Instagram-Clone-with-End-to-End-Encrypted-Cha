// frontend/src/utils/crypto.js
import dbPromise from "./indexedDB";


export async function generateKeyPair() {
    return await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 4096,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    );
}

export async function exportPublicKey(publicKey) {
    const key = await crypto.subtle.exportKey("spki", publicKey);

    return btoa(
        String.fromCharCode(...new Uint8Array(key))
    );
}


export async function savePrivateKey(privateKey) {
    console.log("Saving private key...");

    const db = await dbPromise;

    await db.put("keys", privateKey, "privateKey");
    // await db.put("keys", "hello", "privateKey");

    console.log("Private key saved");
}

export async function getPrivateKey() {
    const db = await dbPromise;

    return await db.get(
        "keys",
        "privateKey"
    );
}

export async function importPublicKey(base64Key) {

    const binary = Uint8Array.from(
        atob(base64Key),
        c => c.charCodeAt(0)
    );

    return await crypto.subtle.importKey(
        "spki",
        binary.buffer,
        {
            name: "RSA-OAEP",
            hash: "SHA-256"
        },
        true,
        ["encrypt"]
    );

}

export async function encryptMessage(message, publicKey) {

    const encoder = new TextEncoder();

    const data = encoder.encode(message);

    const encrypted = await crypto.subtle.encrypt(
        {
            name: "RSA-OAEP"
        },
        publicKey,
        data
    );

    return btoa(
        String.fromCharCode(
            ...new Uint8Array(encrypted)
        )
    );
}

export async function decryptMessage(cipherText, privateKey) {

    const encryptedBytes = Uint8Array.from(
        atob(cipherText),
        c => c.charCodeAt(0)
    );

    const decryptedBuffer = await crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
        },
        privateKey,
        encryptedBytes
    );

    return new TextDecoder().decode(decryptedBuffer);
}


// --- HYBRID ENCRYPTION: AES FILE HANDLING ---

// 1. Generate a fast, one-time AES key for the image
export async function generateSymmetricKey() {
    return await window.crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
}

// 2. Export the AES key to a Base64 string so RSA can encrypt it
export async function exportSymmetricKey(key) {
    const exported = await window.crypto.subtle.exportKey("raw", key);
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
}

// 3. Import the Base64 string back into an AES key
export async function importSymmetricKey(base64Key) {
    const keyBuffer = Uint8Array.from(atob(base64Key), c => c.charCodeAt(0));
    return await window.crypto.subtle.importKey(
        "raw",
        keyBuffer,
        { name: "AES-GCM" },
        true,
        ["encrypt", "decrypt"]
    );
}

export async function encryptFile(fileBuffer, aesKey) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedContent = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        aesKey,
        fileBuffer
    );
    
    // SAFE CONVERSION: Works for images of any size
    const uint8Array = new Uint8Array(encryptedContent);
    let binary = "";
    for (let i = 0; i < uint8Array.byteLength; i++) {
        binary += String.fromCharCode(uint8Array[i]);
    }
    const encryptedFileBase64 = btoa(binary);

    // IV conversion is safe to use spread here because IV is always 12 bytes
    const ivBase64 = btoa(String.fromCharCode(...iv));

    return {
        encryptedFileBase64,
        ivBase64
    };
}

// 5. Decrypt the image file back to an ArrayBuffer
export async function decryptFile(encryptedBase64, ivBase64, aesKey) {
    const encryptedBytes = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
    const ivBytes = Uint8Array.from(atob(ivBase64), c => c.charCodeAt(0));

    return await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: ivBytes },
        aesKey,
        encryptedBytes
    );
}