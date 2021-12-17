import axios from 'axios'

export const getProject = async function(id){
    const route = 'https://desolate-journey-04573.herokuapp.com/api/project/' + id;
    const res = await axios.get(route, {headers: {'Access-Control-Allow-Origin':'*'}});
    return {status:res.status, result:res.data.results[0]};
}