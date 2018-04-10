import React, { Component } from "react";
import "../App.css";
import axios from "axios";

class Saved extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      updateNote: false,
      insertNoteId: "",
      insertNoteHeadline: "",
      insertNoteURL: "",
      insertNoteDate: ""
    };
  }

  componentDidMount() {
    this.loadArticles().then(articles => this.setState({ articles }));
  }

  loadArticles = () => {
    return fetch("http://localhost:4025/api/articles").then(res => res.json());
  };

  findArticle = id => {
      return fetch(`http://localhost:4025/api/articles/${id}`).then(res => res.json());
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

  loadNoteForm = id => {
    this.setState({ updateNote: true }, () => {
      this.setState({
        insertNoteId: id
      });

      let form = document.querySelector("#noteForm");

      let input = form.children[0];

        this.findArticle(id).then(res => input.value = (res[0].notes.length===0 ? "" : res[0].notes[res[0].notes.length-1])) //so last note shows up in input when the note form loads;
    });
  };

  cancelNoteForm = event => {
    event.preventDefault();
    this.setState({ updateNote: false });
  };

  insertNote = event => {
    // event.preventDefault();

    let notes = event.target.children[0].value;
    let id = event.target.children[1].value;

    axios
        .put(`http://localhost:4025/api/articles/${id}`, {
        notes: notes
      })
      .then(res => console.log(res));
    //   .then(res => {
    //     let articles = this.state.articles.map(a => {
    //       if (a._id !== id) return a;
    //       else return res;
    //     });
    // this.setState({ articles });
    //   });

    // fetch(`http://localhost:4025/api/articles/note/${id}`, {
    //   method: "PUT",
    //   body: { test: "test" }
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log("line 71", res);
    //     let articles = this.state.articles.map(a => {
    //       if (a._id !== id) return a;
    //         else return res;
    //     });
    //     this.setState({ articles });
    //   });
  };

  render() {
    return (
      <div className="container">
        <div id="left">
          <div className="panel-body">
            {this.state.articles.map(a => (
              <div className="panel panel-default" data-id={a._id} key={a._id}>
                            <a target="_blank" href={a.web_url}>
                                <h4>{a.title}</h4>
                            </a>
                <h5>{a.date}</h5>
                <h5>
                  <a href={a.URL} target="_blank">
                    {a.URL}
                  </a>
                </h5>
                <h5>Notes: 
                {a.notes.length > 0 ? <ul>
                {a.notes.map((n, i) => (<li key={i}>{n}</li>))} 
                </ul> : " No notes yet!"}</h5>
               
                <button className="btn btn-danger" onClick={this.removeArticle}>
                  Remove
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => this.loadNoteForm(a._id)}
                >
                  Add Note
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* load Notes section here:  */}
        <div id="right">
          {this.state.updateNote && (
            <div>
              <form id="noteForm" onSubmit={this.insertNote}>
                <input type="text"/>
                {/* <textarea name="notes" rows="5" cols="30">
                  Hello
                </textarea>  */}
                <input type="hidden" value={this.state.insertNoteId} />
                <br />
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Save Note"
                />
                <button className="btn btn-light" onClick={this.cancelNoteForm}>
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Saved;
