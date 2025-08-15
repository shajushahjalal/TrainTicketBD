import { useSelector } from "react-redux"

export const getSettingsData = () => {
    let settings = useSelector((state) => state.authentication.settings);
    if(Object.keys(settings).length == 0){
        settings =  localStorage.getItem("ticket_settings") ? JSON.parse(localStorage.getItem("ticket_settings")) : {};
    }
    return settings;
}

export const getAuthenticateToken = () => {
    return useSelector((state) => state.authentication.api_token) || localStorage.getItem("api_token")
}