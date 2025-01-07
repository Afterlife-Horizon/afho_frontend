const { createThemes } = require("tw-colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "none",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))"
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))"
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))"
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))"
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))"
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" }
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out"
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require("tailwind-scrollbar"),
		createThemes({
			"light-default": {
				dark: "#ffffff",
				light: "#121212",
				background: {
					dark: "#f6f6f6",
					medium: "#ececec",
					light: "#d8d8d8"
				},
				accent: {
					dark: "#77529E",
					light: "#bb86fc"
				}
			},
			// ---------- Dark Mode ----------
			default: {
				dark: "#ffffff",
				light: "#121212",
				background: {
					dark: "#121212",
					medium: "#1d1d1d",
					light: "#2d2d2d"
				},
				accent: {
					dark: "#77529E",
					light: "#bb86fc"
				}
			},
			blush: {
				dark: "#ffffff",
				light: "#121212",
				background: {
					dark: "#121212",
					medium: "#1d1d1d",
					light: "#2d2d2d"
				},
				accent: {
					dark: "hsl(347, 46%, 42%)",
					light: "hsl(342, 48%, 60%)"
				}
			},
			"mountain-meadow": {
				dark: "#ffffff",
				light: "#121212",
				background: {
					dark: "#121212",
					medium: "#1d1d1d",
					light: "#2d2d2d"
				},
				accent: {
					dark: "hsl(161, 86%, 30%)",
					light: "hsl(157, 59%, 52%)"
				}
			},
			java: {
				dark: "#ffffff",
				light: "#121212",
				background: {
					dark: "#121212",
					medium: "#1d1d1d",
					light: "#2d2d2d"
				},
				accent: {
					dark: "hsl(195, 67%, 31%)",
					light: "hsl(190, 70%, 53%)"
				}
			}
		})
	]
}
