import axios from 'axios'

export const getProjectHours = async function(id){
    const route = 'https://arcane-journey-13639.herokuapp.com/reports/time/' + id;
    const res = await axios.get(route, {headers: {'Access-Control-Allow-Origin':'*'}});
    return parseInt(parseInt(res.data.data)/60);
}