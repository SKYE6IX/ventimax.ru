import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../../messages/en.json";
import AboutUs from "../page";

describe("About us page", () => {
  it("render page title and sub title", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AboutUs />
      </NextIntlClientProvider>
    );

    // Act
    const pageTitle = screen.getByTestId("about-us-page-title");
    const pageSubTitle = screen.getByTestId("about-us-page-sub-title");

    // Assert
    expect(pageTitle).toBeInTheDocument();
    expect(pageSubTitle).toBeInTheDocument();
  });

  it("render text about the company", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AboutUs />
      </NextIntlClientProvider>
    );

    // Act
    const text = screen.getByTestId("about-us-page-text");

    // Assert
    expect(text).toBeInTheDocument();
  });

  it("render all certificates image with correct title", () => {
    // Arrange
    const certificatesData = [
      {
        title: "Certificates of Conformity",
      },
      {
        title: "BS Reliable trust Testing",
      },
      {
        title: "Quality Management",
      },
      {
        title: "Foreign Trade Operator",
      },
    ];
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AboutUs />
      </NextIntlClientProvider>
    );

    // Act
    const certificatesImage = screen.getAllByTestId(
      "about-us-page-certificate-image"
    );
    const certificatesTitle = screen.getAllByTestId(
      "about-us-page-certificate-title"
    );

    // Assert
    certificatesImage.forEach((el) => {
      expect(el).toBeInTheDocument();
    });
    certificatesTitle.forEach((el, i) => {
      expect(el).toBeInTheDocument();
      expect(el).toHaveTextContent(certificatesData[i].title);
    });
  });
});
