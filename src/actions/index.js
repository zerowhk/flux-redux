let result = { };

const actions = [
    "add",
    'getList'
];

actions.forEach((action) => {
    result[action] = function (options) {
        return {
            type: action,
            ...options
        }
    }
})

export default result;