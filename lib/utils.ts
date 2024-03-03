import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isExpired(date: Date | string): boolean {
  // Get the current date
  const currentDate: Date = new Date();

  // Convert the given date to a Date object if it's not already
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  // Check if the given date is in the past
  return date < currentDate;
}
