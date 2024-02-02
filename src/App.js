import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "./styles.scss"
import Home from './Pages/Home';
import Todo from './Pages/Todo';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/todo" element={<Todo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
