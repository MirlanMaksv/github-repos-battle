import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import queryString from "query-string";

import PlayerPreview from "./PlayerPreview";
import Loading from "./Loading";
import { battle } from "../utils/api";

const Profile = ({ info }) => {
  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul className="space-list-items">
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && (
          <li>
            <a href="info.blog">{info.blog}</a>
          </li>
        )}
      </ul>
    </PlayerPreview>
  );
};

Profile.propTypes = {
  info: PropTypes.object.isRequired
};

const Player = ({ label, profile, score }) => {
  return (
    <div>
      <h1 className="header">{label}</h1>
      <h3 style={{ textAlign: "center" }}>Score: {score}</h3>
      <Profile info={profile} />
    </div>
  );
};

Player.propTypes = {
  label: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired
};

export default class Results extends Component {
  state = { winner: null, loser: null, error: null, loading: true };

  componentDidMount = () => {
    const { search } = this.props.location;
    const values = queryString.parse(search);

    const { playerOneName, playerTwoName } = values;
    if (playerOneName && playerTwoName) {
      battle([playerOneName, playerTwoName]).then(players => {
        const newState = { loading: false, error: null };
        if (players) {
          const [winner, loser] = players;
          newState.winner = winner;
          newState.loser = loser;
        } else newState.error = "Check if both users exist in Github";

        this.setState(newState);
      });
    }
  };

  render() {
    const { winner, loser, error, loading, players } = this.state;

    if (loading) return <Loading />;

    if (error)
      return (
        <div>
          {error}
          <Link to="/battle">Reset</Link>
        </div>
      );

    return (
      <div className="row">
        <div className="column">
          <Player label={"Winner"} {...winner} />
        </div>
        <div className="column">
          <Player label={"Loser"} {...loser} />
        </div>
      </div>
    );
  }
}
