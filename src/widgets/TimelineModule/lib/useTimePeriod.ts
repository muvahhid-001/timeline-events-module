import { useState, useMemo } from "react";
import { mockYears } from "@/entities/TimePeriod/model/__mocks__/year.mock";

type Year = (typeof mockYears)[number];

export const useTimePeriod = () => {
  const [activePeriod, setActivePeriod] = useState(mockYears[0]);

  const currentIndex = useMemo(
    () => mockYears.findIndex((y) => y.id === activePeriod.id),
    [activePeriod]
  );

  const reorderedYears = useMemo(
    () => [activePeriod, ...mockYears.filter((y) => y.id !== activePeriod.id)],
    [activePeriod]
  );

  const handleChange = (period: Year) => {
    setActivePeriod(period);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActivePeriod(mockYears[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < mockYears.length - 1) {
      setActivePeriod(mockYears[currentIndex + 1]);
    }
  };

  const setActiveById = (id: number) => {
    const next = mockYears.find((y) => y.id === id);
    if (next) setActivePeriod(next);
  };

  return {
    activePeriod,
    currentIndex,
    reorderedYears,
    handleChange,
    handlePrev,
    handleNext,
    total: mockYears.length,
    setActiveById,
  };
};
