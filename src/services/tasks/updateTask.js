import axios from 'axios'

export const updateTask = async function(id_project, id_task, values){
    const route = 'https://desolate-journey-04573.herokuapp.com/api/task';
    const res = await axios.put(route, {
        headers: {'Access-Control-Allow-Origin':'http://localhost:3000'},
        id: id_task,
        fields: ["name", "description","state"],
        values: [values.name,values.description,values.state],
        id_project: id_project
    });
    return {status: res.status, result:res.data.results};
}