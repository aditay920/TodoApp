import React, { useEffect, useState } from 'react';
import TaskService from '../services/TaskService';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await TaskService.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      setError('Error fetching tasks. Please try again later.');
      console.error('Error fetching tasks:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await TaskService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      setError('Error deleting task. Please try again later.');
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <Link to="/add" className="btn btn-primary">Add Task</Link>
      
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      
      <ul className="list-group mt-3">
        {tasks.length === 0 ? (
          <li className="list-group-item">No tasks available.</li>
        ) : (
          tasks.map(task => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              {task.title}
              <div>
                <Link to={`/edit/${task.id}`} className="btn btn-sm btn-info mr-2">Edit</Link>
                <button onClick={() => deleteTask(task.id)} className="btn btn-sm btn-danger">Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
