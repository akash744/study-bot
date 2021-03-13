import {useEffect, useRef, useState} from 'react';
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

    // id is introduced to distinguish the normal class (where name equals id)
    // from no class (where id is null)
    function Class(name, color, id = name) {
        this.name = name;
        this.color = color;
        this.id = id;
    }
    const classNull = useRef(new Class('Others', '#aaaaaa', null)).current;

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

            let newClasses = [classNull];
            results[0].classes.forEach(theClass => {
                newClasses.push(new Class(theClass[0], theClass[1]));
            });
            setClasses(newClasses);

            let newTasks = [];
            results[1].tasks.forEach(task => {
                let theClass = task[3] ?
                    newClasses.find(theClass => theClass.name === task[3]) :
                    classNull;
                newTasks.push(new Task(
                    task[0],
                    new Date(task[1]),
                    task[2],
                    theClass,
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
            body: JSON.stringify({time: time.toISOString().slice(0, 19).replace('T', ' '), title, classId: theClass.id, priority})
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

    const deleteClass = async id => {
        await fetch(`/classes/${id}`, {
            method: 'DELETE',
        });

        setClasses(classes.filter(currentClass => currentClass.id !== id));
        setTasks(tasks.map(task => {
            if (task.theClass.id === id) {
                return new Task(task.id, task.time, task.title, classNull, task.priority);
            }
            return task;
        }));
    };

    return (
        <div style={{height: '100vh'}}>
            <Calendar tasks={tasks} classes={classes} taskOperations={{
                addTask,
                deleteTask,
                addClass,
                deleteClass,
            }}/>
        </div>
    );
}

export default App;
