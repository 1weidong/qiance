<template>
    <client-only>
        <div class="login-container">
            <resetPassword></resetPassword>
        </div>
    </client-only>
</template>

<script>
import resetPassword from "~/components/user/reset_password";
export default {
    components: {
        resetPassword,
    },
};
</script>

<style lang="scss" scoped>
.login-container {
    height: 100%;
    background: #f5f6f7;
}
</style>
