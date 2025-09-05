import React, { useEffect, useState } from 'react'
import { selectSeat, unselectSeat } from '../service/ApiService';
import { setSelectedTickets } from '../states/authenticationSlice';
import { useDispatch } from 'react-redux';
import { useSelectedTickets } from '../helper/Helper';

export default function SeatView({coachs, tripRouteId, autoSelectedSeats}) {

  const dispatch = useDispatch();
  const [selectedCoach, setSelectedCoach] = useState("");
  const [seatList, setSeatList] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState([]);

  useEffect(()=>{
    const firstAvailableCoach = coachs.find(c => c?.seat_availability);
    if (firstAvailableCoach) {
      setSelectedCoach(firstAvailableCoach.floor_name);
    }
    if(autoSelectedSeats?.length > 0){
      setSelectedSeat(autoSelectedSeats);
      dispatch(setSelectedTickets(autoSelectedSeats));
    }
  },[coachs, autoSelectedSeats]);

  useEffect(()=>{
    const coach = coachs?.find((c) => c?.floor_name == selectedCoach);
    setSeatList(coach?.layout);
  },[selectedCoach]);

  const handleSeatClick = async (ticket_id, seat_number) => {
    const selected = selectedSeat.find((s) => s.ticket_id === ticket_id);

    const payload = {
      ticket_id: ticket_id,
      route_id: tripRouteId,
      seat_number : seat_number,
    };

    if (selected) {
      const response = await unselectSeat(payload);
      setSelectedSeat((prev) => {
        const current_selected = prev.filter((s) => s.ticket_id !== ticket_id);
        dispatch(setSelectedTickets(current_selected));
        return current_selected;
      })
    } else {
      const response = await selectSeat(payload);
      if (response?.status === 200) {
        setSelectedSeat((prev) => {
          dispatch(setSelectedTickets([...prev, payload]));
          return [...prev, payload];
        });
      }
    }
  };

  const isSeatSelected = (ticket_id) => {
    let _selectedSeat = [...selectedSeat];
    const selected = _selectedSeat?.find((s) => s.ticket_id == ticket_id);
    if(selected == undefined){
      return false;
    }else{
      return true;
    }
  }

  return (
    <div className='w-full mt-3 mb-1 border p-3 rounded-lg border-green-800'>
      <div className='w-full flex items-center gap-3'>
        {coachs?.map((coach, index) => (
          <button key={index} 
            onClick={()=> setSelectedCoach(coach?.floor_name) }
            className={`h-[32px] min-w-[32px] px-0.5 border border-green-800 rounded-md text-[10px] ${selectedCoach == coach?.floor_name ? 'bg-[#384c6b] text-white' : ''}`}
          >
            {coach?.floor_name}
          </button>
        ))}
      </div>
      <div className='w-full mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 '>
          <div className='col-span-1 bg-[#F1F1F1] px-3 py-2 rounded-md'>
            {seatList?.slice(0,10)?.map((seat_line, index) => (
              <div key={"left"+index} className='flex items-center gap-3 mt-1'>
                {seat_line?.map((seat, _index) => (
                  seat?.seat_number?.length > 0 ?
                  <button
                    onClick={() => handleSeatClick(seat.ticket_id, seat?.seat_number)} 
                    key={"seat"+_index} 
                    className={
                      'w-[34px] min-h-[36px] px-1 py-1 border rounded-md text-[10px] ' + 
                      (isSeatSelected(seat.ticket_id) ? 'bg-[#384c6b] text-white' :
                      (
                        seat?.seat_availability === 1 ? 'border-green-800 bg-white' : 
                        (seat?.seat_availability === 2 ? 'bg-green-700 text-white' :
                        'bg-yellow-600 text-white')
                      ))
                    }
                  >
                    {seat?.seat_number}
                  </button>
                  :
                  <div key={"seat"+_index}  className='h-[32px] w-[32px]'></div>
                ))}
              </div>
            ))}
          </div>
          <div className='col-span-1 bg-[#F1F1F1] px-3 py-2 rounded-md'>
            {seatList?.slice(10)?.map((seat_line, index) => (
              <div key={"left"+index} className='flex items-center gap-3 mt-1'>
                {seat_line?.map((seat, _index) => (
                  seat?.seat_number?.length > 0 ?
                  <button 
                    onClick={() => handleSeatClick(seat.ticket_id, seat?.seat_number)} 
                    key={index+_index} 
                    className={
                      'w-[34px] min-h-[36px] px-1 py-1 border rounded-md text-[10px] ' + 
                      (isSeatSelected(seat.ticket_id) ? 'bg-[#384c6b] text-white' :
                      (
                        seat?.seat_availability === 1 ? 'border-green-800 bg-white' : 
                        (seat?.seat_availability === 2 ? 'bg-green-700 text-white' :
                        'bg-yellow-600 text-white')
                      ))
                    }
                  >
                    {seat?.seat_number}
                  </button>
                  :
                  <div key={"seat"+_index}  className='h-[32px] w-[32px]'></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
