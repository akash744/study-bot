import './App.css';
import Calendar from './components/calendar/index.js';

export const PRIORITY = {
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW'
}

function App() {
    function Class(name, color) {
        this.name = name;
        this.color = color;
    }
    const classes = [
        new Class('SOFTENG 301', 'rgb(252, 243, 123)'),
        new Class('SOFTENG 325', 'rgb(68, 232, 62)'),
        new Class('SOFTENG 399', 'rgb(62, 189, 232)'),
        new Class('Others', 'rgb(255, 255, 255)'),
    ];

    function Task(time, title, theClass, priority) {
        this.time = time;
        this.title = title;
        this.theClass = theClass;
        this.priority = priority;
    }
    const tasks = [
        new Task(new Date('January 3, 2021'), 'Summer project group meeting', classes[3], PRIORITY.MEDIUM),
        new Task(new Date('January 5, 2021'), 'SOFTENG 301 lecture', classes[0], PRIORITY.MEDIUM),
        new Task(new Date('January 9, 2021'), 'Summer project group meeting', classes[3], PRIORITY.MEDIUM),
        new Task(new Date('January 12, 2021'), 'SOFTENG 301 lecture', classes[0], PRIORITY.MEDIUM),
        new Task(new Date('January 16, 2021'), 'Summer project group meeting', classes[3], PRIORITY.MEDIUM),
        new Task(new Date('January 19, 2021'), 'SOFTENG 301 lecture', classes[0], PRIORITY.MEDIUM),
        new Task(new Date('January 23, 2021'), 'Summer project group meeting', classes[3], PRIORITY.MEDIUM),
        new Task(new Date('January 26, 2021'), 'SOFTENG 301 lecture', classes[0], PRIORITY.MEDIUM),
        new Task(new Date('January 30, 2021'), 'Summer project group meeting', classes[3], PRIORITY.MEDIUM),
        new Task(new Date('February 2, 2021'), 'SOFTENG 301 lecture', classes[0], PRIORITY.MEDIUM),
        new Task(new Date('February 6, 2021'), 'Summer project group meeting', classes[3], PRIORITY.MEDIUM),

        new Task(new Date('January 22, 2021'), 'SOFTENG 325 Assignment 1', classes[1], PRIORITY.HIGH),

        new Task(new Date('January 21, 2021'), 'SOFTENG 399 Assignment 1', classes[2], PRIORITY.HIGH),
    ];

    return (
        <div style={{height: '100vh'}}>
            <Calendar tasks={tasks} classes={classes}/>
        </div>
    );
}

export default App;
