import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import FAQ from "../FAQ";

describe("FAQ component", () => {
  it("render block title and sub title", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FAQ />
      </NextIntlClientProvider>
    );

    // Act
    const blockTitle = screen.getByTestId("faq-block-title");
    const blockSubTitle = screen.getByTestId("faq-block-sub-title");

    // Assert
    expect(blockTitle).toBeInTheDocument();
    expect(blockSubTitle).toBeInTheDocument();
  });

  it("render all drop down title", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FAQ />
      </NextIntlClientProvider>
    );

    // Act
    const dropDownTitle = screen.getAllByTestId("faq-block-dropdown-title");

    // Assert
    expect(dropDownTitle).toHaveLength(4);
    dropDownTitle.forEach((el) => {
      expect(el).toBeInTheDocument();
    });
  });

  it("render all drop down text", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FAQ />
      </NextIntlClientProvider>
    );

    // Act
    const dropDownText = screen.getAllByTestId("faq-block-dropdown-text");

    // Assert
    expect(dropDownText).toHaveLength(4);
    dropDownText.forEach((el) => {
      expect(el).toBeInTheDocument();
    });
  });

  it("render all dropdown buttons", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FAQ />
      </NextIntlClientProvider>
    );

    // Act
    const dropDownButtons = screen.getAllByTestId("faq-block-dropdown-button");

    // Assert
    expect(dropDownButtons).toHaveLength(4);
    dropDownButtons.forEach((el) => {
      expect(el).toBeInTheDocument();
    });
  });

  it("should add OPEN class to show dropdown and CLOSE to hidden dropdown", () => {
    // Arrange
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FAQ />
      </NextIntlClientProvider>
    );

    // Act
    const dropDowns = screen.getAllByTestId("faq-block-drop-down");

    const shownDropDown = dropDowns.find(
      (el) => el.getAttribute("aria-expanded") === "true"
    );
    const hiddenDropDown = dropDowns.filter(
      (el) => el.getAttribute("aria-expanded") === "false"
    );

    // Assert
    expect(shownDropDown).toHaveClass("open");
    hiddenDropDown.forEach((el) => {
      expect(el).toHaveClass("close");
    });
  });

  it("should close an open dropdown", async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FAQ />
      </NextIntlClientProvider>
    );

    // Act
    const dropDowns = screen.getAllByTestId("faq-block-drop-down");
    const buttons = screen.getAllByTestId("faq-block-dropdown-button");
    const activeButton = buttons.find(
      (el) => el.getAttribute("aria-expanded") === "true"
    ) as HTMLElement;
    const shownDropDown = dropDowns.find(
      (el) => el.getAttribute("aria-expanded") === "true"
    );

    // Assert
    expect(shownDropDown).toHaveClass("open");

    await user.click(activeButton);

    expect(shownDropDown).toHaveClass("close");
  });
});
