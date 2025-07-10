import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import UsageBlock from "../UsageBlock";

describe("Usage block component", () => {
  it("render usage block title", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <UsageBlock />
      </NextIntlClientProvider>
    );

    // Act
    const blockTitle = screen.getByTestId("usage-block-title");

    // Assert
    expect(blockTitle).toBeInTheDocument();
  });

  it("render all products usage example titles", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <UsageBlock />
      </NextIntlClientProvider>
    );

    // Act
    const exampleTitles = screen.getAllByTestId("usage-item-title");

    // Assert
    expect(exampleTitles).toHaveLength(3);
    exampleTitles.forEach((el) => {
      expect(el).toBeInTheDocument();
    });
  });

  it("render all products usage example text", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <UsageBlock />
      </NextIntlClientProvider>
    );

    // Act
    const exampleText = screen.getAllByTestId("usage-item-text");

    // Assert
    expect(exampleText).toHaveLength(3);
    exampleText.forEach((el) => {
      expect(el).toBeInTheDocument();
    });
  });

  it("render all products usage example images", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <UsageBlock />
      </NextIntlClientProvider>
    );

    // Act
    const exampleImages = screen.getAllByTestId("usage-item-image");

    // Assert
    expect(exampleImages).toHaveLength(3);
    exampleImages.forEach((el) => {
      expect(el).toBeInTheDocument();
      expect(el).toHaveStyle({
        position: "absolute",
        width: "100%",
        height: "100%",
      });
    });
  });
});
