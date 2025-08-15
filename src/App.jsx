
import { Route, Routes } from 'react-router-dom'
import routes from './route';
import DashboardLayout from './layouts/DashboardLayout';
import PageTitle from './components/pageTitle/PageTitle';



function App() {
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
