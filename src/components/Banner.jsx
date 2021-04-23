import React from 'react';

export const Banner = props => (
    <h4 className="bg-primary text-white text-center p-4">
        Aplicacion de tareas de {props.userName} (Tareas pendientes: {props.taskItems.filter(i => !i.done).length})
    </h4>
)