import {useEffect, useState} from 'react';
import './App.css';
import Calendar from './components/calendar/index.js';

export const PRIORITY = {
    HIGH: -1,
    MEDIUM: 0,
    LOW: 1
}

function App() {
    const [classes, setClasses] = useState([]);
    const [tasks, setTasks] = useState([]);

    function Class(name, color) {
        this.name = name;
        this.color = color;
    }

    function Task(time, title, theClass, priority) {
        this.time = time;
        this.title = title;
        this.theClass = theClass;
        this.priority = priority;
    }

    useEffect(() => {
        async function initializeDate() {
            let responses = await Promise.all([fetch('/classes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }), fetch('/tasks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })]);

            let results = await Promise.all([responses[0].json(), responses[1].json()]);

            let newClasses = [];
            results[0].classes.forEach(theClass => {
                newClasses.push(new Class(theClass[0], theClass[1]));
            });
            setClasses(newClasses);

            console.log(newClasses);
            console.log(results[1].tasks)
            let newTasks = [];
            results[1].tasks.forEach(task => {
                newTasks.push(new Task(new Date(task[1]), task[2], newClasses.find(theClass => theClass.name === task[3]), task[5]));
            });
            setTasks(newTasks);
        }

        initializeDate();
    }, []);

    return (
        <div style={{height: '100vh'}}>
            <Calendar tasks={tasks} classes={classes}/>
        </div>
    );
}

export default App;
