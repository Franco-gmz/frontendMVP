import axios from 'axios'

export const createTask = async function(id_project, values){
    const route = 'https://desolate-journey-04573.herokuapp.com/api/task';
    const res = await axios.post(route, {
        headers: {'Access-Control-Allow-Origin':'http://localhost:3000'},
        name : values.name,
        description: values.description,
        state: values.state,
        id_project: id_project
    });
    return {status:res.status, result:res.data.results};
}