/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    default: "#1111dd",
                    100: "#8aecff",
                },
            },
        },
    },
    plugins: [],
};
