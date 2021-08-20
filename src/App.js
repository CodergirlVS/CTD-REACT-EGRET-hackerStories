import logo from './logo.svg';
import './App.css';
import { getByTitle } from '@testing-library/react';

const title = 'React';

const welcome = {
  greetings: "Hi",
  title:'React',
};

function getTitle(title) {
  return title;
};

const numbers = [ 1, 2, 3, 4];

function App() {
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <span>{welcome.greetings} {welcome.title}</span>
      <hr />
      <h2>Good{getTitle(' Morning')}</h2>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
      <ul>
        {numbers.map(function (number) {
          return <li> {number * 2}</li>
        })}
        
      </ul>
    </div>
  );
}

export default App;
