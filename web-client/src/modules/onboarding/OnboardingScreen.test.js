import React from "react";
import { fireEvent, render } from "@testing-library/react";
import OnboardingScreen from "./OnboardingScreen";

test("does not claim to verify a phone number before Firebase is configured", () => {
  const { container, getByLabelText } = render(<OnboardingScreen />);

  fireEvent.change(getByLabelText("Phone number"), {
    target: { value: "555 010 1234" },
  });
  fireEvent.submit(container.querySelector("form"));

  expect(container.querySelector('[role="status"]').textContent).toContain(
    "No SMS was sent"
  );
});
