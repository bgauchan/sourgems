
var React = require('react');

module.exports = React.createClass({
  handleClick: function(event) {    
    var url = jsonUrl + "/posts?filter[cat]=" + event.target.id ;
    this.props.onUrlChange(url);
  },
  loadCollectionsFromServer: function() {
    jQuery.ajax({
      url: homeUrl + "/wp-json/wp/v2/categories",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCollectionsFromServer();
  },
  render: function() {
    return (
      <ul className="collections">
        <li>
          <h5 onClick={this.handleClick}>COLLECTIONS</h5>
        </li>
        {  
          this.state.data.map(function (collection) {
            return (
              <li key={ collection.id }>
                <span id={ collection.id } onClick={ this.handleClick }>
                  { collection.name }
                </span>
              </li>
            );
          }.bind(this))
        }
      </ul>
    );
  }
});