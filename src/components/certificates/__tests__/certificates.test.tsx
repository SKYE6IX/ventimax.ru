import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import Certificates from "../Certificates";

describe("Certificates component", () => {
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
        <Certificates />
      </NextIntlClientProvider>
    );
    // Act
    const certificatesImage = screen.getAllByTestId("certificate-image");
    const certificatesTitle = screen.getAllByTestId("certificate-title");
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
