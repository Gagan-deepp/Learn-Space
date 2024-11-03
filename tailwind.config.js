/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                xs: "475px",
            },
            backgroundImage: {
                'custom-radial': 'radial-gradient(circle, rgba(245, 245, 245, 1) 0%, rgba(235, 235, 235, 1) 100%)',
            },
            colors: {
                primary: {
                    "100": "#cdcfce",
                    DEFAULT: "#d0d0ce",
                },
                secondary: "#FBE843",
                "bg-white": "#FFFDF6",
                "white-1": "#f5f5f5",
                "grey-1": "#c6c6c6",
                "grey-2": "#e1e1e1",
                "grey-3": "#ececec",
                "grey-4": "#fafafa",
                "black-1": "#0a0a0a",
                "black-2": "#171717",
                "black-3": "#1F2127",
                "black-hover": "rgba(0, 0, 0, 0.5)",
                black: {
                    "100": "#333333",
                    "200": "#141413",
                    "300": "#7D8087",
                    DEFAULT: "#000000",
                },
            },
            fontFamily: {
                "work-sans": ["var(--font-work-sans)"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            boxShadow: {
                100: "2px 2px 0px 0px rgb(0, 0, 0)",
                200: "2px 2px 0px 2px rgb(0, 0, 0)",
                300: "2px 2px 0px 2px rgb(238, 43, 105)",
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

module.exports = config;
