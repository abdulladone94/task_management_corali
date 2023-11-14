import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [itemText, setItemText] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/item`,
        {
          item: itemText,
          description: taskDescription,
        }
      );
      setListItems((prev) => [...prev, res.data]);
      setItemText('');
      setTaskDescription('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/items`
        );
        setListItems(res.data);
        console.log('render');
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/item/${id}`
      );
      console.log(res);
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/item/${isUpdating}`,
        { item: updateItemText }
      );
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex(
        (item) => item._id === isUpdating
      );
      const updatedItem = (listItems[updatedItemIndex].item = updateItemText);
      console.log(updatedItem);
      setUpdateItemText('');
      setIsUpdating('');
    } catch (err) {
      console.log(err);
    }
  };
  const renderUpdateForm = () => (
    <form
      className="update-form"
      onSubmit={(e) => {
        updateItem(e);
      }}
    >
      <input
        className="update-new-input"
        type="text"
        placeholder="New Item"
        onChange={(e) => {
          setUpdateItemText(e.target.value);
        }}
        value={updateItemText}
      />
      <button className="update-new-btn" type="submit">
        Update
      </button>
    </form>
  );

  return (
    <div className="App">
      <h1>My Task Manager</h1>
      <form className="form" onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="Task Title"
          required
          onChange={(e) => {
            setItemText(e.target.value);
          }}
          value={itemText}
        />
        <input
          type="text"
          placeholder="Task Description"
          required
          onChange={(e) => {
            setTaskDescription(e.target.value);
          }}
          value={taskDescription}
        />
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {listItems.map((task) => (
          <div className="todo-item">
            {isUpdating === task._id ? (
              renderUpdateForm()
            ) : (
              <>
                <p className="item-content">{task.item}</p>
                <p className="item-content">{task.description}</p>
                <button
                  className="update-item"
                  onClick={() => {
                    setIsUpdating(task._id);
                  }}
                >
                  Update
                </button>
                <button
                  className="delete-item"
                  onClick={() => {
                    deleteItem(task._id);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
