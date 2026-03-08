/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        teal: {
          DEFAULT: "#1A5C52",
          mid: "#2D7A6E",
          light: "#4A9D8F",
          pale: "#E8F4F1",
        },
        amber: {
          DEFAULT: "#D4820A",
          light: "#F0A030",
        },
        dark: "#1A2E29",
        darker: "#0F1E1A",
        cream: "#F5EDE3",
        off: "#F9F5F0",
        muted: "#7A9E96",
        text: "#2A2A2A",
        white: "#FEFEFE",
        // Additional colors from design
        "dark-green": "#0D3D32",
        "light-green-badge": "#E8F5F0",
        "light-green-text": "#94A3A8",
        "card-bg": "#164A3F",
      },
    },
  },
  plugins: [],
};
