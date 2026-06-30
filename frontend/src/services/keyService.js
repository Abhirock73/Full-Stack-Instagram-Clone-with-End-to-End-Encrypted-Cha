import axios from "axios";

export async function fetchPublicKey(userId) {

    const res = await axios.get(
        `https://full-stack-instagram-clone-with-end-to.onrender.com/api/v1/user/public-key/${userId}`,
        {
            withCredentials: true
        }
    );

    return res.data.publicKey;
}