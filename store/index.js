export const state = () => ({
	course: {},
});
export const mutations = {
	SET_CURRENCY_COURSE(state, data) {
		state.course = data;
	},
};
export const actions = {
	async fetchCurrencyCourse({ commit }) {
		const data = await this.$axios.$get();
		commit('SET_CURRENCY_COURSE', data);
	},
};
