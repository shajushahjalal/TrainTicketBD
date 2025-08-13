import axios from "../axios/index";
import { api } from "./ApiConstant";

const getSettings = async() => {
    return await axios.post(api.settings);
}

export {
    getSettings,

}