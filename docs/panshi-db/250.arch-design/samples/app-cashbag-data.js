import { v4 as uuid } from 'uuid';

const model_type_def = {
    coin_type: {
        name: '币种'
        , prop: {
            name: {
                label: '名称'
            }
            , unit_sign: {
                label: '单位符号'
            }
            , unit_name: {
                label: '单位名称'
            }
            , precision: {
                label: '精度'
            }
        }
    }
    , money_amount: {
        name: '金额'
        , prop: {
            coin_type: {
                label: '币种'
            }
            , value: {
                label: '值'
            }
        }
    }
    , bank_card_type: {
        name: '银行卡'
        , prop: {
            // 固定为 money_pool
            data_group_code: {
                label: '数据分组标识'
            }
            , bank_name: {
                label: '银行名称'
            }
            , card_number: {
                label: '银行卡号'
            }
            , coin_type: {
                label: '币种'
            }
            , balance: {
                label: '余额'
            }
        }
    }
    , person: {
        name: '人员'
        , prop: {
            name: {
                label: '姓名'
            }
        }
    }
    , account_income_source: {
        name: '收账'
        , prop: {
            source: {
                label: '来源'
            }
            , money_amount: {
                label: '金额'
            }
            , money_pool: {
                label: '资金池'
            }
        }
    }
    , account_income: {
        name: '收入'
        , prop: {
            // 固定为 account_item
            data_group_code: {
                label: '数据分组标识'
            }
            , source: {
                label: '来源'
            }
            , money_amount: {
                label: '金额'
            }
            , money_pool: {
                label: '资金池'
                // 不确定类型属性，通过数据过滤器筛选可关联数据
                // TODO 如何解决关联无数据的情况？
                , data_filter: (d) => d.data_group_code == 'money_pool'
            }
        }
    }
};
Object.entries(model_type_def).forEach(([_, value]) => {
    value.id = uuid();
    value.label = `${value.name}`;
});

const coin_type_data = {
    rmb: {
        model_type: model_type_def.coin_type
        , name: '人民币'
        , unit_sign: '¥'
        , unit_name: '元'
        , precision: 2
    }
    , dollar: {
        model_type: model_type_def.coin_type
        , name: '美元'
        , unit_sign: '$'
        , unit_name: '美元'
        , precision: 2
    }
};
Object.entries(coin_type_data).forEach(([_, value]) => {
    value.id = uuid();
    value.label = `${value.name}(${value.unit_sign})`;
});

const money_amount_data = {
    "300": {
        model_type: model_type_def.money_amount
        , coin_type: coin_type_data.rmb
        , value: 300
    }
    , "1567.89": {
        model_type: model_type_def.money_amount
        , coin_type: coin_type_data.rmb
        , value: 1567.89
    }
};
Object.entries(money_amount_data).forEach(([_, value]) => {
    value.id = uuid();
    value.label = `${value.coin_type.unit_sign} ${value.value}`;
});

const bank_card_type_data = {
    icbc: {
        model_type: model_type_def.bank_card_type
        , data_group_code: '资金池' // 'money_pool'
        , bank_name: '工商银行'
        , card_number: '622xxxxxxxxxxxx'
        , coin_type: coin_type_data.rmb
        , balance: money_amount_data["1567.89"]
    }
};
Object.entries(bank_card_type_data).forEach(([_, value]) => {
    value.id = uuid();
    value.label = `${value.bank_name}\n${value.card_number}`;
});

const person_data = {
    lisi: {
        model_type: model_type_def.person
        , name: '李四'
    }
};
Object.entries(person_data).forEach(([_, value]) => {
    value.id = uuid();
    value.label = `${value.name}`;
});

const account_income_data = {
    income_300_from_lisi: {
        model_type: model_type_def.account_income
        , data_group_code: '账目' // 'account_item'
        , money_amount: money_amount_data["300"]
        , money_pool: bank_card_type_data.icbc
        , source: '来源'
    }
};
Object.entries(account_income_data).forEach(([_, value]) => {
    value.id = uuid();
    value.label = `${value.model_type.name}\n${value.money_amount.value}${value.money_amount.coin_type.unit_name}`;
});


export default [
    coin_type_data
    , money_amount_data
    , bank_card_type_data
    , person_data
    , account_income_data
];
