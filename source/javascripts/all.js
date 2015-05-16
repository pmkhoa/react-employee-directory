var HelloWorld = React.createClass({
    render: function () {
        return (
            <h1 className="title">{this.props.text}</h1>
        );
    }
});

React.render(
  <HelloWorld text="Hello World" />,
  document.getElementById("container")
);
