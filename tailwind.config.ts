import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1723C7",
        },
        secondary: {
          DEFAULT: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#FF7A00",
        },
        darkGray: {
          DEFAULT: "#1B1C21",
        },
      },
      fontFamily: {
        sans: ["var(--font-helvetica)", ...fontFamily.sans],
      },
    },
  },
  safelist: ["flex-row", "flex-reverse"],
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
