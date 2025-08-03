import React from "react";
import { render, screen } from "@testing-library/react";
import TimePeriodSwiper from "../../ui/TimePeriodSwiper";
import { YearPoint } from "@/entities/TimePeriod/types";

describe("TimePeriodSwiper", () => {
  const years: YearPoint[] = [
    { id: 1, firstYear: 1000, lastYear: 1005, description: "Period 1" },
    { id: 2, firstYear: 1010, lastYear: 1015, description: "Period 2" },
    { id: 3, firstYear: 1020, lastYear: 1025, description: "Period 3" },
  ];

  it("рендерит слайды и кнопки навигации", () => {
    const onChange = jest.fn();

    render(<TimePeriodSwiper years={years} activeId={1} onChange={onChange} />);

    expect(screen.getByText("Period 1")).toBeInTheDocument();
    expect(screen.getByText("Period 2")).toBeInTheDocument();
    expect(screen.getByText("Period 3")).toBeInTheDocument();

    expect(screen.getByText(">")).toBeInTheDocument();
  });
});
