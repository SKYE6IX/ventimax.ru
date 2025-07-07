import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import IntroBlock from "../IntroBlock";

describe("intro block component", () => {
  it("render title and sub-title", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <IntroBlock />
      </NextIntlClientProvider>
    );

    // Act
    const title = screen.getByRole("heading", { level: 1 });
    const subTitle = screen.getByRole("heading", { level: 2 });

    // Assert
    expect(title).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
  });

  it("render CTA button", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <IntroBlock />
      </NextIntlClientProvider>
    );

    // Act
    const button = screen.getByTestId("cta-button");

    // Assert
    expect(button).toBeInTheDocument();
  });

  it("render video player and correct attribute", () => {
    // Arrange
    const testSrc = "/products-intro/intro.mp4";
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <IntroBlock />
      </NextIntlClientProvider>
    );

    // Act
    const video = screen.getByTestId("video-player");

    // Assert
    expect(video).toBeInTheDocument();
    expect(video).not.toHaveAttribute("controls");
    expect(video).toHaveAttribute("autoPlay");
    expect(video).toHaveAttribute("loop");

    const source = video.querySelector("source");
    expect(source).toHaveAttribute("src", testSrc);
    expect(source).toHaveAttribute("type", "video/mp4");
  });
});
