<template>
	<div class="main">
		<div class="text-h5 font-weight-bold mt-8">Конвертер валют в рубли</div>
		<div class="text--disabled">
			по курсу ЦБ РФ на {{ new Date(course.Date).toLocaleDateString() }}
			<v-divider />
		</div>

		<v-row class="pt-4">
			<v-col cols="12" sm="8" md="6" class="pb-0">
				<v-select
					v-model="firstCurrency"
					:items="allCurrencies"
					filled
					label="Перевести из"
					@change="updateSecondAmount(firstCurrency, firstAmount)"
				></v-select>
			</v-col>
			<v-col cols="12" sm="8" md="6" class="pb-0">
				<v-select
					v-model="secondCurrency"
					:items="['RUB']"
					filled
					label="Перевести в"
				></v-select>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" sm="8" md="6" class="pt-0">
				<v-text-field
					v-model="firstAmount"
					class="pt-0"
					prepend-icon="mdi-cash"
					hint="Количество валюты"
					persistent-hint
					@input="updateSecondAmount(firstCurrency, firstAmount)"
				></v-text-field>
			</v-col>
			<v-col cols="12" sm="8" md="6" class="pt-0">
				<v-text-field
					v-model="secondAmount"
					class="pt-0"
					prepend-icon="mdi-currency-rub"
					hint="Количество валюты в рублях"
					persistent-hint
					readonly
				></v-text-field>
			</v-col>
		</v-row>
		<v-row justify="center" align="end" class="text-h3 mt-12">
			<span>{{ firstAmount }}</span>
			<span class="text-h6">{{ firstCurrency }}</span>
			<span class="px-6">=</span>
			<span>{{ secondAmount }}</span>
			<span class="text-h6">{{ secondCurrency }}</span>
		</v-row>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// 1. П выбирает 1 основную валюту (доллар по умолчанию) и 2 валюту
// 2. Автоматически рассчитывает
// 3. в окне истории виден этот поиск (дата, что куда, итог)

export default {
	async fetch() {
		await this.tryFetchCurrencyCourse();
		this.updateSecondAmount('USD', this.firstAmount);
	},

	data() {
		return {
			firstCurrency: 'USD',
			secondCurrency: 'RUB',
			firstAmount: 1,
			secondAmount: 70,
		};
	},

	computed: {
		...mapState(['course']),
		allCurrencies() {
			const currencies = Object.keys(this.course.Valute);
			return currencies;
		},
	},

	methods: {
		...mapActions({
			fetchCurrencyCourse: 'fetchCurrencyCourse',
		}),
		async tryFetchCurrencyCourse() {
			try {
				await this.fetchCurrencyCourse();
			} catch (e) {
				console.error(e);
			}
		},

		getCurrencyInfo(currency) {
			const arrayCourse = Object.values(this.course.Valute);
			const currencyInfo = arrayCourse.find(
				(item) => item.CharCode === currency
			);
			return currencyInfo;
		},
		getOneUnit(currency) {
			const details = this.getCurrencyInfo(currency);
			const amount = details.Nominal;
			const value = details.Value;
			const currencyOneUnit = (value / amount).toFixed(2);
			return currencyOneUnit;
		},
		updateSecondAmount(currency, firstAmount) {
			const oneUnitCurrency = this.getOneUnit(currency);
			const updatedValue = (oneUnitCurrency * firstAmount).toFixed(2);
			if (isNaN(updatedValue)) return;
			this.secondAmount = updatedValue;
		},
	},
};
</script>
