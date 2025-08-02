import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../../messages/en.json";
import AboutUs from "../page";

describe("About us page", () => {
  it("render page title and sub title", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AboutUs />
      </NextIntlClientProvider>
    );

    // Act
    const pageTitle = screen.getByTestId("about-us-page-title");
    const pageSubTitle = screen.getByTestId("about-us-page-sub-title");

    // Assert
    expect(pageTitle).toBeInTheDocument();
    expect(pageSubTitle).toBeInTheDocument();
  });

  it("render text about the company", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AboutUs />
      </NextIntlClientProvider>
    );

    // Act
    const text = screen.getByTestId("about-us-page-text");

    // Assert
    expect(text).toBeInTheDocument();
  });
});
