const $list = document.querySelector('#list');

//Todos los valores de nuestro form 

const $form_field_lat = document.querySelector('#form_field_lat');
const $form_field_lng = document.querySelector('#form_field_lng');
const $form_field_description = document.querySelector('#form_field_description');
const $form_field_type = document.querySelector('#form_field_type');
const $form_field_name = document.querySelector('#form_field_name');

const dataRow = props => {
    const {_id, lat, lng, name, country, type, description} = props

    return `
        <div class="item">
            <div class="countriesAdmin">
                <div class="countriesAdmin">
                    <img class="down" src="assets/images/down.svg" width="25px">
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
                <div class="inputDiv">
                    <input id="form_field_lat" type="text" name="lat" required="">
                    <label>Latitude</label>
                </div>
                <div class="inputDiv">
                    <input id="form_field_lng" type="text" name="lng" required="">
                    <label>Longitude</label>
                </div>
                <div class="inputDiv">
                    <input id="form_field_name" type="text" name="name" required="">
                    <label>Name</label>
                </div>
                <div class="inputDiv autocomplete">
                <input id="myInput" type="text" name="myCountry" placeholder="Country">
                </div>
                <div class="inputDiv">
                    <input type="text" id="websiteInput" name="" required="">
                    <label>Website</label>
                </div>
                <div class="inputDiv">
                    <input type="text" id="typeInput" name="" required="">
                    <label>Type</label>
                </div>
                <div class="inputDiv">
                    <textarea type="text" id="form_field_description" name="description" required=""></textarea>
                    <label>Description</label>
                </div>
            </div>

                <input class="btn blue" id="form_submit" type="submit" name="Send">
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

const completeForm = (reg) => {
    const {lat, lng, name, description, type} = reg;


    //completa los valores del campo

    $form_field_lat.value = lat;
    $form_field_lng.value = lng;
    $form_field_name.value = name;
    $form_field_description.value = description;
    $form_field_lat.type = type;
}


//Handle Delete
document.addEventListener('click', async function(){
    event.preventDefault();
    if(event.target.matches('.handleDelete')){
        const id = event.target.dataset.id;
        console.log('clickeado en el delete', id);
        deleteLocation(id);
    }

    //Handle Edit
    if(event.target.matches('.handleEdit')){
        const id = event.target.dataset.id;
        console.log('clickeado en el edit', id);
        const reg = await getLocations(id);
        console.log(reg)
        completeForm(reg)
    }

}, false)