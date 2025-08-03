import { render, screen, fireEvent } from "@testing-library/react";
import TimeControlButton from "../../ui/TimeControlButton";

describe("TimeControlButton", () => {
  const defaultProps = {
    current: 1,
    total: 10,
    onPrev: jest.fn(),
    onNext: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("рендерит правильный счетчик с ведущими нулями", () => {
    render(<TimeControlButton {...defaultProps} current={3} total={12} />);
    expect(screen.getByText("03/12")).toBeInTheDocument();
  });

  test("вызывает onPrev при клике на кнопку назад", () => {
    render(<TimeControlButton {...defaultProps} />);
    fireEvent.click(screen.getByText("<"));
    expect(defaultProps.onPrev).toHaveBeenCalledTimes(1);
  });

  test("вызывает onNext при клике на кнопку вперед", () => {
    render(<TimeControlButton {...defaultProps} />);
    fireEvent.click(screen.getByText(">"));
    expect(defaultProps.onNext).toHaveBeenCalledTimes(1);
  });

  test("блокирует кнопку назад, если isPrevDisabled=true", () => {
    render(<TimeControlButton {...defaultProps} isPrevDisabled />);
    expect(screen.getByText("<")).toBeDisabled();
  });

  test("блокирует кнопку вперед, если isNextDisabled=true", () => {
    render(<TimeControlButton {...defaultProps} isNextDisabled />);
    expect(screen.getByText(">")).toBeDisabled();
  });
});
