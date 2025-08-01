export interface YearPoint {
  id: number;
  firstYear: number;
  lastYear: number;
  description: string;
}

export interface TimeCircleSwitcherProps {
  years: YearPoint[];
  activeIndex: number;
  onYearSelect: (index: number) => void;
}
