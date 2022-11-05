import { render, screen } from "@testing-library/react"
import { Header } from "./header"

test('render header', () => {
    render(<Header />)
    const title = screen.getByText("Hacker News")
    expect(title).toBeInTheDocument()
})