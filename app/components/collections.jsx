
var React = require('react');

module.exports = React.createClass({
  handleClick: function(event) {  
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
    return {
      activeCollectionID: "", // keeps track of the currently selected collection
      data: []
    };
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
            var activeClassName;

            if(this.state.activeCollectionID == collection.id) {
              activeClassName = "active";
            }

            return (
              <li key={collection.id}>
                <span className={activeClassName} id={collection.id} 
                      name={collection.name} onClick={this.handleClick}>
                  {collection.name}
                </span>
              </li>
            );
          }.bind(this))
        }
      </ul>
    );
  }
});