import React, { useState, useEffect } from 'react';
import TaskService from '../services/TaskService';
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      TaskService.getTaskById(id)
        .then(response => setTitle(response.data.title))
        .catch(error => console.error('Error fetching task:', error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      
      try {
        await TaskService.updateTask(id, { title });
        navigate('/');
      } catch (error) {
        console.error('Error updating task:', error);
      }
    } else {
      // Add new task
      try {
        await TaskService.createTask({ title });
        navigate('/'); 
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Task' : 'Add Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Title</label>
          <input 
            type="text" 
            className="form-control" 
            value={title}
            onChange={e => setTitle(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="btn btn-success">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default TaskForm;
