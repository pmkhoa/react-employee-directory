var Header = React.createClass({
  render: function() {
    return (
      <h1 class="title">{this.props.text}</h1>
    );
  }
});

var SearchBar = React.createClass({
  render: function() {
    return (
      <input type="search" class="searchbar" />
    );
  }
});

var EmployeeListItem = React.createClass({
  render: function() {
    return (
      <li>
        <a href={"#employees/" + this.props.employee.id}>
          {this.props.employee.firstName} {this.props.employee.lastName}
        </a>
      </li>
    );
  }
});

var EmployeeList = React.createClass({
  render: function() {
    var items = this.props.employees.map(function (employee) {
      return (
        <EmployeeListItem key={employee.id} employee={employee} />
      );
    });
    return (
      <ul>
        {items}
      </ul>
    );
  }
});

var HomePage = React.createClass({
  render: function() {
    var employees = [
      {firstName: "Khoa", lastName: "Pham"},
      {firstName: "Uyen", lastName: "Phan"},
    ];
    return (
      <div class="inner-container">
        <Header text="Employee Directory"/>
        <SearchBar />
        <EmployeeList employees={employees} />
      </div>
    );
  }
});

React.render(
  <HomePage />,
  document.getElementById("container")
);
