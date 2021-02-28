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

    function Task(id, time, title, theClass, priority) {
        this.id = id;
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

            let results;
            try {
                results = await Promise.all([await responses[0].json(), await responses[1].json()]);
            } catch (e) {
                results = [
                    {
                        classes: [
                            ['SOFTENG 301', 'rgb(252, 243, 123)']
                        ]
                    },
                    {
                        tasks: [
                            [1, '2021-01-04', 'SOFTENG 301 lecture', 'SOFTENG 301', '', 0]
                        ]
                    }
                ];
            }

            let newClasses = [];
            results[0].classes.forEach(theClass => {
                newClasses.push(new Class(theClass[0], theClass[1]));
            });
            setClasses(newClasses);

            let newTasks = [];
            results[1].tasks.forEach(task => {
                newTasks.push(new Task(
                    task[0],
                    new Date(task[1]),
                    task[2],
                    newClasses.find(theClass => theClass.name === task[3]),
                    task[5]
                ));
            });
            setTasks(newTasks);
        }

        initializeDate();
    }, []);

    const addTask = async (time, title, theClass, priority) => {
        let res = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({time: time.toISOString().slice(0, 19).replace('T', ' '), title, classId: theClass.name, priority})
        });

        setTasks([...tasks, new Task(
            (await res.json()).data,
            time,
            title,
            theClass,
            priority
        )]);
    };

    const deleteTask = async id => {
        await fetch(`/tasks/${id}`, {
            method: 'DELETE',
        });

        setTasks(tasks.filter(task => task.id !== id));
    };

    const addClass = async (name, color) => {
        await fetch('/classes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, color})
        });

        setClasses([...classes, new Class(name, color)]);
    };

    return (
        <div style={{height: '100vh'}}>
            <Calendar tasks={tasks} classes={classes} taskOperations={{
                addTask,
                deleteTask,
                addClass
            }}/>
        </div>
    );
}

export default App;
