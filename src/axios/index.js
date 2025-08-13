import axios from "axios";

const base_url = "http://127.0.0.1:8000/api";
// const base_url = "http://127.0.0.1:8000";
export const api_version = "/v1"

axios.defaults.baseURL = base_url + api_version;
axios.defaults.headers.common['Authorization'] = "";
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(request => {
    return request;
});

axios.interceptors.response.use(response => {
    if(response?.status == 200){
        return response?.data;
    }else{
        return response;
    }
});

export default axios;