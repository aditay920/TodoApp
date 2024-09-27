// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import TaskList from './Components/TaskList';
// import TaskForm from './Components/TaskForm';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<TaskList />} />
//         <Route path="/add" element={<TaskForm />} />
//         <Route path="/edit/:id" element={<TaskForm />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;




import React, { useState } from 'react';
import './App.css'


const TaskList = ({ tasks, onEdit, onDelete }) => (
  <div>
    <h3>Tasks</h3>
    <table>
      <thead>
        <tr>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Comments</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td>{task.assignedTo}</td>
            <td>{task.status}</td>
            <td>{task.dueDate}</td>
            <td>{task.priority}</td>
            <td>{task.comments}</td>
            <td>
              <button onClick={() => onEdit(index)}>Edit</button>
              <button onClick={() => onDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// TaskForm component for adding or editing tasks
const TaskForm = ({ task = {}, onSave, onCancel }) => {
  const [assignedTo, setAssignedTo] = useState(task.assignedTo || '');
  const [status, setStatus] = useState(task.status || '');
  const [dueDate, setDueDate] = useState(task.dueDate || '');
  const [priority, setPriority] = useState(task.priority || '');
  const [comments, setComments] = useState(task.comments || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ assignedTo, status, dueDate, priority, comments });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{task.assignedTo ? 'Edit Task' : 'New Task'}</h3>
      <div>
        <label>Assigned To</label>
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Status</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label>Comments</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

// DeleteModal component for confirming task deletion
const DeleteModal = ({ task, onDeleteConfirm, onCancel }) => (
  <div className="modal">
    <h3>Delete</h3>
    <p>Do you want to delete task '{task.assignedTo}'?</p>
    <button onClick={onDeleteConfirm}>Yes</button>
    <button onClick={onCancel}>No</button>
  </div>
);

const App = () => {
  const [tasks, setTasks] = useState([
    { assignedTo: 'User 1', status: 'Completed', dueDate: '2024-12-10', priority: 'Low', comments: 'This task is good' },
    { assignedTo: 'User 2', status: 'In Progress', dueDate: '2024-09-14', priority: 'High', comments: 'This task is good' },
    { assignedTo: 'User 3', status: 'Not Started', dueDate: '2024-08-18', priority: 'High', comments: 'This task is good' },
    { assignedTo: 'User 4', status: 'In Progress', dueDate: '2024-06-12', priority: 'Normal', comments: 'This task is good' }
  ]);

  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [deletingTaskIndex, setDeletingTaskIndex] = useState(null);

  const handleSaveTask = (task) => {
    if (editingTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingTaskIndex] = task;
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, task]);
    }
    setEditingTaskIndex(null);
  };

  const handleEditTask = (index) => {
    setEditingTaskIndex(index);
  };

  const handleDeleteTask = (index) => {
    setDeletingTaskIndex(index);
  };

  const confirmDeleteTask = () => {
    setTasks(tasks.filter((_, i) => i !== deletingTaskIndex));
    setDeletingTaskIndex(null);
  };

  const handleCancelDelete = () => {
    setDeletingTaskIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingTaskIndex(null);
  };

  return (
    <div>
      <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />

      {editingTaskIndex !== null && (
        <TaskForm
          task={tasks[editingTaskIndex]}
          onSave={handleSaveTask}
          onCancel={handleCancelEdit}
        />
      )}

      {editingTaskIndex === null && (
        <TaskForm
          onSave={handleSaveTask}
          onCancel={handleCancelEdit}
        />
      )}

      {deletingTaskIndex !== null && (
        <DeleteModal
          task={tasks[deletingTaskIndex]}
          onDeleteConfirm={confirmDeleteTask}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default App;

