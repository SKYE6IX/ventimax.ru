import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import FeaturedProducts from "../FeaturedProducts";

describe("Featured product components", () => {
  it("render block title", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FeaturedProducts />
      </NextIntlClientProvider>
    );

    // Act
    const title = screen.getByTestId("featured-block-title");

    // Assert
    expect(title).toBeInTheDocument();
  });

  it("render button", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FeaturedProducts />
      </NextIntlClientProvider>
    );

    // Act
    const button = screen.getByTestId("featured-block-button");

    // Assert
    expect(button).toBeInTheDocument();
  });
});
