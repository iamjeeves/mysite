// USE LET FOR BLOCK SCOPING, CONST TO PREVENT REASSIGNMENT


// DateRow, EventRow, and Event Table compose the list view

const DateRow = React.createClass({
  render: function() {
    const start = new Date(this.props.start);
    return(
      <tr style={ {backgroundColor: "gray"} }>
        <th>{start.toLocaleDateString("en-US")}</th>
        <td></td>
      </tr>
    );
  }
});

const EventRow = React.createClass({
  render: function() {
    const start = new Date(this.props.event.start);
    const end = new Date(this.props.event.end);

    return(
      <tr>
        <td>
          {start.toLocaleTimeString()} - {end.toLocaleTimeString()}
        </td>
        <td>{this.props.event.title}</td>
      </tr>
    );
  }
});

// List view table
const ListTable=React.createClass({
  render: function() {
    const rows = [];

    // Sorts events by json date-strings least to greatest
    this.props.events.sort(function(a, b) {
      return a.start < b.start;
    });

    this.props.events.forEach(function(event) {
      let currDate = null
      if (event.start !== currDate) {
        rows.push(<DateRow start={event.start} key={event.start} />);
        currDate == event.start
      }

      rows.push(<EventRow event={event} key={event.title} />);
    });

    return (
      <table className="table">
        <thead style={ {backgroundColor: "#e3f2fd"} }>
          <tr>
            <th>Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

// HourRow and WeekTable make up the week view.
const HourRow=React.createClass({
  render: function() {
    return(
      <tr>
        <th style={ {backgroundColor: "#F2F3F4" } }>{this.props.hour}</th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );
  }
});

const WeekTable=React.createClass({
  render: function() {
    let rows = [(<HourRow hour="12:00 AM" key="12:00 AM" />)];
    for (let i = 1; i < 12; ++i) {
      rows.push(<HourRow hour={i + ":00 AM"} key={i + ":00 AM"}/>);
    }
    rows.push(<HourRow hour={"12:00 PM"} key={"12:00 PM"}/>);
    for (let i = 1; i < 12; ++i) {
      rows.push(<HourRow hour={i + ":00 AM"} key={i + ":00 PM"} />);
    }

    return(
      <table className="table table-bordered" style={ {backgroundColor: "#EBDEF0"} }>
        <thead>
          <tr style={ {backgroundColor: "#F2F3F4"} }>
            <th></th>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

// Navbar that has 3 buttons which change the content in the 'content' container
const NavigationBar=React.createClass({
  getInitialState: function() {
    return {
      showWeek: true,
      showList: false
    };
  },

  clickWeek: function() {
    this.setState({
      showWeek: true,
      showList: false
    });
  },

  clickList: function() {
    this.setState({
      showWeek: false,
      showList: true
    });
  },

  render: function() {
    const divStyle = {
      height: "100vh",
      overflow: "auto"
    };

    return (
      <div style={divStyle}>
        <nav className="navbar navbar-default">
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={this.clickWeek}>Week</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Month</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={this.clickList}>List</a>
            </li>
          </ul>
        </nav>
          {this.state.showWeek ? <WeekTable /> : null}
          {this.state.showList ? <ListTable events= {this.props.events}/> : null}
      </div>
    );
  }
});

const events = [
    {
        "id": 1,
        "title": "Weed",
        "description": "good kush",
        "lon": 0.0,
        "lat": 0.0,
        "priority": 5,
        "start": "2016-04-20T11:20:00Z",
        "end": "2016-04-20T23:20:00Z",
        "calendar": 1
    },
    {
        "id": 2,
        "title": "Work",
        "description": "Work",
        "lon": 0.0,
        "lat": 0.0,
        "priority": 5,
        "start": "2016-09-06T00:03:00Z",
        "end": "2016-09-06T01:04:00Z",
        "calendar": 1
    }
]

setInterval(function() {
  ReactDOM.render(
    <NavigationBar events={events}/>,
    document.getElementById("content")
  );
}, 500);