import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Recipe from './components/Recipe/RecipeDetail/RecipeDetail';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route path='/' element={<NavBar />}>
            <Route path='home' element={<Home/>}/>
            <Route path='recipe'>
              <Route path='create' element={<CreateRecipe />} />
              <Route path=':id' element={<Recipe />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
