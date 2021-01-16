import React from 'react';

function Task({task}) {
    const {time, title, theClass} = task;
    return (
        <div style={{backgroundColor: theClass ? theClass.color : undefined}}>
            <p>
                <span>{time.toLocaleString()}</span>
                <br />
                <span>{title}</span>
            </p>
        </div>
    );
}

export default Task;
