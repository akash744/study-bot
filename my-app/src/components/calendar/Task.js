import React from 'react';

function Task({task, onClick}) {
    const {time, title, theClass} = task;
    return (
        <div
            onClick={onClick}
            style={{
                ...styles.container,
                backgroundColor: theClass ? theClass.color : undefined
            }}
        >
            <p>
                <span>{time.toLocaleString()}</span>
                <br />
                <span>{title}</span>
            </p>
        </div>
    );
}

const styles = {
    container: {
        cursor: 'pointer'
    }
};

export default Task;
