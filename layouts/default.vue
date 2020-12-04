<template>
	<v-app>
		<v-main>
			<v-container>
				<v-row justify="center" align="center">
					<v-col cols="12" sm="8">
						<nuxt />
					</v-col>
				</v-row>
			</v-container>
		</v-main>
		<v-footer
			><a href="https://www.cbr-xml-daily.ru/"
				>API для курсов ЦБ РФ</a
			></v-footer
		>
	</v-app>
</template>

<script>
export default {
	data() {
		return {};
	},
};
</script>
