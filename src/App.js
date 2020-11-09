import logo from './logo.svg';
import './App.css';

import LeftMenu from './components/LeftMenu'

function App() {
  return (
    <div className="container-fluid">
      <LeftMenu></LeftMenu>
      <div class="main-content" id="panel">
        <nav class="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
          <button className="btn btn-lg btn-primary">

          </button>
        </nav>
      </div>
      
    </div>
  );
}

export default App;
