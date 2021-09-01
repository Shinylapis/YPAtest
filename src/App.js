import './App.scss';
import Header from './Components/Header/Header';
import Movies from './Components/Movies/Movies';

function App() {
  return (
    <div className="App">
      <header className="App-header"> 
      <Header/>
      <Movies/>
      </header>
    </div>
  );
}

export default App;
