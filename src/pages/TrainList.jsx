import React, { useEffect, useState } from 'react'
import { passengerDetails, seatLayout, verifyOtp, bulkUnselectSeat } from '../service/ApiService';
import SeatView from './SeatView';
import { getSelectedTickets } from '../helper/Helper';
import { FaRegTimesCircle, FaTimes } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setSelectedTickets } from '../states/authenticationSlice';

export default function TrainList({trains = []}) {

  const dispatch = useDispatch();
  const selectedTickets = getSelectedTickets();
  const [coachs, setCoachs] = useState();
  const [viewTrainSeat, setViewTrainSeat] = useState("");
  const [tripId, setTripId] = useState(0);
  const [tripRouteId, setTripRouteId] = useState(0);
  const [isEnableAutoSelect, setIsEnableAutoSelect] = useState(false);
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(()=>{
    setCoachs([]);
  },[trains])

  const showSeatLayput = async(seat, train) => {
    setCoachs([]);
    setViewTrainSeat(train?.trip_number);
    setTripRouteId(seat?.trip_route_id);
    setTripId(seat?.trip_id)
    const payload = {
      trip_id : seat?.trip_id,
      trip_route_id : seat?.trip_route_id
    }
    const response = await seatLayout(payload);
    if(response?.status == 200){
      setIsOtpSend(false);
      setCoachs(response?.data?.data?.seatLayout);
    }
  }

  const handlePurchaseBtnClick = async() => {
    try{
      const payload = {
        "trip_id" : tripId,
        "trip_route_id" : tripRouteId,
        "ticket_ids" : selectedTickets.map((ticket) => { return ticket.ticket_id })
      }
      const response = await passengerDetails(payload);
      if(response?.status == 200){
        setIsOtpSend(true);
      }
    }catch(error){

    }
  }

  const handleResendOpt = async() => {
    
  }

  const clearSelection = async() => {
    if(confirm("Are you clear all selected seat?")){
      const payload = {
        "route_id" : tripRouteId,
        "ticket_id" : selectedTickets.map((ticket) => { return ticket.ticket_id })
      }
      await bulkUnselectSeat(payload);
      dispatch(setSelectedTickets([]));
    }
  }

  const handleVerifyOtp = async() => {
    try{
      const payload = {
        "trip_id" : tripId,
        "trip_route_id" : tripRouteId,
        "otp" : otp,
        "ticket_ids" : selectedTickets.map((ticket) => { return ticket.ticket_id })
      }
      const response = await verifyOtp(payload);
      if(response?.status == 200){
        setIsOtpSend(true);
      }else{
        console.log("------response----", response)
      }
    }catch(error){

    }
  }

  const confirmTicket = async() => {
    
  }

  return (
    <>
      <div className='w-full grid grid-cols-1 md:grid-cols-1 gap-3 '>
        {trains?.map((train, index) => (
          <div key={index} className="col-span-1 px-3 py-2 m-2 bg-white rounded-lg">
            <div className='w-full'>
              <p className='font-bold'>{train?.trip_number}</p>
              <p>{train?.origin_city_name} To {train?.destination_city_name	}</p>
              <p>{train?.departure_date_time}</p>
            </div>

            <div className='w-full mt-3 mb-1 flex gap-3 justify-between'>
              {train?.seat_types.map((seat, _index) => (
                <div key={_index} className='bg-[#d2dddb] p-3 flex-1 rounded-lg'>
                  <p className='text-green-800 font-bold'>{seat?.type}</p>
                  <p className='text-green-800 font-bold'>Fare : {seat?.fare	}</p>
                  <p className='text-green-800 mt-2 text-[12px]'>Online : {seat?.seat_counts?.online}</p>
                  <p className='text-green-800 text-[12px]'>Offline : {seat?.seat_counts?.offline}</p>

                  <button 
                    className={'text-white px-2 rounded-lg mt-2 ' + (tripId == seat?.trip_id ? 'bg-green-400' : 'bg-green-800')}
                    onClick={()=> {
                      setIsEnableAutoSelect(false);
                      showSeatLayput(seat, train);
                    }}
                  >
                    Book Now
                  </button>
                   <button 
                    className={'text-white px-2 rounded-lg mt-2 ml-2 ' + (tripId == seat?.trip_id ? 'bg-green-400' : 'bg-teal-500')}
                    onClick={()=> {
                      setIsEnableAutoSelect(true);
                      showSeatLayput(seat, train);
                    }}
                  >
                    Auto Book Now
                  </button>
                </div>
              ))}
            </div>
            <div className='w-full'>
              {(coachs?.length > 0 && viewTrainSeat == train?.trip_number) &&
              <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                <div className='col-span-2'>
                  <SeatView coachs={coachs} tripRouteId={tripRouteId} isEnableAutoSelect={isEnableAutoSelect}/>
                </div>
                <div className='col-span-1'>
                  <div className='w-full mt-3 mb-1 border p-3 rounded-lg border-green-800'>
                    <div className=' w-full relative'>
                      <h3 className='font-bold'>Selected Seats</h3>
                      {selectedTickets?.length > 0 &&
                        <button 
                          className='absolute right-1 top-0'
                          onClick={clearSelection}
                        >
                          <FaTimes className='text-red-500 text-lg'/>
                        </button>
                      }
                    </div>
                    <hr  className='mt-1 mb-1'/>
                    <div className='grid grid-cols-2 gap-3'>
                      {selectedTickets?.map((ticket, index) => (
                        <div key={index}  className='col-span-1 mt-1 bg-[#384c6b] text-white rounded-lg px-3 py-2'>{ticket?.seat_number}</div>
                      ))}
                      {selectedTickets?.length > 0 &&
                        <> 
                          {isOtpSend ?
                            <>
                              <input 
                                type='text' 
                                className='col-span-2 h-10 w-full rounded-md px-2 border border-green-800' 
                                placeholder='OTP'
                                onChange={(e) => setOtp(e.target.value)}
                              />

                              <button 
                                onClick={handleResendOpt}
                                className='col-span-2 text-yellow-700 mt-1'
                              >
                                Resend OTP
                              </button>
                              
                              <button 
                                onClick={handleVerifyOtp}
                                className='col-span-2 bg-teal-500 text-white px-2 py-2 rounded-lg'
                              >
                                Verify OTP
                              </button>
                            </>
                          :
                            <button 
                              onClick={handlePurchaseBtnClick}
                              className='col-span-2 bg-green-800 text-white px-2 py-2 rounded-lg mt-2'
                            >
                              Purchase
                            </button>
                          }
                        </>
                      }
                    </div>
                  </div>
                </div>
              </div>
              }
            </div>  
          </div>
        ))}
      </div>
    </>
  )
}
