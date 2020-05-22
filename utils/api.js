const baseUrl='http://localhost:3000/';

const apiHeaders = {
    'Content-Type' : 'application/json',
    Accept:'application/json'
}

const fetchParams = (method, data = '') =>{
    const body = data ? {body: JSON.stringify(data)} : {}
    return{
        method:method,
        headers: apiHeaders,
        credentials: 'same-origin',
        ...body
    }
}

const api = {
    //GET
    getLocations: async() => {
        const dataResponse = await fetch(baseUrl + 'locations', fetchParams('GET'));
        const dataInfo = await dataResponse.json();

        return dataInfo;
    },

    //DELETE

    deleteLocations: async id => {
        const dataResponse = await fetch(baseUrl + 'location/' + id, fetchParams('DELETE'));
        const dataInfo = await dataResponse.json();

        return dataInfo;
    }



    //PUT

    //POST
}