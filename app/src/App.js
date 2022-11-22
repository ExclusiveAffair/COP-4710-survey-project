import React from 'react'; // import react
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Home />
      </div>
      
    );
  }
}

export default App;