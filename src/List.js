import React from "react";
import styled from "styled-components";
import { ReactComponent as Check } from "./check.svg";

const List = React.memo(({ list, onRemoveStory }) => {
  return (
    console.log("B:List") || (
      <ul>
        {list.map(function (item) {
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
