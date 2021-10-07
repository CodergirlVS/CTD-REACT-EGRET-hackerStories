import React from "react";

const List = ({ list, onRemoveStory }) => {
  return (
    <ul>
      {list.map(function (item) {
        return (
          <Item key={item.objectID} {...item} onRemoveStory={onRemoveStory} />
        );
      })}
    </ul>
  );
};

const Item = ({
  objectID,
  url,
  title,
  author,
  num_comments,
  points,
  onRemoveStory,
}) => {
  return (
    <li key={objectID}>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
      <button type="button" onClick={() => onRemoveStory(objectID)}>
        Remove
      </button>
    </li>
  );
};

export default List;
