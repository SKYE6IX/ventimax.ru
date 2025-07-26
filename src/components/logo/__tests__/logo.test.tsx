import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import Logo from "@/components/logo/Logo";
import message from "../../../../messages/en.json";

describe("Logo", () => {
  it("render company title", () => {
    render(
      <NextIntlClientProvider locale="en" messages={message}>
        <Logo />
      </NextIntlClientProvider>
    );
    const title = screen.getByText("Ventimax");
    expect(title).toBeInTheDocument();
  });

  it("render company logo", () => {
    render(
      <NextIntlClientProvider locale="en" messages={message}>
        <Logo />
      </NextIntlClientProvider>
    );
    const image = screen.getByAltText("company logo");
    expect(image).toBeInTheDocument();
  });
});
