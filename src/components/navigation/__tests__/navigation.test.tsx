import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import Navigation from "@/components/navigation/Navigation";

describe("Navigation Component", () => {
  it("renders the navigation component", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Navigation />
      </NextIntlClientProvider>
    );
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
  });

  it("contains a link to the home page", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Navigation />
      </NextIntlClientProvider>
    );
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  it("contains a link to the about page", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Navigation />
      </NextIntlClientProvider>
    );
    const aboutLink = screen.getByRole("link", { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
  });

  it("contains a link to the usage section", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Navigation />
      </NextIntlClientProvider>
    );
    const contactLink = screen.getByRole("link", { name: /usage/i });
    expect(contactLink).toBeInTheDocument();
  });

  it("contains a link to the products page", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Navigation />
      </NextIntlClientProvider>
    );
    const contactLink = screen.getByRole("link", { name: /products/i });
    expect(contactLink).toBeInTheDocument();
  });

  it("contains a link to the faq section", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Navigation />
      </NextIntlClientProvider>
    );
    const contactLink = screen.getByRole("link", { name: /faq/i });
    expect(contactLink).toBeInTheDocument();
  });
});
