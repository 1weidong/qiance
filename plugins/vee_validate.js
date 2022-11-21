import Vue from 'vue'
import VeeValidate, {
    Validator
} from 'vee-validate'
Vue.use(VeeValidate, {
    fieldsBagName: 'veeField',
});
Validator.localize('cn');
export default ({
    app,
    store,
    route,
    req,
}) => {
    let i18n = app.i18n;
    const dict = {
        cn: {
            messages: {
                required: (name) => {
                    name = name.replace(/^\d+_/, '');
                    return i18n.t('rules_required', [name])
                }
            }
        }
    };
    Validator.localize(dict);

    //手机号码
    Validator.extend('mobile', {
        getMessage: (field, [args]) => i18n.t('form_tips', [i18n.t('mobile')]),
        validate: (value, [args]) => {
            const reg = /^\d{6,11}$/;
            return reg.test(value)
        }
    });

    // 邮箱
    Validator.extend('email', {
        getMessage: (field, [args]) => i18n.t('form_tips', [i18n.t('email')]),
        validate: (value, [args]) => {
            const reg = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            return reg.test(value)
        }
    });

    // 数字
    Validator.extend('number', {
        getMessage: (field, [args]) => i18n.t('form_tips', [field]),
        validate: (value, [args]) => {
            const reg = /^\d*$/;
            return reg.test(value)
        }
    });

    Validator.extend('reg', {
        getMessage: (field, [args]) => {
            field = field.replace(/^\d+_/, '');
            return i18n.t('form_tips', [field])
        },
        validate: (value, [args]) => {
            const reg = eval(args);
            return reg.test(value)
        }
    });

    Validator.extend('minmax', {
        validate(value, [min, max]) {
            return value.length >= min && value.length <= max;
        },
        params: ['min', 'max'],
        getMessage: (field, [min, max]) => {
            field = field.replace(/^\d+_/, '');
            return i18n.t('max_min_tip', [min + '-' + max])
        }
    });

    Validator.extend('min', {
        validate: (value, [min, max]) => value.length >= min,
        params: ['min'],
        getMessage: (field, [min]) => {
            field = field.replace(/^\d+_/, '');
            return i18n.t('max_min_tip', [min])
        }
    });
    Validator.extend('max', {
        validate: (value, [max]) => value.length <= max,
        params: ['max'],
        getMessage: (field, [max]) => {
            field = field.replace(/^\d+_/, '');
            return i18n.t('max_min_tip', [max])
        }
    })
}