import React, { useState } from 'react';

export const Creator = props => {

    const [newTaskName, setnewTaskName] = useState('');

    const updateNewTask = e => setnewTaskName(e.target.value);

    const createNewTask = () => {
        props.callback(newTaskName);
        setnewTaskName('');
    }

    return (
        <div className="my-1">
            <input type="text"
                className="form-control"
                value={newTaskName}
                onChange={updateNewTask}
            />
            <button className="btn btn-primary mt-1" onClick={createNewTask}>
                Agregar nueva tarea.
            </button>
        </div>
    )
}