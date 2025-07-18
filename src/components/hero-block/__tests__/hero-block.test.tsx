import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { useGSAP } from "@gsap/react";
import messages from "../../../../messages/en.json";
import HeroBlock from "../HeroBlock";

jest.mock("@gsap/react");
jest.mock("gsap", () => ({
  matchMedia: jest.fn(() => ({
    add: jest.fn().mockReturnThis(),
  })),
  registerPlugin: jest.fn(),
}));

describe("HeroBlock Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGSAP as jest.Mock).mockReturnValue({
      contextSafe: jest.fn(),
    });
  });
  it("renders the title and subtitle correctly", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HeroBlock />
      </NextIntlClientProvider>
    );
    const titleElement = screen.getByText(
      "FROM NEGATIVE-PRESSURE FANS TO GREENHOUSE PADS."
    );
    expect(titleElement).toBeInTheDocument();
    expect(screen.getByTestId("highlighted-text")).toBeInTheDocument();
  });
});
