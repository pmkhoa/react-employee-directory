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

var EmployeeList = React.createClass({
  render: function() {
    return (
      <ul>
        <li>Khoa Pham</li>
        <li>Uyen Phan</li>
      </ul>
    );
  }
});

var HomePage = React.createClass({
  render: function() {
    return (
      <div class="inner-container">
        <Header text="Employee Directory"/>
        <SearchBar />
        <EmployeeList />
      </div>
    );
  }
});

React.render(
  <HomePage />,
  document.getElementById("container")
);
