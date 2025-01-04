import Layout from "@/app/layout";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
describe("Layout", () => {
  it("renders navbar", () => {
    render(<Layout>{"content"} </Layout>);
    const navbarTitle = screen.getByText(/Witamy w FreshCart/i);
    expect(navbarTitle).toBeInTheDocument();
    expect(navbarTitle).toBeVisible();
  });
});
