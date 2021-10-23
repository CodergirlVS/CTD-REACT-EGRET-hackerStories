//import logo from "./logo.svg";
import "./App.css";
//import { getByTitle } from "@testing-library/react";
import List from "./List.js";
import React from "react";
//import Search from "./Search.js";
import InputWithLabel from "./InputWithLabel";

const welcome = {
  greetings: "Hi",
  title: "React",
};

function getTitle(title) {
  return title;
}

const numbers = [1, 2, 3, 4];

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.date.filter((story) => action.payload !== story.objectID),
      };
    default:
      throw new Error();
  }
};

function App() {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "Re");

  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const handleFetchStories = React.useCallback(() => {
    dispatchStories({
      type: "STORIES_FETCH_INIT",
    });

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.hits,
        });
      })
      .catch(() => dispatchStories({ type: "STORIES_FETCH_FAILURE" }));
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (objectID) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: objectID,
    });
    console.log("Remove");
  };

  return (
    <div className="App">
      <h1>My Hacker Stories</h1>
      <span>
        {welcome.greetings} {welcome.title}
      </span>
      <hr />
      <h2>Good{getTitle(" Morning")}</h2>
      {stories.isError && <p>Something went wrong ...</p>}

      {/* <Search search={searchTerm} onSearch={handleSearchInput} /> */}

      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearchInput}
        isFocused
      >
        <strong>Find It:</strong>
      </InputWithLabel>

      <button type="button" disabled={!searchTerm} onClick={handleSearchSubmit}>
        Submit
      </button>

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveStory={handleRemoveStory} />
      )}

      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>

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
