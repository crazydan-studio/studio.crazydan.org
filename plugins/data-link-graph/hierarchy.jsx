const data_node_size = 32;
const data_node_color = '#c30771';

const data_link_length = 120;
const data_link_color = '#999';

const data_prop_link_length = 120;
const data_prop_node_color = '#ffbedc';

const data_model_type_node_size = 16;
const data_model_type_node_color = '#008ec4';

const data_model_type_prop_node_size = 8;
const data_model_type_prop_node_color = '#008ec4';

const data_model_type_prop_link_length = 50;
const data_model_type_prop_link_color = '#828282';

function is_a_data(obj) {
    return !!obj.id && !!obj.model_type;
}

function _hierarchy(nodes, links, obj, options) {
    if (!is_a_data(obj)) {
        return;
    }

    const data_id = obj.id;
    const data_model_type_prop = obj.model_type.prop;
    const data_node_type = 'data';

    if (!nodes[data_id]) {
        nodes[data_id] = {
            id: data_id
            , type: data_node_type
            , value: obj.label
            , weight: data_node_size
            , color: data_node_color
        };
    }

    Object.entries(obj).forEach(([prop, sub_obj]) => {
        if (['id', 'label'].includes(prop)) {
            return;
        }

        const is_a_sub_data = is_a_data(sub_obj);
        const sub_data_node_type = is_a_sub_data ? 'data' : (prop == 'model_type' ? 'model' : 'prop');
        const sub_data_node_id = is_a_sub_data ? sub_obj.id : `${data_id}_with_${prop}`;
        if (!nodes[sub_data_node_id]) {
            nodes[sub_data_node_id] = {
                id: sub_data_node_id
                , type: sub_data_node_type
                , value: sub_obj.label ? sub_obj.label : sub_obj
                , weight: is_a_sub_data ? data_node_size : data_model_type_node_size
                , color: is_a_sub_data ? data_node_color : (prop == 'model_type' ? data_model_type_node_color : data_prop_node_color)
            };
        }

        const link_id = `${data_id}_link_${sub_data_node_id}`;
        if (!links[link_id]) {
            const prop_def = data_model_type_prop[prop];

            links[link_id] = {
                id: link_id
                , type: sub_data_node_type
                , source: data_id
                , target: sub_data_node_id
                , value: prop_def ? prop_def.label : (prop == 'model_type' ? '数据结构' : prop)
                , weight: is_a_sub_data ? data_link_length : data_prop_link_length
                , color: data_link_color
            };
        } else {
            return; // break cycle
        }

        if (prop == 'model_type') {
            const model_type_id = sub_data_node_id;
            // 模型结构在图上不共享实例
            Object.entries(data_model_type_prop).forEach(([p, v]) => {
                const model_node_type = 'model';
                const model_prop_id = `${model_type_id}_with_${p}`;
                nodes[model_prop_id] = {
                    id: model_prop_id
                    , type: model_node_type
                    , value: v.label
                    , weight: data_model_type_prop_node_size
                    , color: data_model_type_prop_node_color
                };

                const model_prop_link_id = `${model_type_id}_link_${model_prop_id}`;
                links[model_prop_link_id] = {
                    id: model_prop_link_id
                    , type: model_node_type
                    , source: model_type_id
                    , target: model_prop_id
                    , value: ''
                    , weight: data_model_type_prop_link_length
                    , color: data_model_type_prop_link_color
                };
            });
        } else {
            _hierarchy(nodes, links, sub_obj, options);
        }
    });
}

export default function hierarchy(data, options) {
    const nodes = {};
    const links = {};
    data.forEach((d) => {
        Object.entries(d).forEach(([_, obj]) => {
            _hierarchy(nodes, links, obj, options);
        });
    });

    const data_nodes = [];
    const data_prop_nodes = [];
    const data_model_nodes = [];
    Object.values(nodes).forEach((node) => {
        if (node.type == 'data') {
            data_nodes.push(node);
        } else if (node.type == 'prop') {
            data_prop_nodes.push(node);
        } else if (node.type == 'model') {
            data_model_nodes.push(node);
        }
    });

    return {
        nodes: [...data_nodes, ...data_prop_nodes, ...data_model_nodes]
        , links: Object.values(links)
    };
}
