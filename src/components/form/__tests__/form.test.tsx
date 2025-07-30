import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import Form from "../Form";

describe("Form components", () => {
  it("render form title", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Form />
      </NextIntlClientProvider>
    );

    // Act
    const formTitle = screen.getByTestId("form-title");

    // Assert
    expect(formTitle).toBeInTheDocument();
  });

  it("render all label in form", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Form />
      </NextIntlClientProvider>
    );

    // Act
    const labels = screen.getAllByTestId("form-label");

    // Assert
    expect(labels).toHaveLength(5);
    labels.forEach((el) => {
      expect(el).toBeInTheDocument();
    });
  });

  it("render all input in the form and check their attribute", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Form />
      </NextIntlClientProvider>
    );

    // Act
    const inputs = screen.getAllByTestId("form-input");

    // Assert
    expect(inputs).toHaveLength(5);
    inputs.forEach((el) => {
      expect(el).toBeInTheDocument();
      if ((el as HTMLInputElement).name === "subject") {
        expect(el).not.toHaveAttribute("required");
      } else {
        expect(el).toHaveAttribute("required");
      }
      expect(el).toHaveAttribute("placeholder");
    });
  });

  it("render form button with attribute type of submit", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Form />
      </NextIntlClientProvider>
    );

    // Act
    const button = screen.getByTestId("form-button");

    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });

  it("render quick link with correct data", () => {
    // Arrange
    const phoneNumber = "+86-1665-3608178";
    const email = "amyxuan@cool-fan.com";
    const location = "Economic Development zone, Qingzhou, China";
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Form />
      </NextIntlClientProvider>
    );

    // Act
    const phoneLink = screen.getByTestId("form-quick-link-number");
    const emailLink = screen.getByTestId("form-quick-link-email");
    const locationLink = screen.getByTestId("form-quick-link-location");

    // Assert
    expect(phoneLink).toHaveTextContent(phoneNumber);
    expect(emailLink).toHaveTextContent(email);
    expect(locationLink).toHaveTextContent(location);
  });

  it("render all social media icons ", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Form />
      </NextIntlClientProvider>
    );

    // Act
    const socialIcons = screen.getAllByTestId("form-social-link");

    // Assert
    expect(socialIcons).toHaveLength(3);
    socialIcons.forEach((el) => {
      expect(el).toBeInTheDocument();
    });
  });

  it("focus on all input when user uses tab", async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Form />
      </NextIntlClientProvider>
    );

    // Act
    const inputs = screen.getAllByTestId("form-input");

    // Assert
    expect(document.body).toHaveFocus();
    inputs.forEach(async (el) => {
      await user.tab();
      expect(el).toHaveFocus();
    });
  });

  it("accept user to type into all inputs", async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Form />
      </NextIntlClientProvider>
    );

    // Act
    const inputs = screen.getAllByTestId("form-input");

    // Assert
    expect(document.body).toHaveFocus();
    inputs.forEach(async (el) => {
      await user.type(el, "Test Value");
      expect(el).toHaveValue("Test Value");
    });
  });
});
