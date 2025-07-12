import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import userEvent from "@testing-library/user-event";
import Products from "../page";
import messages from "../../../../../messages/en.json";

jest.mock("@gsap/react");
jest.mock("gsap");
jest.mock("gsap/Draggable");

describe("Products list page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGSAP as jest.Mock).mockImplementation((callback) => {
      callback({});
    });
    const mockAdd = jest.fn((_, cb) => cb());
    (gsap.matchMedia as jest.Mock).mockReturnValue({ add: mockAdd });
  });

  it("render all navigation list", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Products />
      </NextIntlClientProvider>
    );

    // Act
    const navigationsList = screen.getAllByTestId(
      "products-list-page-navigation-item"
    );

    // Assert
    expect(navigationsList).toHaveLength(6);
    navigationsList.forEach((el) => {
      expect(el).toBeInTheDocument();
    });
  });

  it("shoud add active class when each nav item is click", async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Products />
      </NextIntlClientProvider>
    );

    // Act
    const navigationsList = screen.getAllByTestId(
      "products-list-page-navigation-item"
    );

    for (const el of navigationsList) {
      await user.click(el);
      expect(el).toHaveClass("active");
    }
  });

  it("render all image icon in navigation", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Products />
      </NextIntlClientProvider>
    );

    // Act
    const navigationsImages = screen.getAllByTestId(
      "products-list-page-navigation-item-image-icon"
    );

    // Arrange
    expect(navigationsImages).toHaveLength(6);
    for (const el of navigationsImages) {
      expect(el).toBeInTheDocument();
    }
  });

  it("render all text in navigation", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Products />
      </NextIntlClientProvider>
    );

    // Act
    const navigationsText = screen.getAllByTestId(
      "products-list-page-navigation-item-text"
    );

    // Arrange
    expect(navigationsText).toHaveLength(6);
    for (const el of navigationsText) {
      expect(el).toBeInTheDocument();
    }
  });
});
