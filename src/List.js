import React from "react";

const List = ({ list }) => {
  return (
    <ul>
      {list.map(function (item) {
        return <Item {...item} />;
      })}
    </ul>
  );
};

const Item = ({ objectID, url, title, author, num_comments, points }) => {
  return (
    <li key={objectID}>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
    </li>
  );
};

export default List;
