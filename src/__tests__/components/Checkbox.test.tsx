import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkbox from "../../components/Checkbox";

describe("Checkbox component", () => {
  test("renders correctly", () => {
    const handleChange = jest.fn();
    render(
      <Checkbox
        name="test-checkbox"
        label="Test Checkbox"
        checked={false}
        onChange={handleChange}
        indeterminate={false}
      />
    );

    const checkboxInput = screen.getByRole("checkbox", {
      name: "Test Checkbox",
    });
    expect(checkboxInput).toBeInTheDocument();
    expect(checkboxInput).not.toBeChecked();
  });

  test("changes state when clicked", () => {
    const handleChange = jest.fn();
    render(
      <Checkbox
        name="test-checkbox"
        label="Test Checkbox"
        checked={true}
        onChange={handleChange}
        indeterminate={false}
      />
    );

    const checkboxInput = screen.getByRole("checkbox", {
      name: "Test Checkbox",
    });
    fireEvent.click(checkboxInput);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkboxInput).toBeChecked();
  });
});
