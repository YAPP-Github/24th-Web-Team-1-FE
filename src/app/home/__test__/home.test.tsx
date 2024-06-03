import Home from "../page";
import { render, screen } from "@testing-library/react";

describe("<Home />", () => {
  it("renders a heading", () => {
    const { container } = render(<Home />);

    const home = screen.getByText("home");
    const home2 = screen.getByText("home2");

    expect(home).toBeInTheDocument();
    expect(home2).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
