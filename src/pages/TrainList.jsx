import React, { useEffect, useState } from 'react'
import { seatLayout } from '../service/ApiService';
import SeatView from './SeatView';

export default function TrainList({trains = []}) {

  const [coachs, setCoachs] = useState();
  const [viewTrainSeat, setViewTrainSeat] = useState("");
  const [tripId, setTripId] = useState(0);

  useEffect(()=>{
    setCoachs([]);
  },[trains])

  const showSeatLayput = async(seat, train) => {
    setCoachs([]);
    setViewTrainSeat(train?.trip_number);
    setTripId(seat?.trip_id)
    const payload = {
      trip_id : seat?.trip_id,
      trip_route_id : seat?.trip_route_id
    }
    const response = await seatLayout(payload);
    if(response?.status == 200){
      setCoachs(response?.data?.data?.seatLayout);
    }
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
                    onClick={()=> showSeatLayput(seat, train)}
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
            <div className='w-full'>
              {(coachs?.length > 0 && viewTrainSeat == train?.trip_number) &&
                <SeatView coachs={coachs} />
              }         
            </div>  
          </div>
        ))}
      </div>
    </>
  )
}
