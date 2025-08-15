import React, { useEffect, useState } from 'react'
import { getProfile, getSettings, searchTrain } from '../service/ApiService';
import { setSettings, setUserData } from '../states/authenticationSlice';
import { useDispatch } from 'react-redux';
import { getAuthenticateToken, getSettingsData } from '../helper/Helper';
import moment from 'moment';
import Login from './Login';
import TrainList from './TrainList';

export default function Index() {

  const dispatch = useDispatch();
  const settings = getSettingsData();
  const apiToken = getAuthenticateToken();

  const [stations, setStations] = useState([]);
  const [seatType, setSeatType] = useState([]);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const [formStation, setFormStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [date, setDate] = useState("");
  const [seatClass, setSeatClass] = useState("");
  const [availableTrains, setAvailableTrains] = useState([])

  useEffect(()=>{
    if(Object.keys(settings).length == 0){
      fetchSettingsData();
    }else{
      setStations(settings?.stations);
      setSeatType(settings?.seatType);
    }
  },[]);
  
  useEffect(() => {
    if(apiToken){
      checkLogin();
    }else{
      setIsShowLoginModal(true);
    }
  },[apiToken])

  const checkLogin = async () => {
    if(apiToken){
      try{
        const response = await getProfile();
        if(response?.status == 200){
          dispatch(setUserData(response?.data?.data))
        }else{
          setIsShowLoginModal(true);
        }
      }catch(error){
      }
    }else{

    }
  }

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

  const searchTrains = async() => {
    try{
      // setAvailableTrains();
      const payload = {
        from_station: formStation,
        to_station   : toStation,
        date        : date,
        class       : seatClass,
      }
      const response = await searchTrain(payload);
      if(response?.status == 200){
        setAvailableTrains(response?.data?.data?.trains);
      }
    }catch(error){

    }
  }

  return (
    <>
      <div className='w-full'>
        <div className='flex gap-3'>
          <div className='flex-1 grid gap-3 grid-col-1 sm:grid-cols-2 md:grid-cols-4'>
            <div className='col-span-1'>
              <label className='w-full'>Form Station</label>
              <select 
                className='w-full h-10 px-3 bg-transparent border rounded-lg'
                onChange={(e)=> setFormStation(e.target.value)}
              >
                <option value="">Select Start Station</option>
                {stations?.map((list, index) =>(
                  <option key={index} value={list?.city_name}>{list?.city_name}</option>
                ))}
              </select>
            </div>
            
            <div className='col-span-1'>
              <label className='w-full'>To Station</label>
              <select 
                className='w-full h-10 px-3 bg-transparent border rounded-lg'
                onChange={(e)=> setToStation(e.target.value)}
              >
                <option value="">Select Destination Station</option>
                {stations?.map((list, index) =>(
                  <option key={index} value={list?.city_name}>{list?.city_name}</option>
                ))}
              </select>
            </div>
            
            <div className='col-span-1'>
              <label className='w-full'>Seat Type</label>
              <select 
                className='w-full h-10 px-3 bg-transparent border rounded-lg'
                onChange={(e)=> setSeatClass(e.target.value)}
              >
                <option value="">Select Seat Type</option>
                {seatType?.en?.map((list, index) =>(
                  <option key={index} value={list?.seat_class}>{list?.seat_class}</option>
                ))}
              </select>
            </div>
            <div className='col-span-1'>
              <label className='w-full'>Date</label>
              <input 
                type='date' 
                className='w-full h-10 px-3 bg-transparent border rounded-lg' 
                min={moment(new Date()).format('YYYY-MM-DD')}
                onChange={(e)=>setDate(e.target.value)}
              />
            </div>
          </div>
          <div className='self-end'>
              <button 
                className='btn bg-green-800 text-white rounded-md'
                onClick={()=> searchTrains()}
              >
                Search
              </button>
          </div>
        </div>
      </div>

      <div className='w-full bg-gray-100 my-3 rounded-lg'>
        {availableTrains?.length > 0 &&
          <TrainList trains={availableTrains} />
        }
      </div>

      {isShowLoginModal && 
        <Login openModal={isShowLoginModal} closeModal={()=>{setIsShowLoginModal(false)}} />
      }
    </>
  )
}
