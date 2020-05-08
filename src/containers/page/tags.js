import { useEffect, useState } from 'react'
import axios from 'axios'
import { Select, Spin } from 'antd'
import { SUCCESS } from 'config'
const { Option } = Select;

const createValue = (listIds, listModel) => {
    if(!listIds || !listModel)
        return [];
    let listValues = listModel.filter(obj => {
        return listIds.includes(obj.id)
    })
    if(listValues.length > 0) {
        return listValues.map(item => {
            return { value: item.id.toString(), label: item.name }
        })
    }
    return [];
}

const Tags =  props => {

    const [mock, setMock] = useState({
        data: [],
        value: createValue(props.value, props.data),
        fetching: false
    });

    useEffect(() => {
        props.setListTags(mock.value);
    },[]);

    const handleChange = value => {
        setMock({
            ...mock,
            value,
            data: [],
            fetching: false,
        });
        props.setListTags(value);
    };

    const fetchUser = value => {
        setMock({...mock, data: [], fetching: true });
        axios.get(props.urlFetch + '?name=' + value).then(response => response.data)
        .then(body => {
            if(body.errorCode !== SUCCESS) {
                Promise.reject(body.message);
            }
            const data = body.data.map(res => ({
                value: res.id,
                label: res.name
            }));
            setMock({...mock, data, fetching: false });
        }).catch(ex => {
            console.log(ex.message)
        });
    };

    return <>
        <label>Danh sách {props.name}</label>
        <Select
            mode="multiple"
            labelInValue
            value={mock.value}
            placeholder={`Thêm ${props.name}`}
            notFoundContent={mock.fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={fetchUser}
            onChange={handleChange}
            style={{ width: '100%', marginTop:8, marginBottom:15 }} >
            {mock.data.map(d => (
                <Option key={d.value}>{d.label}</Option>
            ))}
        </Select>
    </>
}

Tags.defaultProps = {
    value: [],
    data: [],
    name: 'tags',
    urlFetch: 'https://randomuser.me/api/?results=5'
}

export default Tags;
