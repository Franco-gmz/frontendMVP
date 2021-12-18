import axios from 'axios'

export const addTaskTeam = async function(id, team){
    const route = 'https://desolate-journey-04573.herokuapp.com/api/team/task';
    const res = await axios.put(route, {
        headers: {'Access-Control-Allow-Origin':'*'},
        id: id,
        team: team
    });
    return {status:res.status, result:res.data.results};
}