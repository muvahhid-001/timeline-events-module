import { render, screen } from "@testing-library/react";
import { TimePeriodNavigate } from "../../ui/TimePeriodNavigate";

jest.mock(
  "@/features/timePeriodControl/TimePeriodNavigate/lib/useSmoothNumber",
  () => ({
    useSmoothNumber: (num: number) => num,
  })
);

describe("TimePeriodNavigate", () => {
  test("рендерит firstYear и lastYear", () => {
    const period = { firstYear: 1900, lastYear: 2000 };
    render(<TimePeriodNavigate period={period} />);

    expect(screen.getByText("1900")).toBeInTheDocument();
    expect(screen.getByText("2000")).toBeInTheDocument();
  });
});
