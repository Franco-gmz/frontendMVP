import axios from 'axios'

export const createProject = async function(data){
    const route = 'https://desolate-journey-04573.herokuapp.com/api/project';
    const res = await axios.post(route,
        {
            headers: {'Access-Control-Allow-Origin':'*',
            'content-type':'application/json'},
            name: data.name,
            description: data.description,
            start: data.start,
            finish: data.finish,
            state: data.state,
            leader: data.leader
    });
    return {status:res.status, result:res.data.results};
}