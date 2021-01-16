import React, {useState} from 'react';
import Day from './Day';
import {PRIORITY} from '../../App';
import Task from './Task';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Calendar({tasks, classes}) {
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

    let initialShowingClasses = {};
    classes.forEach(c => {
        initialShowingClasses[c.name] = true;
    });
    const [showingClasses, primitiveSetShowingClasses] = useState(initialShowingClasses);
    const setShowingClasses = c => {
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
            />
        ));
    }

    let priorityEvents = showingTasksBasedOnClassThisMonth.filter(task => task.priority === PRIORITY.HIGH);
    return (
        <div style={styles.container}>
            <div>
                <p>Priority Events</p>
                {priorityEvents.map((priorityEvent, i) => <Task key={priorityEvent.title + i} task={priorityEvent} />)}
            </div>

            <div>
                {classes.map(theClass => {
                    return (
                        <p key={theClass.name}>
                            <input
                                type={'checkbox'}
                                name={'class'}
                                value={theClass.name}
                                checked={showingClasses[theClass.name]}
                                onChange={() => {
                                    setShowingClasses(theClass);
                                }}
                            />
                            <span>{theClass.name}</span>
                        </p>
                    );
                })}
            </div>

            <div style={styles.rightSideColumn}>
                <div>
                    <h2 style={styles.date}>{MONTHS[date.month] + ' ' + date.year}</h2>
                    <button style={styles.changeDateButton} onClick={() => {
                        setDate(previousMonthYear(date));
                    }}>{'<'}</button>
                    <button style={styles.changeDateButton} onClick={() => {
                        setDate(nextMonthYear(date));
                    }}>{'>'}</button>
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
    date: {
        display: 'inline-block',
        width: '300px',
    },
    changeDateButton: {
        marginLeft: '30px',
        padding: '5px 10px'
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
