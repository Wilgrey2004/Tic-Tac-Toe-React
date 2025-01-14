import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://Wilgrey2004.github.io/Tic-Tac-Toe-React.git",
});
