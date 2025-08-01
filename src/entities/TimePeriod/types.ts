export interface YearPoint {
  id: number;
  firstYear: number;
  lastYear: number;
}

export interface TimeCircleSwitcherProps {
  years: YearPoint[];
  activeIndex: number;
  onYearSelect: (index: number) => void;
}
