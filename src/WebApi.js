

const WebApi = {
    getList(callback) {
        setTimeout(() => {
            callback(['aaa','bbb','ccc']);
        },2000);
    }
}

export default WebApi;