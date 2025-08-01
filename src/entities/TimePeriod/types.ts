export interface YearPoint {
  id: number;
  year: number;
}

export interface TimeCircleSwitcherProps {
  years: YearPoint[];
  activeIndex: number;
  onYearSelect: (index: number) => void;
}
