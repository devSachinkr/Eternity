import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncateString = (text: string, maxLength: number = 30) => {
  return text.slice(0, maxLength).concat("...");
};

