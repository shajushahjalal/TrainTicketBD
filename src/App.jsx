
import { Route, Routes } from 'react-router-dom'
import routes from './route';
import DashboardLayout from './layouts/DashboardLayout';
import PageTitle from './components/pageTitle/PageTitle';
import LoadingBar from 'react-top-loading-bar';
import { setLoadingBarRef } from './components/Loader/loadingBar'; 
import { useEffect, useRef, useState } from 'react';



function App() {

  const loadingBarRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoadingBarRef(loadingBarRef);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      <LoadingBar color="#14b8a6" height={4} ref={loadingBarRef} />
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
