import { api } from "../utils/api";

export async function appSaveAns(params) {
    const res = await api.patch("/saveSkAns",params);
    return res;
}

export async function appValidateAns(params) {
    const res = await api.get("/validateAns",params)
}