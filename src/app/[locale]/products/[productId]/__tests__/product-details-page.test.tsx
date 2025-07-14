import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import * as React from "react";
import { useGSAP } from "@gsap/react";
import ProductDetails from "../page";
import message from "../../../../../../messages/en.json";

jest.mock("@gsap/react");
jest.mock("gsap");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  use: jest.fn(),
}));

describe("Product component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGSAP as jest.Mock).mockReturnValue({
      contextSafe: jest.fn(),
    });
  });

  it("render product image", async () => {
    // Arrange
    const mockData = {
      productId: "hy-push-pull-exhaust-fans",
    };
    jest.spyOn(React, "use").mockImplementation(() => {
      return mockData;
    });
    const param = Promise.resolve(mockData);
    render(
      <NextIntlClientProvider locale="en" messages={message}>
        <ProductDetails params={param} />
      </NextIntlClientProvider>
    );

    // Act
    const productImage = screen.getByTestId("product-details-image");

    // Assert
    expect(productImage).toBeInTheDocument();
  });

  it("render product correct product title", async () => {
    // Arrange
    const mockData = {
      productId: "hy-push-pull-exhaust-fans",
    };
    jest.spyOn(React, "use").mockImplementation(() => {
      return mockData;
    });
    const param = Promise.resolve(mockData);
    const mockTitle = "HY-PUSH-PULL EXHAUST FANS";

    render(
      <NextIntlClientProvider locale="en" messages={message}>
        <ProductDetails params={param} />
      </NextIntlClientProvider>
    );

    // Act
    const productTitle = screen.getByTestId("product-details-title");

    // Assert
    expect(productTitle).toHaveTextContent(mockTitle);
  });

  it("render product detail title and specification title", async () => {
    // Arrange
    const mockData = {
      productId: "hy-push-pull-exhaust-fans",
    };
    jest.spyOn(React, "use").mockImplementation(() => {
      return mockData;
    });
    const param = Promise.resolve(mockData);

    render(
      <NextIntlClientProvider locale="en" messages={message}>
        <ProductDetails params={param} />
      </NextIntlClientProvider>
    );

    // Act
    const detailTitle = screen.getByTestId("product-details-title");
    const specificationTitle = screen.getByTestId(
      "product-specification-title"
    );

    // Assert
    expect(detailTitle).toBeInTheDocument();
    expect(specificationTitle).toBeInTheDocument();
  });

  it("render product detail description", async () => {
    // Arrange
    const mockData = {
      productId: "hy-push-pull-exhaust-fans",
    };
    jest.spyOn(React, "use").mockImplementation(() => {
      return mockData;
    });
    const param = Promise.resolve(mockData);

    render(
      <NextIntlClientProvider locale="en" messages={message}>
        <ProductDetails params={param} />
      </NextIntlClientProvider>
    );

    // Act
    const detailDescription = screen.getByTestId("product-details-description");

    // Assert
    expect(detailDescription).toBeInTheDocument();
  });

  it("render product specification item", async () => {
    // Arrange
    const mockData = {
      productId: "hy-push-pull-exhaust-fans",
    };
    jest.spyOn(React, "use").mockImplementation(() => {
      return mockData;
    });
    const param = Promise.resolve(mockData);

    render(
      <NextIntlClientProvider locale="en" messages={message}>
        <ProductDetails params={param} />
      </NextIntlClientProvider>
    );

    // Act
    const specificationItems = screen.getAllByTestId(
      "product-details-specification-item"
    );

    // Assert
    for (const el of specificationItems) {
      expect(el).toBeInTheDocument();
    }
  });
});
