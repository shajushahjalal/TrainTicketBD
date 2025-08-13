import React, { useEffect, useState } from 'react'
import { getSettings } from '../service/ApiService';

export default function Index() {

  const [stations, setStations] = useState([]);
  const [seatType, setSeatType] = useState([]);
  const [Trains, setTrains] = useState([]);

  useEffect(()=>{
    getSettingsData();
  },[])

  const getSettingsData = async() => {
    try{
      const response = await getSettings();
      if(response?.status == 200){

      }
      console.log(response);
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div>Index</div>
  )
}
