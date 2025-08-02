import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import AboutUs from "../AboutUs";

jest.mock("@/i18n/navigation", () => ({
  useRouter: jest.fn(),
}));

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
  it("render about us video", () => {
    // Arrange
    const testSrc =
      "https://res.cloudinary.com/eleven-11/video/upload/v1754138914/ventimax-asset/1267_qn9bq0.mov";
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AboutUs />
      </NextIntlClientProvider>
    );
    // Act
    const video = screen.getByTestId("about-us-video-player");

    // Assert
    expect(video).toBeInTheDocument();
    expect(video).not.toHaveAttribute("controls");
    expect(video).toHaveAttribute("autoPlay");
    expect(video).toHaveAttribute("loop");

    const source = video.querySelector("source");
    expect(source).toHaveAttribute("src", testSrc);
    expect(source).toHaveAttribute("type", "video/mp4");
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
