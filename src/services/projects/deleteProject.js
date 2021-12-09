import axios from 'axios'

export const deleteProject = async function(values){
    const route = 'https://desolate-journey-04573.herokuapp.com/api/project/' + values.id;
    const res = await axios.delete(route, {
        headers: {'Access-Control-Allow-Origin':'*'},
    });
    return {status:res.status, result:res.data.results};
}