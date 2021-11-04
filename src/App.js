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

// const useSemiPersistentState = (key, initialState) => {
//   const [value, setValue] = React.useState(
//     localStorage.getItem(key) || initialState
//   );
//   React.useEffect(() => {
//     localStorage.setItem(key, value);
//   }, [value, key]);

//   return [value, setValue];
// };

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

// const storiesReducer = (state, action) => {
//   switch (action.type) {
//     case "STORIES_FETCH_INIT":
//       return {
//         ...state,
//         isLoading: true,
//         isError: false,
//       };
//     case "STORIES_FETCH_SUCCESS":
//       return {
//         ...state,
//         data: action.payload,
//         isLoading: false,
//         isError: false,
//       };
//     case "STORIES_FETCH_FAILURE":
//       return {
//         ...state,
//         isLoading: false,
//         isError: true,
//       };
//     case "REMOVE_STORY":
//       return {
//         ...state,
//         data: state.date.filter((story) => action.payload !== story.objectID),
//       };
//     default:
//       throw new Error();
//   }
// };

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "React",
      isLoading: false,
      isError: false,
      data: [],
      //url: `${API_ENDPOINT}${searchTerm}`,
    };
  }

  handleRemoveStory = (objectID) => {
    return {
      ...this.state.data,
      this.state.date.filter((story) => action.payload !== story.objectID),
    };
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div className="App">
        <h1>My Hacker Stories</h1>
        <span>
          {welcome.greetings} {welcome.title}
        </span>
        <hr />
        <h2>Good{getTitle(" Morning")}</h2>
        <ul>
          {numbers.map(function (number) {
            return <li> {number * 2}</li>;
          })}
        </ul>
        <hr />

        {this.state.isError && <p>Something went wrong ...</p>}
        {this.state.isLoading ? (
          <p>Loading ...</p>
        ) : (
          <List list={this.state.data} onRemoveStory={this.handleRemoveStory} />
        )}
        <SearchForm
          searchTerm={searchTerm}
          onSearchInput={(event) =>
            this.setState({ searchTerm: event.target.value })
          }
          //onSearchSubmit={() => this.setState.url
        />
        <p>
          Searching for <strong>{searchTerm}</strong>.
        </p>
        <hr />
        
      </div>
    );
  }
}

export default App;

// const [stories, dispatchStories] = React.useReducer(storiesReducer, {
//   data: [],
//   isLoading: false,
//   isError: false,
// });

// const handleFetchStories = React.useCallback(async () => {
//   dispatchStories({
//     type: "STORIES_FETCH_INIT",
//   });

//   try {
//     const result = await axios.get(url);

//     dispatchStories({
//       type: "STORIES_FETCH_SUCCESS",
//       payload: result.data.hits,
//     });
//   } catch {
//     dispatchStories({ type: "STORIES_FETCH_FAILURE" });
//   }
// }, [url]);

// React.useEffect(() => {
//   handleFetchStories();
// }, [handleFetchStories]);

// const handleRemoveStory = (objectID) => {
//   dispatchStories({
//     type: "REMOVE_STORY",
//     payload: objectID,
//   });
// };

//const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => (
//     <form onSubmit={onSearchSubmit}>
//       <InputWithLabel
//         id="search"
//         value={searchTerm}
//         onInputChange={onSearchInput}
//         isFocused
//       >
//         <strong>Find It:</strong>
//       </InputWithLabel>

//       <button type="submit" disabled={!searchTerm}>
//         Submit
//       </button>
//     </form>
//   );

//   return (

//       <SearchForm
//         searchTerm={searchTerm}
//         onSearchInput={handleSearchInput}
//         onSearchSubmit={handleSearchSubmit}
//       />

//       <hr />

//       {stories.isError && <p>Something went wrong ...</p>}

//       {stories.isLoading ? (
//         <p>Loading ...</p>
//       ) : (
//         <List list={stories.data} onRemoveStory={handleRemoveStory} />
//       )}

//     </div>
//   );
// }
