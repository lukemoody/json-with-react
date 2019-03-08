import React, { Component } from 'react';

class MyAjaxCall extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      repos: []
    };
  }

  componentDidMount() {
    /* Fetch data from API */
    fetch("xxxx")
    /* begin accessing JSON data here */
    .then(response => {
      return response.json();
    })
    .then((data) => {
      /* Loop through available data fetched from api */
      for (let i = 0; i < data.length; i++) {
        this.setState({
          isLoaded: true,
          repos: data.map(data => ({
            id: data.id,
            name: data.name,
            url: data.html_url
          }))
        });
        // console.log(data[i].id);
        // console.log(data[i].name);
        // console.log(data[i].url);
      }
    },
    /* Error handling */
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    });
  }
  /* Create function to return data fetched from api */
  renderItems() {
    return this.state.repos.map(data => (
      <li key={data.id}>
        <a href={data.url} target="_blank" rel="noopener noreferrer">{data.name}</a>
      </li>
    ));
  }
  /* Render final results with error and loading results */
  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <h2>JSON with JAVASCRIPT in REACT</h2>
          <p>Data returned from parsed JSON</p>
          <ul className="api-list">{this.renderItems()}</ul>
        </React.Fragment>
      );
    }
  }
}

export default MyAjaxCall;
