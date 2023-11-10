import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [itemText, setItemText] = useState('');

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form className="form">
        <input
          type="text"
          placeholder="Add Todo Item"
          onChange={(e) => {
            setItemText(e.target.value);
          }}
          value={itemText}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
