import logo from "./logo.svg";
import "./App.css";
import { getByTitle } from "@testing-library/react";
import List from "./List.js";
import React from "react";
import Search from "./Search.js";

const welcome = {
  greetings: "Hi",
  title: "React",
};

function getTitle(title) {
  return title;
}

const numbers = [1, 2, 3, 4];

const stories = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function App() {
  const useSemiPersistentState = (initialState) => {
    const [searchTerm, setSearchTerm] = React.useState(
      localStorage.getItem("search") || initialState
    );
    React.useEffect(() => {
      localStorage.setItem("search", searchTerm);
    }, [searchTerm]);

    return searchTerm, setSearchTerm;
  };

  const [searchTerm, setSearchTerm] = useSemiPersistentState("React");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="App">
      <h1>My Hacker Stories</h1>
      <span>
        {welcome.greetings} {welcome.title}
      </span>
      <hr />
      <h2>Good{getTitle(" Morning")}</h2>

      <Search search={searchTerm} onSearch={handleSearch} />
      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>

      <List list={searchStories} />

      <hr />
      <ul>
        {numbers.map(function (number) {
          return <li> {number * 2}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
