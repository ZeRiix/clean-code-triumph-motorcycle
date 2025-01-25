import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import autoImport from "unplugin-auto-import/vite";
import components from "unplugin-vue-components/vite";
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  	plugins: [
		vue(), 
		tailwindcss(),
		autoImport({
			imports: [
				"vue",
				"vue-router"
			],
			ignore: ["_**"],
			dirs: [
				"src/lib/**/*.ts",
				"src/composables/**/*.ts",
			],
			dts: "src/auto-imports.d.ts",
		}),
		components({
			dirs: ["src/components"],
			dts: "src/components.d.ts",
		})
	],
	resolve: {
		alias: {
			"@": resolve("src")
		}
	},
	server: {
		host: "0.0.0.0"
	}
})
