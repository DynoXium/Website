"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "USD" | "EUR" | "INR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  language: string;
  setLanguage: (language: string) => void;
  formatPrice: (usdPrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const currencyRates: Record<Currency, { symbol: string; rate: number; name: string }> = {
  USD: { symbol: "$", rate: 1.0, name: "USD" },
  EUR: { symbol: "€", rate: 0.92, name: "EUR" },
  INR: { symbol: "₹", rate: 83.0, name: "INR" },
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const [language, setLanguageState] = useState<string>("en");

  useEffect(() => {
    const savedCurr = localStorage.getItem("dynoxium_currency");
    if (savedCurr && (savedCurr === "USD" || savedCurr === "EUR" || savedCurr === "INR")) {
      setCurrencyState(savedCurr);
    }
    const savedLang = localStorage.getItem("dynoxium_language");
    if (savedLang) {
      setLanguageState(savedLang);
    }
  }, []);

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem("dynoxium_currency", curr);
  };

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem("dynoxium_language", lang);
  };

  const formatPrice = (usdPrice: number) => {
    if (usdPrice === 0) return "FREE";
    const { symbol, rate } = currencyRates[currency];
    const converted = usdPrice * rate;
    
    // Format appropriately: INR is usually rounded or has no decimals if large, USD/EUR has 2 decimals
    if (currency === "INR") {
      return `${symbol}${Math.round(converted).toLocaleString("en-IN")}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, language, setLanguage, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
