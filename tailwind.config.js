import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
				display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
			},
			animation: {
				orbit: "orbit calc(var(--duration)*1s) linear infinite",
				gradient: "gradient 8s linear infinite",
				float: "float 9s ease-in-out infinite",
				"float-delayed": "float 11s ease-in-out infinite 1.2s",
				"spin-slow": "spin 32s linear infinite",
			},
			keyframes: {
				orbit: {
					"0%": {
						transform: "rotate(calc(var(--angle)*1deg)) translateY(calc(var(--radius)*1px)) rotate(calc(var(--angle)*-1deg))",
					},
					"100%": {
						transform: "rotate(calc(var(--angle)*1deg + 360deg)) translateY(calc(var(--radius)*1px)) rotate(calc(var(--angle)*-1deg - 360deg))",
					},
				},
				gradient: {
					"0%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
					"100%": { backgroundPosition: "0% 50%" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-14px)" },
				},
			},
			screens: {
				mdplus: "1040px",
			}
		},
	},
	darkMode: "class",
	plugins: [
		heroui({
			themes: {
				light: {
					colors: {
						background: "#f3f1eb",
						foreground: "#16161a",
						primary: "#2f3fe0",
						focus: "#2f3fe0",
					},
				},
				dark: {
					colors: {
						background: "#07080c",
						foreground: "#f4f4f6",
						primary: "#a5b0ff",
						focus: "#a5b0ff",
					},
				},
			},
		}),
	],
};