import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import AboutUs from "../AboutUs";

describe("About us component", () => {
  it("render block title and sub title", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AboutUs />
      </NextIntlClientProvider>
    );

    // Act
    const blockTitle = screen.getByTestId("about-us-block-title");
    const blockSubTitle = screen.getByTestId("about-us-block-sub-title");

    // Assert
    expect(blockTitle).toBeInTheDocument();
    expect(blockSubTitle).toBeInTheDocument();
  });

  it("render background image", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AboutUs />
      </NextIntlClientProvider>
    );

    // Act
    const divWithBgImage = screen.getByTestId(
      "about-us-block-background-image"
    );

    // Assert
    expect(divWithBgImage).toBeInTheDocument();
  });

  it("render button with learn more text", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AboutUs />
      </NextIntlClientProvider>
    );

    // Act
    const button = screen.getByTestId("about-us-block-button");

    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Learn more");
  });
});
