import React, { Component } from "react";
import API from "../utils/API";
import axios from "axios";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
        }
    }
    submitSearch = event => {
        event.preventDefault();
        let topic = event.target.children[0].children[1].value
        let startYear = event.target.children[1].children[0].children[1].value
        let endYear = event.target.children[1].children[1].children[1].value
        API.getArticles(topic, startYear, endYear)
        .then(res => {
           this.setState({ articles: res.data.response.docs})
        })
    }
    saveArticle = event => {
        event.preventDefault();
        
        let headline = event.target.previousSibling.previousSibling.previousSibling.textContent
        let date = event.target.previousSibling.previousSibling.textContent
        let URL = event.target.previousSibling.textContent
        axios.post('http://localhost:4025/api/articles', {
            headline: headline,
            date: date,
            URL: URL
        })
    }

    render() {
        return (
            <div className="App">
                <h1>
                    NYT Search App
                </h1>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2>Search</h2>
                    </div>
                    <div className="panel-body container">
                        <form id="form" onSubmit={this.submitSearch} >
                            <div className="form-group">
                                <label htmlFor="topicSearch">Topic:</label>
                                <input className="form-control" id="topicSearch" type="text" placeholder="eg. Barack Obama" />
                            </div>
                            <div className="row">
                                <div className="form-group col-xs-6">
                                    <label htmlFor="SYSearch">Start Year:</label>
                                    <input className="form-control" id="SYSearch" type="text" placeholder="eg. 1975" />
                                </div>
                                <div className="form-group col-xs-6">
                                    <label htmlFor="EYSearch">End Year:</label>
                                    <input className="form-control" id="EYSearch" type="text" placeholder="eg. 2018" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <input className="btn btn-success col-xs-offset-2 col-xs-8" type="submit" value="Search" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2>Results</h2>
                    </div>
                    <div className="panel-body">
                        {this.state.articles.map(a => (
                            <div className="panel panel-default" key={a._id}>
                                <a href={a.web_url}><h4>{a.headline.main}</h4></a>
                                <h5>{a.pub_date}</h5>
                                <h5>{a.web_url}</h5>
                                <button className="btn btn-success" onClick={this.saveArticle}>Save</button>
                                <br/><br/>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        )
    }
}




export default Home;