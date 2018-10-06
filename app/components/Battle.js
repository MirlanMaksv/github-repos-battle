import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PlayerPreview from "./PlayerPreview";

class PlayerInput extends Component {
  state = { username: "" };

  handleChange = e =>
    this.setState({
      username: e.target.value
    });

  handleSubmit = e => {
    e.preventDefault();

    const {
      props: { id, onSubmit },
      state: { username }
    } = this;
    onSubmit(id, username);
  };

  render() {
    const { id, label, onSubmit } = this.props;
    const { username } = this.state;
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {label}
        </label>
        <input
          id="username"
          type="text"
          placeholder="github username"
          autoComplete="off"
          value={username}
          onChange={this.handleChange}
        />
        <button className="button" type="submit" disabled={!username}>
          Submit
        </button>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default class Battle extends Component {
  state = {
    playerOneName: "",
    playerTwoName: "",
    playerOneImage: null,
    playerTwoImage: null
  };

  handleSubmit = (id, username) => {
    this.setState((state, props) => {
      let newState = {};
      newState[`${id}Name`] = username;
      newState[`${id}Image`] = `https://github.com/${username}.png?size=200`;

      return newState;
    });
  };

  handleReset = id => {
    this.setState((state, props) => {
      let newState = {};
      newState[`${id}Name`] = "";
      newState[`${id}Image`] = null;

      return newState;
    });
  };

  render() {
    const { playerOneName, playerOneImage, playerTwoName, playerTwoImage } = this.state;

    const playerOne = { id: "playerOne", username: playerOneName, avatar: playerOneImage };
    const playerTwo = { id: "playerTwo", username: playerTwoName, avatar: playerTwoImage };

    let url = this.props.match.url + "/results";

    return (
      <div>
        <div className="row">
          {!playerOneName ? (
            <PlayerInput id={playerOne.id} label="Player One" onSubmit={this.handleSubmit} />
          ) : (
            <PlayerPreview {...playerOne} onReset={this.handleReset}>
              <button className="reset" onClick={() => this.handleReset(playerOne.id)}>
                Reset
              </button>
            </PlayerPreview>
          )}
          {!playerTwoName ? (
            <PlayerInput id={playerTwo.id} label="Player Two" onSubmit={this.handleSubmit} />
          ) : (
            <PlayerPreview {...playerTwo} onReset={this.handleReset}>
              <button className="reset" onClick={() => this.handleReset(playerTwo.id)}>
                Reset
              </button>
            </PlayerPreview>
          )}
        </div>
        {playerOneName &&
          playerTwoName && (
            <Link
              className="button"
              to={{
                pathname: url,
                search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
              }}>
              Battle
            </Link>
          )}
      </div>
    );
  }
}
