import type {AuthProvider} from "react-admin"
import type {WhoAmI} from "../types";

async function whoAmI(): Promise<WhoAmI> {
    const response = await fetch("/api/whoami", {
        method: "GET"
    });

    if (!response.ok) {
        throw response;
    }

    return await response.json();
}

const authProvider: AuthProvider = {
    async login(params: { username: string, password: string }) {

        const auth = btoa(`${params.username}:${params.password}`);

        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                Authorization: `Basic ${auth}`
            },
        });

        if (!response.ok) {
            throw response
        }

    },
    checkError: error => Promise.resolve(),

    async checkAuth(params) {
        await whoAmI();
    },

    async logout() {
        await fetch("/api/logout", {
            method: "GET"
        });
    },

    getIdentity() {
        return whoAmI();
    },

    async getPermissions() {
        return (await whoAmI()).permissions;
    },
}

export default authProvider