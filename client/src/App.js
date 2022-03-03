import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Register from './Pages/Register';



function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
    <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login/>} />

      </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
