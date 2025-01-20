import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import * as autoImport from "unplugin-auto-import/vite";
import * as components from "unplugin-vue-components/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		autoImport.default({
			imports: [
				"vue",
				"vue-router",
			],
			ignore: ["_**"],
			dirs: ["src/libs/duploTo/**"],
			dts: "src/auto-imports.d.ts",
		}),
		components.default({
			dirs: ["src/components"],
			dts: "src/components.d.ts",
		}),
	],
	css: {
		postcss: {
			plugins: [
				tailwindcss(path.resolve(__dirname, "./tailwind.config.js")),
				autoprefixer,
			],
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		host: "0.0.0.0",
	},
});
