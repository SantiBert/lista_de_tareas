import React, { useState, useEffect } from 'react';
import { Row } from './components/Row';
import { Banner } from './components/Banner';
import { Creator } from './components/Creator';
import { VisibilityControl } from './components/VisibilityControl';

function App() {
  const [userName, setUserName] = useState("Santi");
  const [taskItems, setTaskItems] = useState([
    { name: "Tarea Uno", done: false },
    { name: "Tarea Dos", done: false },
    { name: "Tarea Tres", done: true },
    { name: "Tarea Cuatro", done: false }
  ]);
  const [showCompleted, setshowCompleted] = useState(true);

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data != null) {
      setTaskItems(JSON.parse(data))
    } else {
      setUserName("Santi");
      setTaskItems([
        { name: "Tarea Uno", done: false },
        { name: "Tarea Dos", done: false },
        { name: "Tarea Tres", done: true },
        { name: "Tarea Cuatro", done: false }
      ]);
      setshowCompleted(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]);


  const createNewTask = taskName => {
    if (!taskItems.find(t => t.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    }
  };

  const toggleTask = task =>
    setTaskItems(
      taskItems.map(t => (t.name === task.name ? { ...t, done: !t.done } : t))
    );

  const taskTableRows = doneValue =>
    taskItems
      .filter(task => task.done === doneValue)
      .map(task => (
        <Row key={task.name} task={task} toggleTask={toggleTask} />
      ));

  return (
    <div>
      <Banner userName={userName} taskItems={taskItems} />
      <div className="container-fluid">
        <Creator callback={createNewTask} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Completado</th>
            </tr>
          </thead>
          <tbody>{taskTableRows(false)}</tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl
            description="Tareas Completadas"
            isChecked={showCompleted}
            callback={checked => setshowCompleted(checked)}
          />
        </div>
        {showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Completado</th>
              </tr>
            </thead>
            <tbody>{taskTableRows(true)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;