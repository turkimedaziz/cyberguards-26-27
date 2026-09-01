/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'cyber-dark': '#181f39',
                'cyber-cyan': '#42c9f1',
                'cyber-pink': '#f6a7a7',
            },
        },
    },
    plugins: [],
}
