import React, { useEffect, useState } from 'react'

export default function SeatView({coachs}) {

  const [selectedCoach, setSelectedCoach] = useState("");
  const [seatList, setSeatList] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState([]);

  useEffect(()=>{
    let is_coach_selected = false;
    coachs?.map((coach)=>{
      if(coach?.seat_availability){
        if(!is_coach_selected){
          setSelectedCoach(coach?.floor_name);
          is_coach_selected = true;
        }
      }
    });
  },[coachs])

  useEffect(()=>{
    const coach = coachs?.find((c) => c?.floor_name == selectedCoach);
    setSeatList(coach?.layout);
  },[selectedCoach])

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
        <div className='grid grid-cols-1 md:grid-cols-2 bg-[#F1F1F1] px-2 py-1 rounded-md'>
          <div className='col-span-1'>
            {seatList?.slice(0,9)?.map((seat_line, index) => (
              <div className='flex items-center gap-3 mt-1'>
                {seat_line?.map((seat, _index) => (
                  seat?.seat_number?.length > 0 ?
                  <button 
                    key={index+_index} 
                    className={'w-[34px] min-h-[36px] px-1 py-1 border rounded-md text-[10px] ' + (seat.seat_availability ? 'border-green-800' : 'bg-yellow-600 text-white')}
                  >
                    {seat?.seat_number}
                  </button>
                  :
                  <div className='h-[32px] w-[32px]'></div>
                ))}
              </div>
            ))}
          </div>
          <div className='col-span-1'>
            {seatList?.slice(10)?.map((seat_line, index) => (
              <div className='flex items-center gap-3 mt-1'>
                {seat_line?.map((seat, _index) => (
                  seat?.seat_number?.length > 0 ?
                  <button 
                    key={index+_index} 
                    className={'w-[34px] min-h-[36px] px-1 py-1 border rounded-md text-[10px] ' + (seat.seat_availability ? 'border-green-800' : 'bg-yellow-600 text-white')}
                  >
                    {seat?.seat_number}
                  </button>
                  :
                  <div className='h-[32px] w-[32px]'></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
