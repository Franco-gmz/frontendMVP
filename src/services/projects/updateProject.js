import axios from 'axios'

export const updateProject = async function(id,data){
    console.log(id, data)
    const route = 'https://desolate-journey-04573.herokuapp.com/api/project';
    console.log(data);
    console.log("id: ",id);
    const res = await axios.put(route,
        {
            headers: {'Access-Control-Allow-Origin':'*','content-type':'application/json'},
            id: id,
            fields: ["name", "description","start","finish","state","leader"],
            values: [data.name,data.description,data.start,data.finish,data.state,data.leader || 0]
    });
    return {status:res.status, result:res.data.results};
}