import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import Search from './Pages/Search';
import Exhibition from './Pages/Exhibition'

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/search" element={<Search/>} /> 
        <Route path="/exhibition" element={<Exhibition/>} /> 
      </Routes>
    </Router>
  )
}

export default App;
