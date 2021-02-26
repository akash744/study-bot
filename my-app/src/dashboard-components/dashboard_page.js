import React from 'react';
import './dashboard.css';
import Sidebar from '../sidebar-components/sidebar';
import { PageTitle, UserStatistics, UsageHours, CalendarPreview } from './dashboard_content';

const DashboardPage = () => {
    return (
        <div>
            <div class="column">
                <Sidebar />
            </div> 
            <div class="column" id="usage">
                <PageTitle />
                <UsageHours />
            </div>
            <div class="column" id="statistics">
                <CalendarPreview />
                <UserStatistics />
            </div>
        </div>
    )
}

export default DashboardPage;