import React from "react";
import { render, screen } from "@testing-library/react";
import { YearSlide } from "../../YearSlide";
import { YearPoint } from "@/entities/TimePeriod/types";

describe("YearSlide", () => {
  const year: YearPoint = {
    id: 1,
    firstYear: 1000,
    lastYear: 1005,
    description: "Test period",
  };

  it("рендерит год и описание", () => {
    render(<YearSlide year={year} isActive={false} />);
    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("Test period")).toBeInTheDocument();
  });

  it("добавляет класс active, если isActive=true", () => {
    const { container } = render(<YearSlide year={year} isActive={true} />);
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.className).toMatch(/active/);
  });

  it("не добавляет класс active, если isActive=false", () => {
    const { container } = render(<YearSlide year={year} isActive={false} />);
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.className).not.toMatch(/active/);
  });
});
