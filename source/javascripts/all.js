var Header = React.createClass({
  render: function() {
    return (
      <h1 className="title">{this.props.text}</h1>
    );
  }
});

var SearchBar = React.createClass({
  inputSearchHandler: function() {
    this.props.searchHandler(this.refs.searchKey.getDOMNode().value);
  },
  render: function() {
    return (
      <input type="search" className="searchbar" ref="searchKey" onChange={this.inputSearchHandler} /> // When input change, we call the inputSearchHandler
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
  searchHandler: function(key) { //Search handler for Homepage
    console.log("Key: "+key);
  },
  render: function() {
    console.log(this.props.service);
    var employees = this.props.service.getEmployees();
    return (
      <div className="inner-container">
        <Header text="Employee Directory"/>
        <SearchBar searchHandler={this.searchHandler} /> 
        <EmployeeList employees={employees} />
      </div>
    );
  }
});

React.render(
  <HomePage service={employeeService}/>,
  document.getElementById("container")
);
