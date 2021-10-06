//import logo from "./logo.svg";
import "./App.css";
//import { getByTitle } from "@testing-library/react";
import List from "./List.js";
import React from "react";
import Search from "./Search.js";
import InputWithLabel from "./InputWithLabel";

const welcome = {
  greetings: "Hi",
  title: "React",
};

function getTitle(title) {
  return title;
}

const numbers = [1, 2, 3, 4];

const initialStories = [
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

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const getAsyncStories = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
  );

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "SET_STORIES":
      return action.payload;
    case "REMOVE_STORY":
      return state.filter((story) => action.payload !== story.objectID);
    default:
      throw new Error();
  }
};

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [stories, dispatchStories] = React.useReducer(storiesReducer, []);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);

    getAsyncStories()
      .then((result) => {
        dispatchStories({
          type: "SET_STORIES",
          payload: result.data.stories,
        });
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "R");

  const handleRemoveStory = (objectID) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: objectID,
    });
    console.log("Remove");
  };

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
      {isError && <p>Something went wrong ...</p>}
      {isLoading && <p>Loading ...</p>}

      <Search search={searchTerm} onSearch={handleSearch} />
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
        isFocused
      >
        <strong>Find It:</strong>
      </InputWithLabel>
      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
      <List list={searchStories} onRemoveStory={handleRemoveStory} />
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
