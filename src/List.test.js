import { render, screen, fireEvent, act } from "@testing-library/react";
import List, { Item } from "./List";
import * as React from "react";

const storyOne = {
  title: "React",
  url: "https://reactjs.org/",
  author: "Jordan Walke",
  num_comments: 3,
  points: 4,
  objectID: 0,
};

describe("Item", () => {
  test("render all properties", () => {
    render(<Item item={storyOne} />);

    screen.debug();
  });
});
