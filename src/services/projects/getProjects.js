import axios from 'axios'

export const getProjects = async function(){
    const route = 'https://desolate-journey-04573.herokuapp.com/api/project';
    const res = await axios.get(route, {headers: {'Access-Control-Allow-Origin':'*'}});
    return [res.status, res.data.results];
}