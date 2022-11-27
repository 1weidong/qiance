<template>
    <client-only>
        <loginComponent></loginComponent>
    </client-only>
</template>

<script>
import loginComponent from "~/components/user/loginComponent";
export default {
    components: {
        loginComponent,
    },

    data() {
        return {
            orderDetail: null,
        };
    },

    computed: {
        ...mapState(["lang"]),
        ...mapGetters(["urlPrefix"]),
    },

    methods: {
        ...mapActions([]),
    },
};
</script>
