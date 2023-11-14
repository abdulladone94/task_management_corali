import { useState, useEffect } from 'react';
import axios from 'axios';
// import { Button, Modal } from 'antd';
import './App.css';

function App() {
  const [itemText, setItemText] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  // const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(listItems);

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/item`,
        {
          item: itemText,
          description: taskDescription,
          startDate: startDate,
          endDate: endDate,
        }
      );
      setListItems((prev) => [...prev, res.data]);
      setItemText('');
      setTaskDescription('');
      setStartDate('');
      setEndDate('');
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

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  // const handleOk = (id) => {
  //   deleteItem(id);

  //   setIsModalOpen(false);
  // };
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/item/${isUpdating}`,
        { item: updateItemText, description: updateDescription }
      );
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex(
        (item) => item._id === isUpdating
      );
      const updatedItem = (listItems[updatedItemIndex].item = updateItemText);
      const updatedDescription = (listItems[updatedItemIndex].description =
        updateDescription);
      console.log(updatedItem);
      console.log(updatedDescription);
      setUpdateItemText('');
      setUpdateDescription('');
      setIsUpdating('');
    } catch (err) {
      console.log(err);
    }
  };
  const renderUpdateForm = () => (
    <form
      className="flex-col"
      onSubmit={(e) => {
        updateItem(e);
      }}
    >
      <input
        className="rounded-[5px] border-2 border-gray-100/80 w-full bg-[#eee] mb-3"
        type="text"
        placeholder="Update Title"
        onChange={(e) => {
          setUpdateItemText(e.target.value);
        }}
        value={updateItemText}
      />
      <input
        className="rounded-[5px] border-2 border-gray-100/80 w-full bg-[#eee] mb-3"
        type="text"
        placeholder="Update Description"
        onChange={(e) => {
          setUpdateDescription(e.target.value);
        }}
        value={updateDescription}
      />
      <button
        className="rounded-[20px] border-2 border-black-100/80 bg-slate-300 mr-5 hover:bg-slate-400"
        type="submit"
      >
        Update
      </button>
    </form>
  );

  return (
    <div className="flex-col justify-center w-auto mx-5 my-5 text-center md:my-10 md:mx-10">
      <h1 className="text-3xl font-bold underline ">My Task Manager</h1>
      <form className="flex justify-center" onSubmit={(e) => addItem(e)}>
        <div className="grid grid-cols-1  gap-4 w-[400px] sm:w-[750px] my-10">
          <input
            type="text"
            placeholder="Task Title"
            required
            onChange={(e) => {
              setItemText(e.target.value);
            }}
            value={itemText}
          />
          <textarea
            type="text"
            placeholder="Task Description"
            required
            onChange={(e) => {
              setTaskDescription(e.target.value);
            }}
            value={taskDescription}
          />
          <label className="text-left mb-[-12px]" htmlFor="">
            Start Date
          </label>
          <input
            type="date"
            placeholder="Start Date"
            required
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            value={startDate}
            format="mm/dd/yyyy"
          />
          <label className="text-left mb-[-12px]" htmlFor="">
            End Date
          </label>
          <input
            type="date"
            placeholder="End Date"
            required
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            value={endDate}
          />
          <div className="text-center">
            <button
              className="bg-slate-500 py-3 px-10 rounded-[20px] border-2 border-gray-100/80  hover:bg-slate-300"
              type="submit"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>

      <div className="grid w-auto grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {listItems?.map((task) => (
          <div className="bg-white px-5 relative mb-6 h-[265px] min-w-[265px] transform snap-start rounded-[20px] border-2 border-gray-100/80 transition-all duration-300  ease-in-out hover:scale-105 hover:border-white">
            <h6 className="text-xl font-bold text-center text-gray-600 font-jost">
              {task.item}
            </h6>
            <h6 className="my-4 mb-2 text-lg font-medium text-left text-gray-400 font-poppins">
              {task.description}
            </h6>

            <div className="todo-item">
              {isUpdating === task._id ? (
                renderUpdateForm()
              ) : (
                <div className="w-full">
                  {task.startDate && task.startDate !== '' ? (
                    <div className="my-4 text-left text-gray-400">
                      <p className="">Start : {task.startDate.split('T')[0]}</p>
                      <p className="">End : {task.endDate.split('T')[0]}</p>
                    </div>
                  ) : (
                    <p className="">No start date</p>
                  )}
                  <div className="flex justify-start">
                    <button
                      className="rounded-[20px] border-2 border-black-100/80 bg-slate-300 mr-5 hover:bg-slate-400"
                      onClick={() => {
                        setIsUpdating(task._id);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="rounded-[20px] border-2 border-black-100/80 bg-slate-300 hover:bg-slate-400"
                      onClick={() => {
                        deleteItem(task._id);
                      }}
                      // onClick={showModal}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* <Modal
              title={`Are you sure you want to delete this task ?`}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            ></Modal> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
