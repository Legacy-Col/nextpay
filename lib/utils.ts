import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export const authformSchema = (type: string) => z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  address: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  dateofbirth: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  stateoforigin: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  BVN: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  NIN: type === 'sign-in' ? z.string().optional() : z.string().min(3)
})