import React, { Component } from "react";

class Saved extends Component {
  constructor() {
    super();
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    this.loadArticles().then(articles => this.setState({ articles }));
  }

  loadArticles = () => {
    return fetch("http://localhost:4025/api/articles").then(res => res.json());
  };

  removeArticle = event => {
    event.preventDefault();
    let deleteID = event.target.parentElement.getAttribute("data-id");
    fetch(`http://localhost:4025/api/articles/${deleteID}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(oldArticleID => {
        let articles = this.state.articles.filter(
          (article, i) => article._id !== oldArticleID
        );
        this.setState({ articles });
      });
  };

  render() {
    return (
      <div className="panel-body">
        {this.state.articles.map(a => (
          <div className="panel panel-default" data-id={a._id} key={a._id}>
            <h5>{a.title}</h5>
            <h5>{a.date}</h5>
            <h5>
              <a href={a.URL} target="_blank">
                {a.URL}
              </a>
            </h5>
            <button className="btn btn-danger" onClick={this.removeArticle}>
              Remove
            </button>
          </div>
        ))}
      </div>
    );
  }
}
export default Saved;
