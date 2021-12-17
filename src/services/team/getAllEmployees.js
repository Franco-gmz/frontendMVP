import axios from 'axios'

export const getAllEmployees = async function(){
    const route = 'https://arcane-journey-13639.herokuapp.com/employees/all';
    const res = await axios.get(route, {
        headers: {'Access-Control-Allow-Origin':'http://localhost:3000'},
    });
    return {status: res.status, results:res.data.data};
}