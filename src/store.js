import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    user: null,
    level: null
}

const store = new Vuex.Store({
    state,
    getters: {
        user: (state) => {
            return state.user
        },
        level: (state) => {
            return state.level
        }
    },
    actions: {
        user(context, user) {
            context.commit('user', user)
        },
        level(context, level) {
            context.commit('level', level)
        }
    },
    mutations: {
        user(state, user) {
            state.user = user
        },
        level(state, level) {
            state.level = level
        }
    }
})

export default store