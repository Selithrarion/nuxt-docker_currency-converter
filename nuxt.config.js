import colors from 'vuetify/es5/util/colors';

export default {
	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		titleTemplate: '%s - nuxt-docker_currency-converter',
		title: 'nuxt-docker_currency-converter',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
	css: [],
	plugins: [],
	components: true,
	buildModules: ['@nuxtjs/vuetify'],
	modules: ['@nuxtjs/axios'],
	axios: {
		baseURL: 'https://www.cbr-xml-daily.ru/daily_json.js',
	},
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			themes: {
				light: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3,
				},
			},
		},
	},
	build: {},
	pageTransition: 'fade-transition',
	env: {
		appName: 'Nuxt Docker Currency Converter',
	},
};
