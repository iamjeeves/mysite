var DateRow = React.createClass({
  render: function() {
    var start = new Date(this.props.start);
    return(
      <tr style={ {backgroundColor: "gray"} }>
        <th>{start.toLocaleDateString("en-US")}</th>
        <td></td>
      </tr>
    );
  }
});

var EventRow = React.createClass({
  render: function() {
    var start = new Date(this.props.event.start);
    var end = new Date(this.props.event.end);


    return(
      <tr>
        <td>
          {start.toLocaleTimeString()}-{end.toLocaleTimeString()}
        </td>
        <td>{this.props.event.title}</td>
      </tr>
    );
  }
});

// Table that lists events
var EventTable=React.createClass({
  render: function() {
    var rows = []

    this.props.events.sort(function(a, b) {
      return a.start < b.start;
    });

    this.props.events.forEach(function(event) {
      var currDate = null
      if (event.start !== currDate) {
        rows.push(<DateRow start={event.start} key={event.start} />);
        currDate == event.start
      }

      rows.push(<EventRow event={event} key={event.title} />);
    });

    var theadStyle = {
      backgroundColor: "#e3f2fd"
    };

    return (
      <table className="table">
        <thead style={theadStyle}>
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

var NavigationBar=React.createClass({
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Week</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Month</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">List</a>
            </li>
          </ul>
        </nav>
        <EventTable events={this.props.events}/>
      </div>
    );
  }
});

var events = [
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
    document.getElementById('content')
  );
}, 500);