import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getPaymentMethodName(methodId) {
  const methods = {
    debmaster: "Tarjeta de Débito Mastercard",
    visa: "Visa",
    master: "Mastercard",
    amex: "American Express",
  };
  return methods[methodId] || methodId;
}

export function formatCurrency(amount, currency = "PEN") {
  const currencySymbols = {
    PEN: "S/",
    USD: "$",
    EUR: "€",
  };
  return `${currencySymbols[currency] || currency} ${Number.parseFloat(
    amount
  ).toFixed(2)}`;
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
