import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import Footer from "../Footer";

describe("Footer component", () => {
  it("render company intro text", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>
    );

    // Act
    const introText = screen.getByTestId("footer-company-intro");

    // Assert
    expect(introText).toBeInTheDocument();
  });

  it("render link and contact title", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>
    );

    // Act
    const linkTitle = screen.getByTestId("footer-link-title");
    const contactTitle = screen.getByTestId("footer-contact-title");

    // Assert
    expect(linkTitle).toBeInTheDocument();
    expect(contactTitle).toBeInTheDocument();
  });
});
