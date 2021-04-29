import { lazy, Suspense } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import ClientList from './pages/ClientList';
import UpdateClient from './pages/UpdateClient';

const Home = lazy(() => import('./pages/Home'));


const App = ()=>{
  return(
    <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component = {Home}  />
        <Route exact path = "/clients" component = {ClientList}  />
        <Route exact path = "/client/:id" component = {UpdateClient}  />
      </Switch>
    </BrowserRouter>
    <ToastContainer/>
    </Suspense>
  )
}

export default App