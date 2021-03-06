import React, { Component } from 'react';
import marked from 'marked';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      author: '',
      text: ''
    };
    // binding all our functions to this class
    this.deleteComment = this.deleteComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
  }
  updateComment(e) {
    e.preventDefault();
    // brings up the update field when we click on the update link.
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }
  handleCommentUpdate(e) {
    e.preventDefault();
    const id = this.props.uniqueID;
    // if author or text changed, set it. if not, leave null and our PUT request
    // will ignore it.
    const author = (this.state.author) ? this.state.author : null;
    const text = (this.state.text) ? this.state.text : null;
    const comment = { author, text };
    this.props.onCommentUpdate(id, comment);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      author: '',
      text: '',
    });
  }
  deleteComment(e) {
    e.preventDefault();
    const id = this.props.uniqueID;
    this.props.onCommentDelete(id);
    console.log('oops deleted');
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  rawMarkup() {
    const rawMarkup = marked(this.props.children.toString() || '');
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div>
        <h3>{this.props.author}</h3>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <button onClick={this.updateComment}>update</button>
        <button onClick={this.deleteComment}>delete</button>
        { (this.state.toBeUpdated)
            ? (<form onSubmit={this.handleCommentUpdate}>
              <input
                type="text"
                placeholder="Update name..."
                value={this.state.author}
                onChange={this.handleAuthorChange}
              />
              <input
                type="text"
                placeholder="Update your comment..."
                value={this.state.text}
                onChange={this.handleTextChange}
              />
              <input
                type="submit"
                value="Update"
              />
            </form>)
          : null}
      </div>
    );
  }
}

export default Comment;
