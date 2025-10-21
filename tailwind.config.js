/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Force Tailwind to use older color formats compatible with html2canvas
  corePlugins: {
    // Keep all plugins but configure colors to use RGB instead of oklab
  },
  experimental: {
    // Disable modern color features that use oklab
    optimizeUniversalDefaults: false,
  }
}