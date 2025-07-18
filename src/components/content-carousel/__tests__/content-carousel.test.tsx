import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { useGSAP } from "@gsap/react";
import messages from "../../../../messages/en.json";
import ContentCarousel from "../ContentCarousel";

jest.mock("@gsap/react");
jest.mock("gsap", () => ({
  matchMedia: jest.fn(() => ({
    add: jest.fn().mockReturnThis(),
  })),
  registerPlugin: jest.fn(),
}));

describe("Content Carousel Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGSAP as jest.Mock).mockReturnValue({
      contextSafe: jest.fn(),
    });
  });
  it("render all CTA buttons", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContentCarousel />
      </NextIntlClientProvider>
    );
    // Act
    const ctaButtons = screen.getAllByTestId("cta-button");
    // Assert
    expect(ctaButtons).toBeDefined();
  });

  it("render all images", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContentCarousel />
      </NextIntlClientProvider>
    );

    // Act
    const images = screen.getAllByTestId("carousel-image");

    // Assert
    expect(images).toBeDefined();
  });

  it("render carousel control buttons", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContentCarousel />
      </NextIntlClientProvider>
    );

    // Act
    const leftButton = screen.getByTestId("carousel-button-left");
    const rightButton = screen.getByTestId("carousel-button-right");

    // Assert
    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
  });

  it("render all carousel details title", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContentCarousel />
      </NextIntlClientProvider>
    );

    // Act
    const detailsTitle = screen.getAllByTestId("carousel-details-title");

    // Assert
    expect(detailsTitle).toBeDefined();
  });

  it("render all carousel details highlight", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContentCarousel />
      </NextIntlClientProvider>
    );

    // Act
    const detailsHighlight = screen.getAllByTestId(
      "carousel-details-highlight"
    );

    // Assert
    expect(detailsHighlight).toBeDefined();
  });

  it("call contextSafe from useGSAP when control buttons are clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    const mockContextSafe = (useGSAP as jest.Mock).mockReturnValue({
      contextSafe: jest.fn(),
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContentCarousel />
      </NextIntlClientProvider>
    );

    // Act
    const leftButton = screen.getByTestId("carousel-button-left");
    const rightButton = screen.getByTestId("carousel-button-right");

    // Assert
    await user.click(rightButton);
    expect(mockContextSafe).toHaveBeenCalledTimes(1);

    await user.click(leftButton);
    expect(mockContextSafe).toHaveBeenCalledTimes(1);
  });
});
