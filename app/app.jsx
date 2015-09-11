var React = require('react');

var HomePage = React.createClass({
  render: function () {
    return (
      <div>
          <h1>YOLO</h1>
      </div>
    );
  }
});

React.render(
    <HomePage />,
    document.getElementById('main')
);
