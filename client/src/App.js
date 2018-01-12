import React, { Component } from 'react';

import './App.css';
import Header from "./components/Header";
import Content from "./components/Content";
import API from "./utils/API";


class App extends Component {
state={
  articles: []
}
  componentDidMount(){
    API.scrape().then(res => {
      console.log(res.data);
    });

    API.findAll().then(res => {
      this.setState({articles: res.data});
    });

    this.renderArticles();
  }

  save = () =>
  {
    API.save().then(res =>{
      console.log(res.data);
    })
  }

  renderArticles = () =>{
    var articles = this.state.articles.map(element => {
      return (<div className = "row">
      <div className = "col s4">
    </div>
    <div className = "col s4"><div className = "card">
      <h3>{element.title}</h3>
      <a href = {element.link} target="_blank">{element.link}</a>
      <button onClick = {() =>this.save()}>Save</button>
      </div>
    </div>
      <div className = "col s4"></div>
    </div>);
    });
    return articles;
  }
  render() {
    return (
      <div>
        <Header/>
        {this.renderArticles()}

    </div>
    );
  }
}

export default App;
