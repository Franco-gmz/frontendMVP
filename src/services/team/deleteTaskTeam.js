import axios from 'axios'

export const deleteTaskTeam = async function(id, team){
    const route = 'https://desolate-journey-04573.herokuapp.com/api/team/task/'+id+'/'+team;
    const res = await axios.delete(route, {
        headers: {'Access-Control-Allow-Origin':'*'}
    });
    return {status:res.status, result:res.data.results};
}