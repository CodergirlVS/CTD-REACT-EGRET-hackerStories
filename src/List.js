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
    <li className="item" key={objectID}>
      <span style={{ width: "40%" }}>
        <a href={url}>{title}</a>
      </span>
      <span style={{ width: "30%" }}>{author}</span>
      <span style={{ width: "10%" }}>{num_comments}</span>
      <span style={{ width: "10%" }}>{points}</span>
      <button
        type="button"
        onClick={() => onRemoveStory(objectID)}
        className="button buttonSmall"
      >
        Remove
      </button>
    </li>
  );
};

export default List;
