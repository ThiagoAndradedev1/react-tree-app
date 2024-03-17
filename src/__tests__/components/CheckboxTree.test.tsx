import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import CheckboxTree from "../../components/CheckboxTree";

const data = [
  { id: "1", name: "Node 1", level: 0, expanded: false },
  { id: "2", name: "Node 2", level: 1, expanded: false },
  { id: "3", name: "Node 3", level: 1, expanded: false },
];

describe("CheckboxTree component", () => {
  it("should render tree nodes correctly", () => {
    const { getByText } = render(<CheckboxTree data={data} />);

    expect(getByText("Node 1")).toBeInTheDocument();
    expect(getByText("Node 2")).toBeInTheDocument();
    expect(getByText("Node 3")).toBeInTheDocument();
  });

  it("should check/uncheck the checkbox when clicked", () => {
    const { getByText } = render(<CheckboxTree data={data} />);

    const checkbox = getByText("Node 1")
      ?.previousSibling as HTMLInputElement | null;
    expect(checkbox).toBeInTheDocument();
    if (checkbox) {
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    }
  });

  it("should expand/collapse the tree node when button is clicked", () => {
    const { getByText, queryByText } = render(<CheckboxTree data={data} />);

    const button = getByText("+");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(queryByText("Node 2")).toBeInTheDocument();
    expect(queryByText("Node 3")).toBeInTheDocument();
  });
});
