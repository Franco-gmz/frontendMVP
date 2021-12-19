/*import axios from 'axios'

export const deleteFromProjectTeam = async function(id, team){
    console.log("from delete",team, id)
    const route = 'https://desolate-journey-04573.herokuapp.com/api/team/project/'+id+'/'+team;
    const res = await axios.delete(route, {
        headers: {'Access-Control-Allow-Origin':'*'},
    });
    return {status:res.status, result:res.data.results};
}*/