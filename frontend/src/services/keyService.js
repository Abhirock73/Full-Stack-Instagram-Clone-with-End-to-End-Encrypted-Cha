import axios from "axios";

export async function fetchPublicKey(userId) {

    const res = await axios.get(
        `http://localhost:4000/api/v1/user/public-key/${userId}`,
        {
            withCredentials: true
        }
    );

    return res.data.publicKey;
}