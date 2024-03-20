import { createContext, useState } from "react";

export const ThemeContext = createContext({
  currentTheme: "light",
  theme: {
    dark: {
      bgcolor: "bg-indigo-950",
      bgcomps: "bg-indigo-900",
      text: "text-white",
      bgdetail: "bg-neutral-400",
    },
    light: {
      bgcolor: "bg-white",
      bgcomps: "bg-white",
      text: "text-black",
    },
  },
});

export default function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("dark");
  console.log(currentTheme, "<< INI THEMENYA");
  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
        theme: {
          dark: {
            bgColor: "bg-indigo-950",
            bgComps: "bg-indigo-900",
            text: "text-sky-400",
            bgDetail: "bg-neutral-400",
            border: "border-white",
            navBorder: "border-neutral-300"
          },
          light: {
            bgColor: "bg-zinc-200",
            bgComps: "bg-white",
            text: "text-orange-400",
            border: "border-black",
            navBorder: "border-transparant"
          },
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
