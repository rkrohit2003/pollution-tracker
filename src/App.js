import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { About } from './components/about/About';
import { Location } from './components/location/Location';
import { Pollution } from './components/pollution/Pollution';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path='/' element={<Location/>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/pollution' element={<Pollution/>}></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;