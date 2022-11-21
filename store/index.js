import Vuex from "vuex";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const createStore = () => {
    return new Vuex.Store({
        strict: false,
        state,
        getters,
        mutations,
        actions,
    });
};
export default createStore;
