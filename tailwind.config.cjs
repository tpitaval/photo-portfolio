module.exports = {
  content: ["./src/**/*.{astro,jsx,tsx,md,mdx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        accent: "#000000",
        ink: "#000000",
        paper: "#FFFFFF",
      },
      container: { center: true, padding: "clamp(16px,4vw,40px)" },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,0.08)" },
      fontFamily: {
        sans: [
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        base: "clamp(1rem,1.2vw,1.125rem)",
        h1: "clamp(2.8rem,6vw,5rem)",
        h2: "clamp(2rem,4vw,3rem)",
      },
    },
  },
  plugins: [],
};

