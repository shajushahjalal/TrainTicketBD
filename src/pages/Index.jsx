import React, { useEffect, useState } from 'react'
import { getSettings } from '../service/ApiService';
import { setSettings } from '../states/authenticationSlice';
import { useDispatch } from 'react-redux';
import { getSettingsData } from '../helper/Helper';

export default function Index() {

  const settings = getSettingsData()
  const dispatch = useDispatch();

  const [stations, setStations] = useState([]);
  const [seatType, setSeatType] = useState([]);

  useEffect(()=>{
    if(Object.keys(settings).length == 0){
      fetchSettingsData();
    }else{
      setStations(settings?.stations);
      setSeatType(settings?.seatType);
    }
  },[])

  const fetchSettingsData = async() => {
    try{
      const response = await getSettings();
      if(response?.status == 200){
        setStations(response?.data?.stations);
        setSeatType(response?.data?.seat_types);
        const payload = {
          stations : response?.data?.stations,
          seatType : response?.data?.seat_types
        }
        dispatch(setSettings(payload));
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div>Index</div>
  )
}
