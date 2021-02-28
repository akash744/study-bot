import React, {useEffect, useState} from 'react';
import Day from './Day';
import {PRIORITY} from '../../App';
import Task from './Task';
import Modal from '../Modal';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Calendar({tasks, classes, taskOperations}) {
    const [date, primitiveSetDate] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    });

    const [monthsLength, setMonthsLength] = useState(
        [31, calculateFebruaryLength(date.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    );

    const setDate = newDate => {
        primitiveSetDate(newDate);

        let newMonthsLength = [...monthsLength];
        newMonthsLength[1] = calculateFebruaryLength(date.year);
        setMonthsLength(newMonthsLength);
    }

    const [focusedTask, setFocusedTask] = useState(null);
    const [isCreatingTask, setIsCreatingTask] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newClass, setNewClass] = useState('');
    const [newPriority, setNewPriority] = useState('');

    let initialShowingClasses = {};
    classes.forEach(c => {
        initialShowingClasses[c.name] = true;
    });
    const [showingClasses, primitiveSetShowingClasses] = useState(initialShowingClasses);
    const toggleShowingClass = c => {
        let newShowingClasses = {
            ...showingClasses,
            [c.name]: !showingClasses[c.name]
        };

        // Check to see if every classes will be unchecked
        let isSomethingShown = false;
        for (let className in newShowingClasses) {
            if (newShowingClasses[className]) {
                isSomethingShown = true;
                break;
            }
        }

        if (!isSomethingShown) {
            for (let className in newShowingClasses) {
                newShowingClasses[className] = true;
            }
        }

        primitiveSetShowingClasses(newShowingClasses);
    }
    useEffect(() => {
        let newShowingClasses = {...showingClasses};
        classes.forEach(thisClass => {
            if (showingClasses[thisClass.name] === undefined) {
                newShowingClasses[thisClass.name] = true;
            }
        });
        primitiveSetShowingClasses(newShowingClasses);
    }, [classes]);

    let showingTasksBasedOnClass = tasks.filter(task => {
        return showingClasses[task.theClass.name];
    });

    let showingTasksBasedOnClassThisMonth = [];

    let days = [];

    const startDayOfMonth = new Date(MONTHS[date.month] + ' 1, ' + date.year).getDay();

    for (let i = 0; i < startDayOfMonth; i++) {
        const {month: previousMonth, year: possiblyPreviousYear} = previousMonthYear(date);
        const previousMonthLength = monthsLength[previousMonth];
        const currentDate = previousMonthLength - startDayOfMonth + 1 + i;
        let todayTasks = getTasks(showingTasksBasedOnClass, currentDate, previousMonth, possiblyPreviousYear);
        showingTasksBasedOnClassThisMonth.push(...todayTasks);
        days.push((
            <Day
                date={currentDate}
                tasks={todayTasks}
                key={`${currentDate} ${previousMonth} ${possiblyPreviousYear}`}
                handleTaskClick={setFocusedTask}
            />
        ));
    }

    for (let i = 0; i < monthsLength[date.month]; i++) {
        let todayTasks = getTasks(showingTasksBasedOnClass, i + 1, date.month, date.year);
        showingTasksBasedOnClassThisMonth.push(...todayTasks);
        days.push((
            <Day
                date={i + 1}
                tasks={todayTasks}
                key={`${i + 1} ${date.month} ${date.year}`}
                handleTaskClick={setFocusedTask}
            />
        ));
    }

    let currentDays = days.length;
    for (let i = 0; i < 7 - currentDays % 7; i++) {
        const {month: nextMonth, year: possiblyNextYear} = nextMonthYear(date);
        let todayTasks = getTasks(showingTasksBasedOnClass, i + 1, nextMonth, possiblyNextYear);
        showingTasksBasedOnClassThisMonth.push(...todayTasks);
        days.push((
            <Day
                date={i + 1}
                tasks={todayTasks}
                key={`${i + 1} ${nextMonth} ${possiblyNextYear}`}
                handleTaskClick={setFocusedTask}
            />
        ));
    }

    let priorityEvents = showingTasksBasedOnClassThisMonth.filter(task => task.priority === PRIORITY.HIGH);
    return (
        <div style={styles.container}>
            <Modal open={focusedTask} closeHandler={() => setFocusedTask(null)}>
                <h2>{focusedTask ? focusedTask.title : null}</h2>
                <p>{focusedTask ? focusedTask.time.toLocaleString() : null}</p>
                <p>{focusedTask ? focusedTask.theClass.name : null}</p>
                <p>Priority: {focusedTask ?
                    Object.keys(PRIORITY).find(key => PRIORITY[key] === focusedTask.priority).toLowerCase() :
                    null}</p>
                <button onClick={async () => {
                    await taskOperations.deleteTask(focusedTask.id);
                    setFocusedTask(null);
                }}>Delete</button>
            </Modal>

            <Modal open={isCreatingTask} closeHandler={() => setIsCreatingTask(false)}>
                <h2>Title</h2>
                <input value={newTitle} onChange={e => setNewTitle(e.target.value)}/>
                <p>Time</p>
                <input type={'datetime-local'} value={newDate} onChange={e => setNewDate(e.target.value)}/>
                <p>Class</p>
                <select onChange={e => {
                    let newClass = classes.find(theClass => theClass.name === e.target.value);
                    setNewClass(newClass);
                }}>
                    <option>---</option>
                    {classes.map(theClass => {
                        return (<option value={theClass.name} key={theClass.name}>{theClass.name}</option>);
                    })}
                </select>
                <p>Priority</p>
                <select onChange={e => {
                    setNewPriority(PRIORITY[e.target.value]);
                }}>
                    <option>---</option>
                    {Object.keys(PRIORITY).map(priority => {
                        return (<option value={priority} key={priority}>{priority}</option>);
                    })}
                </select>
                <br />
                <button onClick={() => {
                    taskOperations.addTask(new Date(newDate), newTitle, newClass, newPriority)
                    .then(() => {
                        setIsCreatingTask(false);
                    });
                }}>Create</button>
            </Modal>

            <div>
                <p>Priority Events</p>
                {priorityEvents.map((priorityEvent, i) => <Task key={priorityEvent.title + i} task={priorityEvent} />)}
            </div>

            <div>
                {classes.map(theClass => {
                    // Has to do this the long way instead of just `showingClasses[theClass.name]`
                    // to remove wawrning "A component is changing an uncontrolled input of type text to be controlled."
                    // The warning happen because there might be a brief moment where `classes` and
                    // `showingClasses` aren't in sync so `showingClasses[theClass.name]` return undefined
                    return (
                        <p key={theClass.name}>
                            <input
                                type={'checkbox'}
                                name={'class'}
                                checked={showingClasses[theClass.name] === undefined ? false : showingClasses[theClass.name]}
                                onChange={() => {
                                    toggleShowingClass(theClass);
                                }}
                            />
                            <span>{theClass.name}</span>
                        </p>
                    );
                })}
            </div>

            <div style={styles.rightSideColumn}>
                <div style={styles.header}>
                    <h2 style={styles.date}>{MONTHS[date.month] + ' ' + date.year}</h2>
                    <button style={styles.changeDateButton} onClick={() => {
                        setDate(previousMonthYear(date));
                    }}>{'<'}</button>
                    <button style={styles.changeDateButton} onClick={() => {
                        setDate(nextMonthYear(date));
                    }}>{'>'}</button>
                    <button style={styles.createTaskButton} onClick={() => setIsCreatingTask(true)}>
                        Create Task
                    </button>
                </div>

                <div style={styles.calendarContainer}>
                    {DAYS.map(day => (
                        <div key={day}>
                            <p>{day}</p>
                        </div>
                    ))}
                    {days}
                </div>
            </div>
        </div>
    );
}

