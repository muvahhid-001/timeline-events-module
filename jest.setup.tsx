import "@testing-library/jest-dom";
import React from "react";

jest.mock("swiper/react", () => {
  return {
    Swiper: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    SwiperSlide: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});
jest.mock("swiper/css", () => ({}));
jest.mock("swiper/css/pagination", () => ({}));
jest.mock("swiper/modules", () => ({
  Pagination: jest.fn(),
}));
