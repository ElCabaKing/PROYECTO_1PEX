import { api } from "../utils/api";

export async function appstLogin(params) {
    const res = await api.post("/login",params);
    console.log(res);
    return res;
}

export async function appstLogOut() {
    const res = await api.get("/logout",{ headers: { credential: "include" } });
    console.log(res);
    return res;
}


