import axios from "../axios/index";
import { api } from "./ApiConstant";

const getSettings = async() => {
    return await axios.post(api.settings);
}
const userLogin = async(payload) =>{
    return await axios.post(api.login, payload);
}
const getProfile = async() => {
    return await axios.post(api.profile);
}

export {
    getSettings,
    userLogin,
    getProfile,
}