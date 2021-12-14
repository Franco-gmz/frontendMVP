import axios from 'axios'

export const deleteTask = async function(id){
    const route = 'https://desolate-journey-04573.herokuapp.com/api/task/' + id;
    const res = await axios.delete(route, {
        headers: {'Access-Control-Allow-Origin':'*'},
    });
    return {status:res.status, result:res.data.results};
}