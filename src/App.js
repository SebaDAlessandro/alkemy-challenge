//components
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Lista from './components/Lista'
import Header from "./components/Header";
import Footer from "./components/Footer";

//styles
import './styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/lista' element={<Lista />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
