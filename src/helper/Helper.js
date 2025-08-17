import { useSelector } from "react-redux"
import Swal from "sweetalert2";

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

export const getUserData = () => {
    return useSelector((state) => state.authentication.user_date);
}

export const getSelectedTickets = () => {
    let selected_tickets =  useSelector((state) => state.authentication.selected_tckets);
    if(selected_tickets?.length == 0){
        selected_tickets = localStorage.getItem("selected_tckets") ? JSON.parse(localStorage.getItem("selected_tckets")) : [];
    }
    return selected_tickets;
}

export const message = ( message = "success", is_error = false) => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: is_error ? 'error' : 'success',
        title: message,
        showConfirmButton: false,
        timer: 3000, 
        timerProgressBar: true
     });
}