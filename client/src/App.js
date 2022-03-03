import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {Provider} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { store } from './Store/store';



function App() {
  
  return (
    <div className="App">
      <Provider store={store}>

      <BrowserRouter>
      <Navbar/>
      <Routes>
    <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login/>} />

      </Routes>
      </BrowserRouter>
      <ToastContainer />
      </Provider>
    </div>
  );
}

export default App;
