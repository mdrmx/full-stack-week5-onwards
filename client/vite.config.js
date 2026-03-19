import { defineConfig } from "vite";

// week 9 add proxy to server for post route to save
// favourite and get route to retrieve favourites

export default defineConfig({
  server: {
    proxy: {
      "/weather": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/saveFavourite": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/getFavourites": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
