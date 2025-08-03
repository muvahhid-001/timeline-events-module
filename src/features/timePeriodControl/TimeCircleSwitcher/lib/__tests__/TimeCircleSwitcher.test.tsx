import { render, screen, fireEvent } from "@testing-library/react";
import TimeCircleSwitcher from "../../ui/TimeCircleSwitcher";
import { YearPoint } from "@/entities/TimePeriod/types";

jest.mock(
  "@/features/timePeriodControl/TimeCircleSwitcher/lib/hooks/useCircleUpdate",
  () => ({
    useCircleUpdate: jest.fn(),
  })
);

jest.mock(
  "@/features/timePeriodControl/TimeCircleSwitcher/lib/hooks/useCircleClick",
  () => ({
    useCircleClick: () => jest.fn(),
  })
);

const mockYears: YearPoint[] = [
  { id: 1010, firstYear: 1010, lastYear: 1010, description: "Test 1" },
  { id: 1020, firstYear: 1020, lastYear: 1020, description: "Test 2" },
  { id: 1030, firstYear: 1030, lastYear: 1030, description: "Test 3" },
  { id: 1040, firstYear: 1040, lastYear: 1040, description: "Test 4" },
];

describe("TimeCircleSwitcher", () => {
  test("рендерит все точки", () => {
    render(<TimeCircleSwitcher years={mockYears} activeId={1020} />);
    mockYears.forEach((_, i) => {
      expect(screen.getByText((i + 1).toString())).toBeInTheDocument();
    });
  });

  test("активная точка подсвечивается", () => {
    const { container } = render(
      <TimeCircleSwitcher years={mockYears} activeId={1030} />
    );
    const active = container.querySelector(`.wrapperPoint.active`);
    expect(active?.textContent).toBe("3");
  });

  test("при клике вызывает onSelect", () => {
    const handleSelect = jest.fn();
    render(
      <TimeCircleSwitcher
        years={mockYears}
        activeId={1010}
        onSelect={handleSelect}
      />
    );
    fireEvent.click(screen.getByText("3"));
    expect(handleSelect).toHaveBeenCalledWith(1030);
  });
});
