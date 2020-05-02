import axios from 'axios'
import humps from 'humps'
import config from 'config'

const createParams = (param) => {
    var str = "";
    for (var key in param) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(param[key]);
    }
    return str;
}

export const getList = (api, page = 0, filter= null) => {
    const path = `${config.gateway}/${api}?page=${page}&` + (filter !== null ? createParams(filter) : '');
    return axios.get(path).then(res => {
        return humps.camelizeKeys(res.data)
    })
}

export const fetch = (api, filter= null) => {
    return getList(api, 0, filter)
}

export const post = (api, input) => {
    const path = `${config.gateway}/${api}`;
    return axios.post(path, input).then(res => {
        return humps.camelizeKeys(res.data)
    })
}
