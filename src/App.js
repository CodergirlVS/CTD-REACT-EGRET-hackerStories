//import logo from "./logo.svg";
import "./App.css";
//import { getByTitle } from "@testing-library/react";
import List from "./List.js";
import React from "react";
//import Search from "./Search.js";
import InputWithLabel from "./InputWithLabel";
import axios from "axios";

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

  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  };

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({
      type: "STORIES_FETCH_INIT",
    });

    try {
      const result = await axios.get(url);

      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (objectID) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: objectID,
    });
  };

  const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => (
    <form onSubmit={onSearchSubmit}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={onSearchInput}
        isFocused
      >
        <strong>Find It:</strong>
      </InputWithLabel>

      <button type="submit" disabled={!searchTerm}>
        Submit
      </button>
    </form>
  );

  return (
    <div className="App">
      <h1>My Hacker Stories</h1>
      <span>
        {welcome.greetings} {welcome.title}
      </span>
      <hr />

      <h2>Good{getTitle(" Morning")}</h2>

      {/* <Search search={searchTerm} onSearch={handleSearchInput} /> */}

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

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
