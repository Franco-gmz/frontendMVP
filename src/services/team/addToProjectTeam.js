/*import axios from 'axios'

export const addToProjectTeam = async function(id_project, team){
    console.log(team)
    const route = 'https://desolate-journey-04573.herokuapp.com/api/team/project';
    const res = await axios.put(route, {
        headers: {'Access-Control-Allow-Origin':'*'},
        id: id_project,
        team: team
    });
    return {status:res.status, result:res.data.results};
}*/