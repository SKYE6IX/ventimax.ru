import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import ProductCard from "../ProductCard";

const stubData = {
  id: "hy-push-pull-exhaust-fans",
  name: "HY-PUSH-PULL EXHAUST FANS",
  images: ["/product-images/hy-push-pull-exhaust-fans/image-1.webp"],
};

describe("Product card component", () => {
  it("render background image", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ProductCard
          id={stubData.id}
          title={stubData.name}
          imageSrc={stubData.images[0]}
        />
      </NextIntlClientProvider>
    );

    // Act
    const bgImage = screen.getByTestId("background-image");

    // Assert
    expect(bgImage).toBeInTheDocument();
  });

  it("render correct product title", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ProductCard
          id={stubData.id}
          title={stubData.name}
          imageSrc={stubData.images[0]}
        />
      </NextIntlClientProvider>
    );

    // Act
    const productTitle = screen.getByRole("heading", { level: 3 });

    // Assert
    expect(productTitle).toBeInTheDocument();
    expect(productTitle).toHaveTextContent(stubData.name);
  });

  it("render product description", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ProductCard
          id={stubData.id}
          title={stubData.name}
          imageSrc={stubData.images[0]}
        />
      </NextIntlClientProvider>
    );

    // Act
    const productDes = screen.getByTestId("product-description");

    // Assert
    expect(productDes).toBeInTheDocument();
  });
});
