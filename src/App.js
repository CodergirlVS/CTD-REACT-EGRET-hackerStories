//import logo from "./logo.svg";
import React from "react";
//import Search from "./Search.js";
import styles from "./App.module.css";
//import { getByTitle } from "@testing-library/react";
import List from "./List.js";
import InputWithLabel from "./InputWithLabel";
import axios from "axios";
import styled from "styled-components";

const welcome = {
  greetings: "Hi",
  title: "React",
};

function getTitle(title) {
  return title;
}

// const numbers = [1, 2, 3, 4];

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => (
  <form onSubmit={onSearchSubmit} className={styles.searchForm}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      onInputChange={onSearchInput}
      isFocused
    >
      <strong>Find It:</strong>
    </InputWithLabel>

    <button
      type="submit"
      disabled={!searchTerm}
      className={`${styles.button} ${styles.buttonLarge}`}
    >
      Submit
    </button>
  </form>
);

const useSemiPersistentState = (key, initialState) => {
  const isMounted = React.useRef(false);
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      console.log("A");
      localStorage.setItem(key, value);
    }
  }, [value, key]);

  return [value, setValue];
};

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
        data: state.data.filter((story) => action.payload !== story.objectID),
      };
    default:
      throw new Error();
  }
};

const StyledContainer = styled.div`
  height: 100vw;
  padding: 20px;
  background: #83a4d4;
  background: linear-gradient(to left, #b6fbff, #83a4d4);
  color: #171212;
`;
const StyledHeadlinePrimary = styled.h1`
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 2px;
`;

const getSumComments = (stories) => {
  console.log("C");

  return stories.data.reduce((result, value) => result + value.num_comments, 0);
};

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const getUrl = (searchTerm) => `${API_ENDPOINT}${searchTerm}`;

const extractSearchTerm = (url) => url.replace(API_ENDPOINT, "");

const getLastSearches = (urls) => {
  urls
    .reduce((result, url, index) => {
      const searchTerm = extractSearchTerm(url);

      if (index === 0) {
        return result.concat(searchTerm);
      }

      const previousSearchTerm = result[result.length - 1];

      if (searchTerm === previousSearchTerm) {
        return result;
      } else {
        return result.concat(searchTerm);
      }
    }, [])
    .slice(-6)
    .slice(0, -1);
};

function App() {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  const [urls, setUrls] = React.useState([getUrl(searchTerm)]);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (searchTerm) => {
    const url = getUrl(searchTerm);
    setUrls(urls.concat(url));
  };

  const handleSearchSubmit = (event) => {
    handleSearch(searchTerm);

    event.preventDefault();
  };

  const handleLastSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    handleSearch(searchTerm);
  };

  const lastSearches = getLastSearches(urls);

  console.log(lastSearches);

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({
      type: "STORIES_FETCH_INIT",
    });

    try {
      const lastUrl = urls[urls.length - 1];
      const result = await axios.get(lastUrl);

      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [urls]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = React.useCallback((objectID) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: objectID,
    });
  }, []);

  console.log("B.App");

  const sumComments = React.useMemo(() => getSumComments(stories), [stories]);

  return (
    <StyledContainer>
      <StyledHeadlinePrimary>
        My Hacker Stories with {sumComments} comments
      </StyledHeadlinePrimary>
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
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>

      <LastSearches
        lastSearches={lastSearches}
        onLastSearch={handleLastSearch}
      />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveStory={handleRemoveStory} />
      )}

      <hr />
      {/* <ul>
        {numbers.map(function (number) {
          return <li key={number}> {number * 2}</li>;
        })}
      </ul> */}
    </StyledContainer>
  );
}
const LastSearches = ({ lastSearches, onLastSearch }) => (
  <>
    {lastSearches.map((searchTerm, index) => (
      <button
        key={searchTerm + index}
        type="button"
        onClick={() => onLastSearch(searchTerm)}
      >
        {searchTerm}
      </button>
    ))}
  </>
);

export default App;
export { storiesReducer, SearchForm, InputWithLabel };
