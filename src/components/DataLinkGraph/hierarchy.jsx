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

export const node_types = {
    data: 'data'
    , prop: 'prop'
    , model: 'model'
};

function is_a_data(obj) {
    return !!obj.id && !!obj.model_type;
}

function _hierarchy(nodes, links, obj, options, node_graph) {
    if (!is_a_data(obj)) {
        return;
    }

    const data_id = obj.id;
    const data_model_type_prop = obj.model_type.prop;
    const data_node_type = node_types.data;

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
        const sub_data_node_type = is_a_sub_data ? node_types.data : (prop == 'model_type' ? node_types.model : node_types.prop);
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

            switch(sub_data_node_type) {
                case node_types.data: {
                    const data_node_graph = node_graph.data;
                    data_node_graph[data_id] = data_node_graph[data_id] || {sources: [], targets: []};
                    data_node_graph[sub_data_node_id] = data_node_graph[sub_data_node_id] || {sources: [], targets: []};

                    data_node_graph[data_id].targets.push(sub_data_node_id);
                    data_node_graph[sub_data_node_id].sources.push(data_id);
                }
                    break;
                case node_types.model: {
                    const model_node_graph = node_graph.model;
                    model_node_graph[data_id] = model_node_graph[data_id] || [];

                    model_node_graph[data_id].push(sub_data_node_id);
                }
                    break;
                case node_types.prop: {
                    const prop_node_graph = node_graph.prop;
                    prop_node_graph[data_id] = prop_node_graph[data_id] || [];

                    prop_node_graph[data_id].push(sub_data_node_id);
                }
                    break;
            }
        } else {
            return; // break cycle
        }

        if (prop == 'model_type') {
            const model_type_id = sub_data_node_id;
            // 模型结构在图上不共享实例
            Object.entries(data_model_type_prop).forEach(([p, v]) => {
                const model_node_type = node_types.model;

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
            _hierarchy(nodes, links, sub_obj, options, node_graph);
        }
    });
}

function graph_to_sorted_nodes(graph) {
    const graph_keys = Object.keys(graph);
    const graph_key_used_map = graph_keys.reduce((map, key) => {map[key] = false; return map;}, {});

    const traveller = function(sources) {
        return sources.reduce((ids, key) => {
            if (graph_key_used_map[key]) {
                return ids;
            }
            graph_key_used_map[key] = true;

            const s = graph[key].sources;
            const t = graph[key].targets;

            return ids.concat(traveller(s), key, traveller(t));
        }, []);
    };

    return traveller(graph_keys);
}

export default function hierarchy(data, options) {
    const nodes = {};
    const links = {};
    const node_graph = {data: {}, prop: {}, model: {}};
    data.forEach((d) => {
        Object.entries(d).forEach(([_, obj]) => {
            _hierarchy(nodes, links, obj, options, node_graph);
        });
    });

    const data_nodes = [];
    const data_prop_nodes = [];
    const data_model_nodes = [];

    const sorted_data_graph_node_ids = graph_to_sorted_nodes(node_graph.data);
    sorted_data_graph_node_ids.forEach((data_id) => {
        data_nodes.push(nodes[data_id]);
        nodes[data_id] = null;

        // (node_graph.prop[data_id] || []).forEach((prop_id) => {
        //     data_prop_nodes.push(nodes[prop_id]);
        //     nodes[prop_id] = null;
        // });

        // (node_graph.model[data_id] || []).forEach((model_id) => {
        //     data_model_nodes.push(nodes[model_id]);
        //     nodes[model_id] = null;
        // });
    });

    Object.values(nodes).forEach((node) => {
        if (!node) {
            return;
        }

        // 孤立数据节点
        switch(node.type) {
            case node_types.data:
                data_nodes.push(node);
                break;
            case node_types.model:
                data_model_nodes.push(node);
                break;
            case node_types.prop:
                data_prop_nodes.push(node);
                break;
        }
    });

    return {
        nodes: [].concat(data_nodes, data_prop_nodes, data_model_nodes)
        , links: Object.values(links)
    };
}
