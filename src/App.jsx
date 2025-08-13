
import { Route, Routes, useNavigate } from 'react-router-dom'
import routes from './route';
import DashboardLayout from './layouts/DashboardLayout';
import PageTitle from './components/pageTitle/PageTitle';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import RouteConstant from './route/RouteConstant';


function App() {

  const navigate = useNavigate();
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const accessToken = useSelector((state) => state.authentication.access_token) || localStorage.getItem("api_token")

  useEffect(() => {
    checkLogin();
  },[accessToken])

  const checkLogin = async () => {
    if(accessToken){
      setIsAuthenticate(true);
      navigate(RouteConstant.dashboard);
    }else{
      setIsAuthenticate(false);
      navigate(RouteConstant.login);
    }
  }

  return (
    <>
      <DashboardLayout>
          <Routes>
            {routes.map((_route, index) => (
              <Route 
                key={index} 
                path={_route.path} 
                element={
                  <>
                    <_route.element></_route.element>
                    <PageTitle title={_route.pageTitle}></PageTitle>
                  </>}
              ></Route>
            ))}
          </Routes>
        </DashboardLayout>
    </>
  )
}

export default App
