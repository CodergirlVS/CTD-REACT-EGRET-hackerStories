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
  new Promise((resolve, reject) =>
    setTimeout(resolve({ data: { stories: initialStories } }), 2000)
  );

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
  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  React.useEffect(() => {
    dispatchStories({
      type: "STORIES_FETCH_INIT",
    });

    getAsyncStories()
      .then((result) => {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.data.stories,
        });
      })
      .catch(() => dispatchStories({ type: "STORIES_FETCH_FAILURE" }));
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

  const searchStories = stories.data.filter((story) => {
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
      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={searchStories} onRemoveStory={handleRemoveStory} />
      )}

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
