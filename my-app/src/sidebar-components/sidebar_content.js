import React from 'react';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

export class SideBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isMinimizeOn: false};
  
      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.setState(state => ({
        isMinimizeOn: !state.isMinimizeOn
      }));
    }
  
    render() {
        {if (this.state.isMinimizeOn === false) {
            return (
                <div class="sidebar_element">
                    <div>
                        <div class="minimize_button" onClick={this.handleClick}>
                            <img class="min_icon" src="https://static.thenounproject.com/png/63053-200.png" alt="Minimize icon"></img>
                        </div>
                        <h1 class="logo_name">
                            Study-Bot
                        </h1>
                    </div>
                    <div class="user_profile">
                        <img class="user_icon" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="User icon"/>
                        <h2 class="username">User name</h2>
                    </div>
                    
                    <div class="nav_buttons">
                        <button class="btn"><i class="fa fa-home"></i> DASHBOARD</button>
                        <button class="btn"><i class="fa fa-bars"></i> CALENDAR</button>
                        <button class="btn"><i class="fa fa-trash"></i> TIMETABLE</button>
                        <button class="btn"><i class="fa fa-close"></i> SUMMARY</button>
                        <button class="btn"><i class="fa fa-folder"></i> SETTINGS</button>
                    </div>
                    
        
                </div>
            )
        } else {
            return (
                <div class="sidebar_element_min">
                    <div>
                        <div class="minimize_button" onClick={this.handleClick}>
                            <img class="min_icon" src="https://static.thenounproject.com/png/62723-200.png" alt="Minimize icon"></img>
                        </div>
                    </div>
                    <div class="user_profile">
                        <img class="user_icon_min" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="User icon"/>
                    </div>
                    
                    <div class="nav_buttons_min">
                        <button class="btn_min"><i class="fa fa-home"></i> DB</button>
                        <button class="btn_min"><i class="fa fa-bars"></i> CD</button>
                        <button class="btn_min"><i class="fa fa-trash"></i> TT</button>
                        <button class="btn_min"><i class="fa fa-close"></i> SY</button>
                        <button class="btn_min"><i class="fa fa-folder"></i> ST</button>
                    </div>
                    
        
                </div>
            )
        }}



    }
  }