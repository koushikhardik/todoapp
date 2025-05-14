// import React from 'react'

// const App = () => {
//   return (
//     <div>
//       app
//     </div>
//   )
// }

// export default App

//todo list code  below

// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useState, useEffect } from 'react';

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [input, setInput] = useState('');

//   // Load tasks from localStorage on component mount
//   useEffect(() => {
//     const storedTasks = localStorage.getItem('tasks');
//     if (storedTasks) {
//       setTasks(JSON.parse(storedTasks));
//     }
//   }, []);

//   // Save tasks to localStorage whenever tasks change
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   const handleAddTask = () => {
//     if (input.trim()) {
//       const newTasks = [...tasks, { text: input, completed: false }];
//       setTasks(newTasks);
//       setInput('');
//     }
//   };

//   const toggleTask = (index) => {
//     const newTasks = [...tasks];
//     newTasks[index].completed = !newTasks[index].completed;
//     setTasks(newTasks);
//   };

//   const deleteTask = (index) => {
//     const newTasks = tasks.filter((_, i) => i !== index);
//     setTasks(newTasks);
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">React To-Do List 📝</h2>

//       <div className="input-group mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Enter a task..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button className="btn btn-primary" onClick={handleAddTask}>Add</button>
//       </div>

//       <ul className="list-group">
//         {tasks.length === 0 ? (
//           <li className="list-group-item text-muted">No tasks yet</li>
//         ) : (
//           tasks.map((task, index) => (
//             <li
//               key={index}
//               className="list-group-item d-flex justify-content-between align-items-center"
//               style={{
//                 textDecoration: task.completed ? 'line-through' : 'none',
//               }}
//             >
//               <span onClick={() => toggleTask(index)} style={{ cursor: 'pointer' }}>
//                 {task.text}
//               </span>
//               <button
//                 className="btn btn-sm btn-danger"
//                 onClick={() => deleteTask(index)}
//               >
//                 ❌
//               </button>
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [loaded, setLoaded] = useState(false); // Track when initial load is done

  // Load tasks from localStorage on first render
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    setLoaded(true); // Mark that loading is done
  }, []);

  // Save tasks to localStorage only after initial load
  useEffect(() => {
    if (loaded) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, loaded]);

  const handleAddTask = () => {
    if (input.trim()) {
      const newTasks = [...tasks, { text: input, completed: false }];
      setTasks(newTasks);
      setInput('');
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        React To-Do List 📝
      </h2>

      <div style={{ display: 'flex', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px 0 0 4px',
          }}
        />
        <button
          onClick={handleAddTask}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '0 4px 4px 0',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.length === 0 ? (
          <li style={{ color: '#888', textAlign: 'center' }}>No tasks yet</li>
        ) : (
          tasks.map((task, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#fff',
                padding: '10px',
                marginBottom: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              <span onClick={() => toggleTask(index)}>{task.text}</span>
              <button
                onClick={() => deleteTask(index)}
                style={{
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;