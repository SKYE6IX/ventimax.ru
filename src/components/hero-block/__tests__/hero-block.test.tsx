import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import HeroBlock from "../HeroBlock";

describe("HeroBlock Component", () => {
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
