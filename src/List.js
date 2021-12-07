import React from "react";
import styled from "styled-components";
import { ReactComponent as Check } from "./check.svg";
import { sortBy } from "lodash";

const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, "title"),
  AUTHOR: (list) => sortBy(list, "author"),
  COMMENT: (list) => sortBy(list, "num_comments").reverse(),
  POINT: (list) => sortBy(list, "points").reverse(),
};

const List = React.memo(({ list, onRemoveStory }) => {
  const [sort, setSort] = React.useState("NONE");
  const [isReverse, setIsReverse] = React.useState(false);

  const handleSort = (sortKey) => {
    setIsReverse(!isReverse && sort === sortKey);
    setSort(sortKey);
  };
  console.log(sort);
  console.log(isReverse);

  const sortFunction = SORTS[sort];
  const sortedList = isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list);
  console.log("Title is desc sort");

  return (
    console.log("B:List") || (
      <ul>
        <li style={{ display: "flex" }}>
          <span style={{ width: "40%" }}>
            <button type="button" onClick={() => handleSort("TITLE")}>
              Title
            </button>
          </span>
          <span style={{ width: "30%" }}>
            <button type="button" onClick={() => handleSort("AUTHOR")}>
              Author
            </button>
          </span>
          <span style={{ width: "10%" }}>
            <button type="button" onClick={() => handleSort("COMMENT")}>
              Comments
            </button>
          </span>
          <span style={{ width: "10%" }}>
            <button type="button" onClick={() => handleSort("POINT")}>
              Points
            </button>
          </span>
          <span style={{ width: "10%" }}>Actions</span>
        </li>

        {sortedList.map(function (item) {
          return (
            <Item
              key={item.objectID}
              item={item}
              onRemoveStory={onRemoveStory}
            />
          );
        })}
      </ul>
    )
  );
});

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`;
const StyledColumn = styled.span`
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  a {
    color: inherit;
  }
  width: ${(props) => props.width};
`;

const StyledButton = styled.button`
  background: transparent;
  border: 1px solid #171212;
  padding: 5px;
  cursor: pointer;
  transition: all 0.1s ease-in;
  &:hover {
    background: #171212;
    color: #ffffff;
  }
`;

const StyledButtonSmall = styled(StyledButton)`
  padding: 5px;
  &:hover {
    background: #f52112;
    color: #ffffff;
  }
`;

const Item = ({ item, onRemoveStory }) => {
  return (
    <StyledItem>
      <StyledColumn width="40%">
        <a href={item.url}>{item.title}</a>
      </StyledColumn>
      <StyledColumn width="30%">{item.author}</StyledColumn>
      <StyledColumn width="10%">{item.num_comments}</StyledColumn>
      <StyledColumn width="10%">{item.points}</StyledColumn>
      <StyledColumn width="10%">
        <StyledButtonSmall
          type="button"
          onClick={() => onRemoveStory(item.objectID)}
        >
          <Check height="18px" width="18px" />
        </StyledButtonSmall>
      </StyledColumn>
    </StyledItem>
  );
};

export default List;
export { Item };
