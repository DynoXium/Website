"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronDown } from "lucide-react";
import { useCurrency, Currency, currencyRates } from "@/context/CurrencyContext";



interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PreferencesModal({ isOpen, onClose }: PreferencesModalProps) {
  const { currency: globalCurrency, setCurrency } = useCurrency();
  
  // Local state for the modal form
  const [localCurr, setLocalCurr] = useState<Currency>(globalCurrency);
  
  // Dropdown states
  const [currOpen, setCurrOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setLocalCurr(globalCurrency);
      setCurrOpen(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, globalCurrency]);

  if (!isOpen || !mounted) return null;

  const handleSave = () => {
    setCurrency(localCurr);
    onClose();
  };

  const modalContent = (
    <>
      <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-[420px] bg-[#292E3E] rounded-2xl shadow-2xl p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[1.1rem] font-bold text-white">Preferences</h2>
          <button onClick={onClose} className="text-[#8A92A6] hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Currency Selector */}
          <div className="relative">
            <label className="block text-sm font-medium text-[#8A92A6] mb-2">
              Currency<span className="text-[#EF4444] ml-0.5">*</span>
            </label>
            <button
              onClick={() => {
                setCurrOpen(!currOpen);
              }}
              className={`w-full flex items-center justify-between bg-[#1E2230] border transition-colors px-3 py-2.5 rounded-lg text-[15px] text-white ${currOpen ? "border-[#266DF0]" : "border-[#363C4F] hover:border-[#4B5563]"}`}
            >
              <span className="font-semibold">{localCurr}</span>
              <ChevronDown className={`w-4 h-4 text-[#8A92A6] transition-transform ${currOpen ? "rotate-180 text-[#266DF0]" : ""}`} />
            </button>
            
            {currOpen && (
              <div className="absolute top-full mt-1.5 left-0 w-full bg-[#292E3E] border border-[#363C4F] rounded-lg shadow-xl z-20 py-2">
                {(Object.keys(currencyRates) as Currency[]).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setLocalCurr(curr);
                      setCurrOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-[15px] hover:bg-[#363C4F] transition-colors flex justify-between ${localCurr === curr ? "bg-[#363C4F] text-[#266DF0]" : "text-[#8A92A6]"}`}
                  >
                    <span className="font-semibold">{curr}</span>
                    <span className="font-medium">{currencyRates[curr].symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-3 mt-10">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-[#8A92A6] bg-[#363C4F] hover:bg-[#4B5563] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#363C4F] hover:bg-[#4B5563] transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
}
