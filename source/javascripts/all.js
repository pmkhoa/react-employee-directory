var Header = React.createClass({
  render: function() {
    return (
      <header className="bar bar-nav">
        <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back === "true" ? "" : " hidden")}></a>
        <h1 className="title">{this.props.text}</h1>
      </header>
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
  // When input change, we call the inputSearchHandler
    return (
      <div className="bar bar-standar bar-header-secondary">
        <input type="search" className="searchbar" ref="searchKey" onChange={this.inputSearchHandler} />
      </div>
    );
  }
});

var EmployeeListItem = React.createClass({
  render: function() {
    return (
      <li className="table-view-cell media">
        <a href={"#employees/" + this.props.employee.id}>
          <img className="media-object small pull-left" src={"images/pics/" + this.props.employee.firstName + "_" + this.props.employee.lastName + ".jpg"} />
          {this.props.employee.firstName} {this.props.employee.lastName}
          <p>{this.props.employee.title}</p>
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
      <ul className="table-view">
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
        <Header text="Employee Directory" back="false"/>
        <SearchBar searchHandler={this.searchHandler} /> 
        <div className="content">
          <EmployeeList employees={this.state.employees} />
        </div>
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
        <Header text="Employee Details" back="true"/>
        <div className="card">
          <ul className="table-view">
            <li className="table-view-cell media">
              <img className="media-object small pull-left" src={"images/pics/" + this.state.employee.firstName + "_" + this.state.employee.lastName + ".jpg"} />
              {this.state.employee.firstName} {this.state.employee.lastName}
              <p>{this.state.employee.title}</p>
            </li>

            <li className="table-view-cell media">
              <a href={"tel:" + this.state.employee.officePhone} className="push-right">
                <span className="media-object pull-left icon icon-call"></span>
                <div className="media-body">
                  Call Office
                  <p>{this.state.employee.officePhone}</p>
                </div>
              </a>
            </li>
            <li className="table-view-cell media">
              <a href={"tel:" + this.state.employee.mobilePhone} className="push-right">
                <span className="media-object pull-left icon icon-call"></span>
                <div className="media-body">
                  Call Mobile
                  <p>{this.state.employee.mobilePhone}</p>
                </div>
              </a>
            </li>
            <li className="table-view-cell media">
              <a href={"sms:" + this.state.employee.mobilePhone} className="push-right">
                <span className="media-object pull-left icon icon-sms"></span>
                <div className="media-body">
                  SMS
                  <p>{this.state.employee.mobilePhone}</p>
                </div>
              </a>
            </li>
            <li className="table-view-cell media">
              <a href={"mailto:" + this.state.employee.email} className="push-right">
                <span className="media-object pull-left icon icon-email"></span>
                <div className="media-body">
                  Email
                  <p>{this.state.employee.email}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
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
