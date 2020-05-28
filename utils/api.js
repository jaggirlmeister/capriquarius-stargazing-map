const baseUrl='https://stargazing-map-api-rest.now.sh/';

const apiHeaders = {
    'Content-Type' : 'application/json',
    Accept:'application/json'
}

const fetchParams = (method, data = '') =>{
    const body = data ? {body: JSON.stringify(data)} : {}
    return{
        method:method,
        mode: 'cors',
        headers: apiHeaders,
        credentials: 'same-origin',
        ...body
    }
}

const api = {
    //Funciones CRUD
    //CREATE (POST)
    createLocation: async formData => {
        const dataResponse = await fetch(baseUrl + 'locations', fetchParams('POST', formData));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },

    //READ (GET)
    getLocations: async() => {
        const dataResponse = await fetch(baseUrl + 'locations', fetchParams('GET'));
        const dataInfo = await dataResponse.json();

        return dataInfo;
    },

    //UPDATE (PUT)
    updateLocations: async (formData,id) => {
        const dataResponse = await fetch(baseUrl + 'location/' + id, fetchParams('PUT', formData));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },

    //DELETE
    deleteLocations: async id => {
        const dataResponse = await fetch(baseUrl + 'location/' + id, fetchParams('DELETE'));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    }
}