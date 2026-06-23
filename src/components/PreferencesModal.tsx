"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronDown } from "lucide-react";
import { useCurrency, Currency, currencyRates } from "@/context/CurrencyContext";

export const LANGUAGES = [
  { code: "nl", name: "Nederlands", flag: "https://flagcdn.com/w40/nl.png" },
  { code: "en", name: "English", flag: "https://flagcdn.com/w40/us.png" },
  { code: "en-uk", name: "English (UK)", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "en-au", name: "English (AU)", flag: "https://flagcdn.com/w40/au.png" },
  { code: "es", name: "Español", flag: "https://flagcdn.com/w40/es.png" },
  { code: "pt", name: "Português", flag: "https://flagcdn.com/w40/pt.png" },
  { code: "pt-br", name: "Português (BR)", flag: "https://flagcdn.com/w40/br.png" },
  { code: "tr", name: "Türkçe", flag: "https://flagcdn.com/w40/tr.png" },
];

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PreferencesModal({ isOpen, onClose }: PreferencesModalProps) {
  const { currency: globalCurrency, setCurrency, language: globalLanguage, setLanguage } = useCurrency();
  
  // Local state for the modal form
  const [localLang, setLocalLang] = useState(globalLanguage);
  const [localCurr, setLocalCurr] = useState<Currency>(globalCurrency);
  
  // Dropdown states
  const [langOpen, setLangOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setLocalLang(globalLanguage);
      setLocalCurr(globalCurrency);
      setLangOpen(false);
      setCurrOpen(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, globalLanguage, globalCurrency]);

  if (!isOpen || !mounted) return null;

  const handleSave = () => {
    setLanguage(localLang);
    setCurrency(localCurr);
    onClose();
  };

  const selectedLangObj = LANGUAGES.find((l) => l.code === localLang) || LANGUAGES[1];

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
          {/* Language Selector */}
          <div className="relative">
            <label className="block text-sm font-medium text-[#8A92A6] mb-2">
              Language<span className="text-[#EF4444] ml-0.5">*</span>
            </label>
            <button
              onClick={() => {
                setLangOpen(!langOpen);
                setCurrOpen(false);
              }}
              className={`w-full flex items-center justify-between bg-[#1E2230] border transition-colors px-3 py-2.5 rounded-lg text-[15px] text-white ${langOpen ? "border-[#266DF0]" : "border-[#363C4F] hover:border-[#4B5563]"}`}
            >
              <div className="flex items-center gap-2">
                <img src={selectedLangObj.flag} alt={selectedLangObj.name} className="w-5 rounded-[2px]" />
                <span className="font-semibold">{selectedLangObj.name}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#8A92A6] transition-transform ${langOpen ? "rotate-180 text-[#266DF0]" : ""}`} />
            </button>
            
            {langOpen && (
              <div className="absolute top-full mt-1.5 left-0 w-full bg-[#292E3E] border border-[#363C4F] rounded-lg shadow-xl z-20 py-2 max-h-56 overflow-y-auto">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLocalLang(lang.code);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left flex items-center gap-3 px-4 py-2.5 text-[15px] hover:bg-[#363C4F] transition-colors ${localLang === lang.code ? "bg-[#363C4F] text-[#266DF0]" : "text-[#8A92A6]"}`}
                  >
                    <img src={lang.flag} alt={lang.name} className="w-5 rounded-[2px]" />
                    <span className={`font-semibold ${localLang === lang.code ? "text-[#266DF0]" : "text-[#8A92A6]"}`}>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Selector */}
          <div className="relative">
            <label className="block text-sm font-medium text-[#8A92A6] mb-2">
              Currency<span className="text-[#EF4444] ml-0.5">*</span>
            </label>
            <button
              onClick={() => {
                setCurrOpen(!currOpen);
                setLangOpen(false);
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
