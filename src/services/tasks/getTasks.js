import axios from 'axios'

export const getTasks = async function(id_project){
    const route = 'https://desolate-journey-04573.herokuapp.com/api/task/'+id_project;
    const res = await axios.get(route, {
        headers: {'Access-Control-Allow-Origin':'http://localhost:3000'},
    });
    console.log(res)
    return [res.status, res.data.results];
}