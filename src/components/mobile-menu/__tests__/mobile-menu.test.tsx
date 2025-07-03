import { render, screen, fireEvent } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import messages from "../../../../messages/en.json";
import MobileMenu from "@/components/mobile-menu/MobileMenu";

jest.mock("@gsap/react");
jest.mock("gsap");

describe("MobileMenu Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useGSAP as jest.Mock).mockImplementation((callback) => {
      callback({});
    });
  });

  it("render with menu closed by default", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <MobileMenu />
      </NextIntlClientProvider>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByTestId("mobile-menu__nav")).not.toHaveClass("open");
  });

  it("toggel isOpen state on button click", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <MobileMenu />
      </NextIntlClientProvider>
    );

    const button = screen.getByRole("button");

    expect(useGSAP).toHaveBeenCalled();

    // Open the menu
    fireEvent.click(button);
    expect(useGSAP).toHaveBeenCalledTimes(2);

    // Close the menu
    fireEvent.click(button);
    expect(useGSAP).toHaveBeenCalledTimes(3);
  });

  it("trigger correct GSAP animations on toggle", () => {
    const mockGsapTo = jest.spyOn(gsap, "to");
    const mockGsapSet = jest.spyOn(gsap, "set");

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <MobileMenu />
      </NextIntlClientProvider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    // Open animation
    expect(mockGsapSet).toHaveBeenCalledWith(expect.anything(), { y: -20 });
    expect(mockGsapTo).toHaveBeenCalledWith(expect.anything(), {
      autoAlpha: 1,
      y: 0,
      duration: 0.25,
    });

    fireEvent.click(button);
    // Close animation
    expect(mockGsapTo).toHaveBeenCalledWith(expect.anything(), {
      autoAlpha: 0,
      y: -20,
      duration: 0.25,
    });
  });

  it("render correct icon based on menu state", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <MobileMenu />
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId("bugger-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("close-icon")).not.toBeInTheDocument();

    const button = screen.getByRole("button");
    fireEvent.click(button);
    // Show close icon and hide bugger icon
    expect(screen.getByTestId("close-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("bugger-icon")).not.toBeInTheDocument();
  });

  it("applies open class when menu is open", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <MobileMenu />
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId("mobile-menu__nav")).not.toHaveClass("open");
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByTestId("mobile-menu__nav")).toHaveClass("open");
  });
});
