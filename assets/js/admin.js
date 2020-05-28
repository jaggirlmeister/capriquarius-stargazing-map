const $list = document.querySelector('#list');

//Todos los valores de nuestro form 

/*
const $form_field_lat = document.querySelector('#form_field_lat');
const $form_field_lng = document.querySelector('#form_field_lng');
const $form_field_description = document.querySelector('#form_field_description');
const $form_field_type = document.querySelector('#form_field_type');
const $form_field_name = document.querySelector('#form_field_name');
const $form_field_website = document.querySelector('#form_field_website');
const $form_field_country = document.querySelector('#form_field_country');
*/

const dataRow = props => {
    const {_id, lat, lng, name, country, type, img, link, description} = props

    return `
        <div class="item">
            <div class="countriesAdmin">
                <div class="countriesAdmin">
                    <img class="down" data-id="true" src="assets/images/down.svg" width="25px">
                </div>
                <div class="list_content">
                    <div>
                        <h2>${name}</h2>
                    </div>
                    <div class="countriesAdmin">
                        <img class="flags" src="${flags[country]}"><p class="countryAdmin">${country}</p>
                    </div>
                </div>
            </div>
            <div class="btns_wrapper">
                <a href="#" data-id="${_id}" class="red btn handleEdit">Edit</a>
                <a href="#" data-id="${_id}" class="green btn handleDelete">Delete</a>
            </div>

            <div class="adminDescription hide">
                <div id="formWrapper">
                <form action="">
                <div id="locationsOptions">

                <div class="inputDiv latLng">
                    <input id="form_field_lat${_id}" type="text" name="lat" required="" disabled value="${lat}">
                    <label>Latitude</label>
                </div>

                <div class="inputDiv latLng">
                    <input id="form_field_lng${_id}" type="text" name="lng" required="" disabled value="${lng}">
                    <label>Longitude</label>
                </div>

                <div class="">
                    <div class="inlineInput">
                        <input type="radio" class="natPark" name="type" value="National Park">
                        <label for="National Park">National Park</label>
                    </div>
                    <div class="inlineInput">
                        <input type="radio" class="recArea" name="type">
                        <label>Recreational Area</label>
                    </div>    
                    <div class="inlineInput">
                        <input type="radio" class="natRes" name="type">
                        <label>Natural Reserve</label>
                    </div>
                    <div class="inlineInput">
                        <input type="radio" class="obser" name="type">
                        <label>Observatory</label>
                    </div>
                    <div class="inlineInput">
                        <input type="radio" class="aurora" name="type">
                        <label>Aurora</label>
                    </div>
                </div>

                <div class="inputDiv">
                    <input id="form_field_name${_id}" type="text" name="name" required="" disabled value="${name}">
                    <label>Name</label>
                </div>

                <div class="inputDiv autocomplete">
                    <input id="form_field_country${_id}" type="text" name="myCountry" disabled value="${country}">
                    <label>Country</label>
                </div>

                <div class="inputDiv">
                    <input type="text" id="form_field_website${_id}" name="" required="" disabled value="${link}">
                    <label>Website</label>
                </div>

                <div class="inputDiv">
                    <input type="file" id="form_field_image${_id}" name="" required="" disabled value="${img}">
                    <label>Image</label>
                </div>

                <div class="inputDiv">
                    <textarea type="text" id="form_field_description${_id}" name="description" disabled required="">${description}</textarea>
                    <label>Description</label>
                </div>

            </div>

                <input class="btn blue submitBtn" class="form_submit" type="submit" name="Send">
                </form>
            </div>
            </div>
        </div>
    `
}

const getLocations = async (id='') => {
    
    const result = await api.getLocations();
    console.log(result)
    if(id == ''){
        $list.innerHTML = '';
        result.forEach(element => {
            $list.innerHTML += dataRow(element)
        });
    }else{
        const elementByID= result.find(el => id == el._id)
        return elementByID;
    }
}

getLocations();

const deleteLocation = async (id) => {
    const result = await api.deleteLocations(id);
    console.log('Deleted')
    getLocations();
}

/*
const completeForm = (reg) => {
    const {lat, lng, name, description, type} = reg;


    //completa los valores del campo

    $form_field_lat.value = lat;
    $form_field_lng.value = lng;
    $form_field_name.value = name;
    $form_field_description.value = description;
    $form_field_lat.type = type;
}
*/

const editForm = (id) =>{
    const $form_field_lat = document.querySelector('#form_field_lat'+id);
    const $form_field_lng = document.querySelector('#form_field_lng'+id);
    const $form_field_description = document.querySelector('#form_field_description'+id);
    const $form_field_name = document.querySelector('#form_field_name'+id);
    const $form_field_website = document.querySelector('#form_field_website'+id);
    const $form_field_country = document.querySelector('#form_field_country'+id);
    
    $form_field_lat.removeAttribute('disabled');
    $form_field_lng.removeAttribute('disabled');
    $form_field_description.removeAttribute('disabled');
    $form_field_name.removeAttribute('disabled');
    $form_field_website.removeAttribute('disabled');
    $form_field_country.removeAttribute('disabled');
}


//Handle Delete
document.addEventListener('click', function(){
    event.preventDefault();
    if(event.target.matches('.handleDelete')){
        const id = event.target.dataset.id;
        console.log('clickeado en el delete', id);
        deleteLocation(id);
    }

    //Handle Edit
    if(event.target.matches('.handleEdit')){
        const id = event.target.dataset.id;
        editForm(id)
        /*
        const reg = await getLocations(id);
        console.log(reg)
        completeForm(reg)
       */
    }
    

}, false)