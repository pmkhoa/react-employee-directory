var Header = React.createClass({
  render: function() {
    return (
      <h1 className="title">{this.props.text}</h1>
    );
  }
});

var SearchFor = React.createClass({
  render: function() {
    return (
      <h3>Search for: {this.props.searchKey}</h3>
    )
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
  getInitialState: function() {
    return { employees: this.props.service.getEmployees() }
  },

  searchHandler: function(key) { //Search handler for Homepage
    this.props.service.findByName(key).done(function(result) {
      this.setState({searchKey: key, employees: result});
    }.bind(this)); // bind this (just for binding this variable to its parent)
  },

  render: function() {
    return (
      <div className="inner-container">
        <Header text="Employee Directory" />
        <SearchFor searchKey={this.state.searchKey} />
        <SearchBar searchHandler={this.searchHandler} /> 
        <EmployeeList employees={this.state.employees} />
      </div>
    );
  }
});

var EmployeePage = React.createClass({
  getInitialState: function() {
    return { employee: {} };
  },

  componentDidMount: function() {
    console.log(this.props.employeeId);
    this.props.service.findById(this.props.employeeId).done(function(result) {
      this.setState({employee: result});
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <Header text="Employee Details" />
        <h3>{this.state.employee.firstName} {this.state.employee.lastName}</h3>
        <p>{this.state.employee.title}</p>
      </div>
    )
  }
});


router.addRoute('', function() {
  React.render(
    <HomePage service={employeeService}/>,
    document.getElementById("container")
  );
});

router.addRoute('employees/:id', function(id) {
  React.render(
    <EmployeePage employeeId={id} service={employeeService} />,
    document.getElementById("container")
  );
});

router.start();
