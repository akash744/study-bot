import React from 'react';

export const PageTitle = () => {
    return (
        <div>
            <h1 class="logo">
                Dashboard
            </h1>
        </div>
    )
}

const WeekHours = () => {
    return (
        <div class="usage_data">
            <h2 class="graph_title">
                Weekly productive hours graph
            </h2>
            <img class="data_graph" src="https://blogs-images.forbes.com/niallmccarthy/files/2015/10/20151020_working_hours_FO.jpg"
                alt="Weekly productive hours graph display" />
        </div>
    )
}

const MonthHours = () => {
    return (
        <div class="usage_data">
            <h2 class="graph_title">
                Monthly productive hours graph
            </h2>
            <img class="data_graph" src="https://blogs-images.forbes.com/niallmccarthy/files/2015/10/20151020_working_hours_FO.jpg"
                alt="Monthly productive hours graph display" />
        </div>
    )
}

export const UsageHours = () => {
    return (
        <div class="usage_data_contents">
            <WeekHours />
            <MonthHours />
        </div>
    )
}

export const CalendarPreview = () => {
    return (
        <div class="calendar_preview">
            <h3>Calendar goes here!</h3>
        </div>
    )
}

export const UserStatistics = () => {
    return (
        <div>
            <div class="study_time_stats">
                <h3>Study time stats</h3>
            </div>
            <div class="activities_due">
                <h3>Activities due today</h3>
            </div>
            <div class="miscellaneous_items">
                <h3>Miscellaneous items</h3>
            </div>
        </div>
    )
}