function isLeapYear(year) {
    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}

function calculateFebruaryLength(year) {
    if (isLeapYear(year)) {
        return 29;
    } else {
        return 28;
    }
}

function nextItemIndex(array, currentIndex) {
    return currentIndex + 1 === array.length ? 0 : currentIndex + 1;
}

function previousItemIndex(array, currentIndex) {
    return currentIndex - 1 === -1 ? array.length - 1 : currentIndex - 1;
}

function nextMonthYear({month, year}) {
    let nextMonthIndex = nextItemIndex(MONTHS, month);
    let nextYear;
    if (nextMonthIndex === 0) {
        nextYear = year + 1;
    } else {
        nextYear = year;
    }

    return {
        month: nextMonthIndex,
        year: nextYear
    }
}

function previousMonthYear({month, year}) {
    let previousMonthIndex = previousItemIndex(MONTHS, month);
    let previousYear;
    if (previousMonthIndex === MONTHS.length - 1) {
        previousYear = year - 1;
    } else {
        previousYear = year;
    }

    return {
        month: previousMonthIndex,
        year: previousYear
    }
}

function getTasks(tasks, date, month, year) {
    return tasks.filter(task => {
        return task.time.getDate() === date &&
            task.time.getMonth() === month &&
            task.time.getFullYear() === year;
    });
}

const styles = {
    container: {
        display: 'grid',
        width: '100%',
        height: '100%',
        gridTemplateColumns: '200px 1fr',
        gridTemplateRows: '200px 1fr',
    },
    rightSideColumn: {
        gridColumn: '2',
        gridRow: '1/3',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    date: {
        display: 'inline-block',
        width: '300px',
    },
    changeDateButton: {
        marginLeft: '30px',
        padding: '5px 10px'
    },
    createTaskButton: {
        marginLeft: 'auto'
    },
    calendarContainer: {
        flex: '1',
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gridTemplateRows: '60px',
    },
    title: {
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#61dafb",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    }
};

export default Calendar;
