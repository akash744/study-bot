import React from 'react';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

export const TitleBox = () => {
    return (
        <div class="sidebar_element">
            <div>
                <h1 class="logo_name">
                    Study-Bot
                </h1>
            </div>
            <div class="user_profile">
                <img class="user_icon" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="User icon"/>
                <h2 class="username">User name</h2>
            </div>
            
            <div class="nav_buttons">
                <button class="btn"><i class="fa fa-home"></i> Dashboard</button>
                <button class="btn"><i class="fa fa-bars"></i> Calendar</button>
                <button class="btn"><i class="fa fa-trash"></i> Timetable</button>
                <button class="btn"><i class="fa fa-close"></i> Summary</button>
                <button class="btn"><i class="fa fa-folder"></i> Settings</button>
            </div>
            

        </div>
    )
}