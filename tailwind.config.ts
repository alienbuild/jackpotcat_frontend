import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        cherry: ['Cherry Bomb One'],
        slackey: ['Slackey']
      },
      keyframes: {
        'grow': {
          '0%': {
            transform: 'scale(0)',
            opacity: '0'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        'bounce-in': {
          '0%': {
            transform: 'scale(0)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        'floating': {
          '0%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        'roll-in': {
          '0%': {
            transform: 'translate3d(0, 0, -200px) scale(0.3) rotate(45deg)',
            opacity: '0',
          },
          '100%': {
            transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
            opacity: '1',
          },
        },
        'number-vertical-roll': {
          '0%': {
            transform: 'translateY(40px)', // Start below the ball
          },
          '50%': {
            transform: 'translateY(-40px)', // Move upwards as if rolling under the ball
          },
          '100%': {
            transform: 'translateY(0)', // Stop at the center
          },
        },
      },
      animation: {
        'bounce-in': 'bounce-in 0.5s ease-out forwards',
        'floating': 'floating 2s ease-in-out infinite',
        'roll-in': 'roll-in 0.7s ease-out forwards',
        'number-vertical-roll': 'number-vertical-roll 2s ease-out forwards',
        'grow': 'grow 2s ease-out forward'
      },
      animationDelay: {
        '0': '0s',
        '0.1': '0.1s',
        '0.2': '0.2s',
        '0.3': '0.3s',
        '0.4': '0.4s',
        '0.5': '0.5s',
      },
    },
  },
  darkMode: "class",
  plugins: [
      nextui(),
      require("@designbycode/tailwindcss-text-stroke"),
      require("@designbycode/tailwindcss-text-shadow")({
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowBlur: "0px",
        shadowOffsetX: "2px",
        shadowOffsetY: "2px",
      }),
  ],
} satisfies Config;
