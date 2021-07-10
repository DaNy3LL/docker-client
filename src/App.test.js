import { render, screen } from "@testing-library/react";
import App from "./App";

it('renders "I am the client"', () => {
	render(<App />);
	const linkElement = screen.getByText(/I am the client/i);
	expect(linkElement).toBeInTheDocument();
});
