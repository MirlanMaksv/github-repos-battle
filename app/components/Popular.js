import React from "react";
import { string, func, array } from "prop-types";
import { fetchPopularRepos } from "../utils/api";

import Loading from "./Loading";

const SelectLanguage = ({ selectedLanguage, onSelect }) => {
  const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];

  return (
    <ul className="languages">
      {languages.map(lang => {
        const itemClass = lang === selectedLanguage ? "activeItem" : "";

        return (
          <li className={itemClass} key={lang} onClick={() => onSelect(lang)}>
            {lang}
          </li>
        );
      })}
    </ul>
  );
};

SelectLanguage.propTypes = {
  selectedLanguage: string.isRequired,
  onSelect: func.isRequired
};

const ReposGrid = ({ repos }) => {
  return (
    <ul className="popular-list">
      {repos.map((repo, index) => (
        <li key={repo.name} className="popular-item">
          <div className="popular-rank">#{index + 1}</div>
          <ul className="space-list-item">
            <li>
              <img
                src={repo.owner.avatar_url}
                alt={`Avatar for ${repo.owner.login}`}
                className="avatar"
              />
            </li>
            <li>
              <a href={repo.html_url}>{repo.name}</a>
            </li>
            <li>@{repo.owner.login}</li>
            <li>{repo.stargazers_count} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  );
};

ReposGrid.propTypes = {
  repos: array.isRequired
};

class Popular extends React.Component {
  state = {
    selectedLanguage: "All",
    repos: null
  };

  componentDidMount = () => {
    this.updateLanguage(this.state.selectedLanguage);
  };

  updateLanguage = lang => {
    this.setState({ selectedLanguage: lang, repos: null });
    fetchPopularRepos(lang).then(repos => this.setState({ repos }));
  };

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {this.state.repos ? <ReposGrid repos={this.state.repos} /> : <Loading text={"Loading"} />}
      </div>
    );
  }
}

export default Popular;
