import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { useGSAP } from "@gsap/react";
import messages from "../../../../messages/en.json";
import ExhibitionBlock from "../ExhibitionBlock";

jest.mock("@gsap/react");
jest.mock("gsap");

describe("exhibition block", () => {
   beforeEach(() => {
      jest.clearAllMocks();
      (useGSAP as jest.Mock).mockReturnValue({
         contextSafe: jest.fn(),
      });
   });

   it("render block title", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <ExhibitionBlock />
         </NextIntlClientProvider>
      );

      // Act
      const blockTitle = screen.getByTestId("exhibition-title");

      // Assert
      expect(blockTitle).toBeInTheDocument();
   });

   it("render all exhibition images", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <ExhibitionBlock />
         </NextIntlClientProvider>
      );

      // Act
      const exhibitionImages = screen.getAllByTestId("exhibition-image");

      // Assert
      expect(exhibitionImages).toHaveLength(4);
      for (const el of exhibitionImages) {
         expect(el).toBeInTheDocument();
      }
   });

   it("render exhibition buttons", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <ExhibitionBlock />
         </NextIntlClientProvider>
      );

      // Act
      const exhibitionButton = screen.getAllByTestId("exhibition-button");

      // Assert
      expect(exhibitionButton).toHaveLength(2);
      for (const el of exhibitionButton) {
         expect(el).toBeInTheDocument();
      }
   });

   it("call the the button to buttons that change the sklider", async () => {
      // Arrange
      const user = userEvent.setup();
      const mockContextSafe = (useGSAP as jest.Mock).mockReturnValue({
         contextSafe: jest.fn(),
      });
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <ExhibitionBlock />
         </NextIntlClientProvider>
      );

      // Act
      const exhibitionButton = screen.getAllByTestId("exhibition-button");

      // Assert
      for (const el of exhibitionButton) {
         await user.click(el);
         expect(mockContextSafe).toHaveBeenCalledTimes(1);
      }
   });
});
