import React from 'react';
import Task from './Task';

function Day({date, tasks = [], handleTaskClick}) {
    return (
        <div style={styles.container}>
            <p style={styles.date}>{date}</p>
            {tasks.map((task, i) => <Task key={i} task={task} onClick={() => handleTaskClick(task)}/>)}
        </div>
    );
}

const styles = {
    container: {
        overflowY: 'auto',
        backgroundColor: 'rgb(233, 229, 229)',
        border: '1px solid rgb(0, 0, 0)'
    },
    date: {
        fontSize: '13px',
        margin: '0px'
    }
};

export default Day;
