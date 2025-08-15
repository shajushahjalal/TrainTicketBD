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
const searchTrain = async(payload) => {
    return await axios.post(api.search_train, payload);
}
const seatLayout = async(payload) => {
    return await axios.post(api.seat_layout, payload);
}
const selectSeat = async(payload) => {
    return await axios.post(api.select_seat, payload);
}
const unselectSeat = async(payload) => {
    return await axios.post(api.unselect_seat, payload);
}
const passengerDetails = async(payload) => {
    return await axios.post(api.passenger_details, payload);
}
const VerifyOtp = async(payload) => {
    return await axios.post(api.verify_otp, payload);
}
const confirmTicket = async(payload) => {
    return await axios.post(api.confirm_ticket, payload);
}

export {
    getSettings,
    userLogin,
    getProfile,
    searchTrain,
    seatLayout,
    selectSeat,
    unselectSeat,
    passengerDetails,
    VerifyOtp,
    confirmTicket
}