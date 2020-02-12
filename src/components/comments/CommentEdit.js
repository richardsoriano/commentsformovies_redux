import React, { Component } from "react";
import Checkbox from "../checkboxes/Checkbox";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextInputGroup from "../layout/TextInputGroup";
import { Link } from "react-router-dom";
import {
  getComment,
  updateComment,
  deleteComment
} from "../../actions/commentActions";

class CommentEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      movieid: "",
      title: "",
      user: "",
      comment_text: "",
      checkboxes: {},
      errors: {}
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  //Delete from CommentEdit page.
  onDeleteClick = id => {
    this.props.deleteComment(id);
    this.props.history.push(`/comments/commentspermovie/${this.state.movieid}`);
  };
  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const {
      id,
      movieid,
      title,
      user,
      comment_text,
      checkboxes
    } = nextProps.comment;

    this.setState({
      id,
      movieid,
      title,
      user,
      comment_text,
      checkboxes
    });
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getComment(id);
  }

  onSubmit = e => {
    e.preventDefault();
    const { id, comment_text, checkboxes, movieid, user, title } = this.state;

    //Check for Errors
    if (title === "") {
      this.setState({ errors: { title: "Title is required" } });
      return;
    }
    if (user === "") {
      this.setState({ errors: { user: "User is required" } });
      return;
    }
    if (comment_text === "") {
      this.setState({ errors: { comment_text: "Comment is required" } });
      return;
    }
    //updComment has updated data in component
    const updComment = {
      id,
      movieid,
      comment_text,
      title,
      user,
      checkboxes,
      opening_poor: checkboxes["opening_poor"],
      premise_poor: checkboxes["premise_poor"],
      character_poor: checkboxes["character_poor"],
      dialogue_poor: checkboxes["dialogue_poor"],

      opening_good: checkboxes["opening_good"],
      premise_good: checkboxes["premise_good"],
      character_good: checkboxes["character_good"],
      dialogue_good: checkboxes["dialogue_good"],

      dude_with_a_problem: checkboxes["dude_with_a_problem"],
      golden_fleece: checkboxes["golden_fleece"],
      buddy_love: checkboxes["buddy_love"],
      institutionalized: checkboxes["institutionalized"],
      superhero: checkboxes["superhero"]
    };

    this.props.updateComment(updComment);
    //Clear fields

    this.setState({
      id,
      movieid,
      title,
      user,
      comment_text,
      checkboxes: [],
      errors: {}
    });
    this.props.history.push(`/comments/commentspermovie/${movieid}`);
  };

  handleCheckboxChange(event) {
    const { name } = event.target;
    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  }
  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      this.setState(prevState => ({
        checkboxes: { ...prevState.checkboxes, [checkbox]: isSelected }
      }));
    });
  };
  selectAll = () => this.selectAllCheckboxes(true);
  deselectAll = () => this.selectAllCheckboxes(false);
  handleTextboxChange = e => this.setState({ [e.target.name]: e.target.value });

  createPoorCheckboxes = () => {
    const { checkboxes } = this.state;
    return (
      <div className="col-sm-4">
        <div>
          <h6>
            <strong>Poor Points</strong>
          </h6>
        </div>
        <Checkbox
          genre_id="opening_poor"
          label="Opening"
          key="opening_poor"
          isSelected={checkboxes["opening_poor"]}
          onCheckboxChange={this.handleCheckboxChange}
        />
        <Checkbox
          genre_id="premise_poor"
          label="Premise"
          key="premise_poor"
          isSelected={checkboxes["premise_poor"]}
          onCheckboxChange={this.handleCheckboxChange}
        />
        <Checkbox
          genre_id="character_poor"
          label="Character"
          key="character_poor"
          isSelected={checkboxes["character_poor"]}
          onCheckboxChange={this.handleCheckboxChange}
        />
        <Checkbox
          genre_id="dialogue_poor"
          label="Dialogue"
          key="dialogue_poor"
          isSelected={checkboxes["dialogue_poor"]}
          onCheckboxChange={this.handleCheckboxChange}
        />
      </div>
    );
  };
  createGoodCheckboxes = () => {
    const { checkboxes } = this.state;
    return (
      <div className="col-sm-4">
        <div>
          <h6>
            <strong>Good Points</strong>
          </h6>
        </div>
        <Checkbox
          genre_id="opening_good"
          label="Opening"
          key="opening_good"
          isSelected={checkboxes["opening_good"]}
          onCheckboxChange={this.handleCheckboxChange}
        />
        <Checkbox
          genre_id="premise_good"
          label="Premise"
          key="premise_good"
          isSelected={checkboxes["premise_good"]}
          onCheckboxChange={this.handleCheckboxChange}
        />
        <Checkbox
          genre_id="character_good"
          label="Character"
          key="character_good"
          isSelected={checkboxes["character_good"]}
          onCheckboxChange={this.handleCheckboxChange}
        />
        <Checkbox
          genre_id="dialogue_good"
          label="Dialogue"
          key="dialogue_good"
          isSelected={checkboxes["dialogue_good"]}
          onCheckboxChange={this.handleCheckboxChange}
        />
      </div>
    );
  };

  createGenreCheckboxes = () => {
    const { checkboxes } = this.state;
    return (
      <div className="col-sm-4">
        <div>
          <h6>
            <strong>Genres</strong>
          </h6>
        </div>
        <Checkbox
          genre_id="dude_with_a_problem"
          label="Dude with a problem"
          key="dude_with_a_problem"
          isSelected={checkboxes["dude_with_a_problem"]}
          onCheckboxChange={this.handleCheckboxChange}
        />
        <Checkbox
          genre_id="golden_fleece"
          label="Golden Fleece"
          key="golden_fleece"
          isSelected={checkboxes["golden_fleece"]}
          onCheckboxChange={this.handleCheckboxChange}
        />
        <Checkbox
          genre_id="buddy_love"
          label="Buddy Love"
          key="buddy_love"
          isSelected={checkboxes["buddy_love"]}
          onCheckboxChange={this.handleCheckboxChange}
        />
        <Checkbox
          genre_id="institutionalized"
          label="Institutionalized"
          key="institutionalized"
          isSelected={checkboxes["institutionalized"]}
          onCheckboxChange={this.handleCheckboxChange}
        />
        <Checkbox
          genre_id="superhero"
          label="Superhero"
          key="superhero"
          isSelected={checkboxes["superhero"]}
          onCheckboxChange={this.handleCheckboxChange}
        />
      </div>
    );
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { title, comment_text, user, checkboxes, id } = this.state;
    const { errors } = this.state;

    return (
      <div>
        <header id="main-header" className="py-2 bg-warning text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="far fa-comments"></i> Comment Edit
                </h1>
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="row">
                      {checkboxes ? this.createGenreCheckboxes() : null}
                      {checkboxes ? this.createPoorCheckboxes() : null}
                      {checkboxes ? this.createGoodCheckboxes() : null}
                      <button
                        type="button"
                        className="btn btn-outline-primary mr-2"
                        onClick={this.selectAll}
                      >
                        {" "}
                        Select All
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary mr-2"
                        onClick={this.deselectAll}
                      >
                        Deselect All
                      </button>
                    </div>
                    <div className="row mt-4"></div>

                    <div className="row">
                      <div className="col-sm-12">
                        <TextInputGroup
                          type="text"
                          name="title"
                          label="Title"
                          value={title}
                          placeHolder="Enter a title"
                          onChange={this.onChange}
                          error={errors.title}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <TextInputGroup
                          type="text"
                          name="user"
                          label="User"
                          value={user}
                          placeHolder="Enter a user"
                          onChange={this.onChange}
                          error={errors.user}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <TextInputGroup
                          type="text"
                          name="comment_text"
                          label="Comment"
                          value={comment_text}
                          placeHolder="Enter a comment"
                          onChange={this.onChange}
                          error={errors.comment_text}
                        />
                      </div>
                    </div>
                    <section id="actions" className="py-4 mb-4 bg-light">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-3">
                            <Link to="/" className="btn btn-light btn-block">
                              <i className="fas fa-arrow-left"></i>Back
                            </Link>
                          </div>
                          <div className="col-md-3">
                            <input
                              className="btn btn-warning btn-block"
                              type="submit"
                            />
                          </div>

                          <div className="col-md-3">
                            <Link
                              to="#"
                              className="btn btn-danger btn-block"
                              onClick={this.onDeleteClick.bind(this, id)}
                            >
                              <i className="far fa-trash-alt"></i>Delete
                            </Link>
                          </div>
                        </div>
                      </div>
                    </section>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentEdit.propTypes = {
  comment: PropTypes.object.isRequired,
  getComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  comment: state.comment.comment
});

export default connect(mapStateToProps, {
  getComment,
  updateComment,
  deleteComment
})(CommentEdit);
