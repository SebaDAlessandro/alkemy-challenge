import Login from "./components/Login";
import Lista from './components/Lista'
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/lista' element={<Lista />} />
    </Routes>
    </>
  );
}

export default App;
