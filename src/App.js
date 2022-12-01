//components
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Lista from './components/lista/Lista'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Detalle from "./components/detalle/Detalle";

//styles
import './styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
    <Header />
    <Routes className='container mt-3'>
      <Route path="*" element={<Login />} />
      <Route path='/' element={<Login />} />
      <Route path='/lista' element={<Lista />} />
      <Route path='/detalle/:id' element={<Detalle />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
