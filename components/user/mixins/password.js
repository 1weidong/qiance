import passwordComponent from "~/components/user/password";

export default {
    components: { passwordComponent },

    data() {
        return {
            isSubmit: false,
            isPassword: false,
            isPass: 0,
            btnTxt: "下一步",
        };
    },

    methods: {
        /**
         * @description: 忘记密码
         */
        handleClick() {
            if (this.isPassword) {
                this.submitForm();
                return;
            }
            this.nextStep();
        },
    },
};
