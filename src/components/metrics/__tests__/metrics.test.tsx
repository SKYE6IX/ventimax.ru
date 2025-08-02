import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import Metrics from "../Metrics";

describe("Metrics component", () => {
  it("render all metris boxs", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Metrics />
      </NextIntlClientProvider>
    );
    // Act
    const metricsBox = screen.getAllByTestId("metrics");
    // Assert
    metricsBox.forEach((el) => {
      expect(el).toBeInTheDocument();
    });
  });
});
