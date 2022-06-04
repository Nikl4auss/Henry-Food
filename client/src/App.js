import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Recipe from './components/Recipe/Recipe';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/recipe'>
            <Route path='/recipe/:id' element={<Recipe />} />
            <Route path='/recipe/create' element={<CreateRecipe />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
