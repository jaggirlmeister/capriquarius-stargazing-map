const $list = document.querySelector('#list');
const $add_button = document.querySelector('.handleAdd');

const dataRow = (props, index) => {
    const {_id, lat, lng, name, country, type, img, link, description} = props

    return `
        <div class="item">
            <div class="countriesAdmin">
                <div id="arrow-${index}" data="false" class="countriesAdmin">
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

            <div id="data-${index}" class="adminDescription hide">

                <div id="formWrapper">

                    <form id="adminForm${_id}">
                    <div id="locationsOptions">

                    <div class="inputDiv latLng">
                        <input id="form_field_lat${_id}" type="text" name="lat" disabled value="${lat}">
                        <label>Latitude</label>
                    </div>

                    <div class="inputDiv latLng">
                        <input id="form_field_lng${_id}" type="text" name="lng" disabled value="${lng}">
                        <label>Longitude</label>
                    </div>

                    <div class="typeSelection" id="selectType${_id}">
                        <div class="inlineInput">
                            <input type="radio" data-type="National Park" id="RNationalPark${index}" name="type" disabled>
                            <label for="natPark${_id}">National Park</label>
                        </div>
                        <div class="inlineInput">
                            <input type="radio" data-type="Recreational Area" id="RRecreationalArea${index}" name="type" disabled>
                            <label for="recArea${_id}">Recreational Area</label>
                        </div>    
                        <div class="inlineInput">
                            <input type="radio" data-type="Natural Reserve" id="RNaturalReserve${index}" name="type" disabled>
                            <label for="natRes${_id}">Natural Reserve</label>
                        </div>
                        <div class="inlineInput">
                            <input type="radio" data-type="Observatory" id="RObservatory${index}" name="type" disabled>
                            <label for="obser${_id}">Observatory</label>
                        </div>
                        <div class="inlineInput">
                            <input type="radio" data-type="Aurora" id="RNorthernLights${index}" name="type" disabled>
                            <label for="aurora${_id}">Aurora</label>
                        </div>
                    </div>
                 
                    <div class="inputDiv">
                        <input id="form_field_name${_id}" type="text" name="name" disabled value="${name}">
                        <label>Name</label>
                    </div>

                    <div class="inputDiv autocomplete">
                        <input id="form_field_country${_id}" type="text" name="myCountry" disabled value="${country}">
                        <label>Country</label>
                    </div>

                    <div class="inputDiv">
                        <input type="file" id="form_field_image${_id}" name="file" disabled value="${img}">
                        <label for="imageLocation">Image</label>
                    </div>

                    <div class="inputDiv">
                        <input type="text" id="form_field_website${_id}" name="" disabled value="${link}">
                        <label>Website</label>
                    </div>

                    <div class="inputDiv">
                        <textarea type="text" id="form_field_description${_id}" name="description" disabled >${description}</textarea>
                        <label>Description</label>
                    </div>

                    <button class="form_submit" class="btn azul" type="submit">Enviar</button>

                    </div>

                    </form>
            </div>
            </div>
        </div>
    `
}

//READ
const getLocations = async (id='') => {
    
    const result = await api.getLocations();
    //console.log(result)
    if(id == ''){
        $list.innerHTML = '';
        result.forEach((element, index) => {
            $list.innerHTML += dataRow(element, index);
        });

        const $btnsDelete = document.querySelectorAll('.handleDelete');
        $btnsDelete.forEach(element => {
            element.addEventListener('click', handleClickDelete)
        });

        const $btnsEdit = document.querySelectorAll('.handleEdit');
        $btnsEdit.forEach(element => {
            element.addEventListener('click', handleClickEdit)
        });

    }else{
        const elementByID= result.find(el => id == el._id)
        return elementByID;
    }
}

getLocations();

const checkType = (type, index) =>{
    type = type.replace(/\s+/g, '');
    const typeRadioBtn = document.querySelector('#R'+type+index);
    typeRadioBtn.setAttribute("checked", "checked");
}

// EDIT

const updateLocation = async (data, id) => {
    const result = await api.updateCervecerias(data, id);
    console.log('Updated', result)
    getLocations();
}

const editForm = (id, form) =>{
    const $form_field_lat = document.querySelector('#form_field_lat'+id);
    const $form_field_lng = document.querySelector('#form_field_lng'+id);
    const $form_field_description = document.querySelector('#form_field_description'+id);
    const $form_field_name = document.querySelector('#form_field_name'+id);
    const $form_field_website = document.querySelector('#form_field_website'+id);
    const $form_field_image = document.querySelector('#form_field_image'+id);
    const $form_field_country = document.querySelector('#form_field_country'+id);
    const $radio_buttons = document.querySelectorAll('#selectType'+id+' > .inlineInput > input');
    const $form = form;
    let typeValue;
    console.log($form_field_image);

    $radio_buttons.forEach(button =>{
        button.removeAttribute('disabled');
    })
    
    $form_field_lat.removeAttribute('disabled');
    $form_field_lng.removeAttribute('disabled');
    $form_field_description.removeAttribute('disabled');
    $form_field_name.removeAttribute('disabled');
    $form_field_website.removeAttribute('disabled');
    $form_field_image.removeAttribute('disabled');
    $form_field_country.removeAttribute('disabled');

    $form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("hola")
        
        $radio_buttons.forEach(radioBtn =>{
            if(radioBtn.checked){
                typeValue = radioBtn.dataset.type;
            }
        })
        
        /*
        const formData = {
            "lat": $form_field_lat.value,
            "lng": $form_field_lng.value,
            "name": $form_field_name.value,
            "country": $form_field_country.value,
            "link": $form_field_website.value,
            "description": $form_field_description.value,
            "type": typeValue
        }

        updateLocation(formData, id);
        */
        
    });
}

const handleClickEdit = async () => {
    const id = event.target.dataset.id;
    const $form = document.querySelector('#adminForm'+id);
    editForm(id, $form);
}



// DELETE

const confirmation = (id) =>{
    const $confirmationWindow = document.getElementById('#confirmationWindow');
    $confirmationWindow.removeAttribute('hide');
}

const deleteLocation = async (id) => {
    const result = await api.deleteLocations(id);
    console.log('Deleted')
    getLocations();
}

const handleClickDelete = async () => {
    const id = event.target.dataset.id;
    deleteCerveceria(id);
    //confirmation(id);
}


/*Handle Delete

    //Handle Edit
    if(event.target.matches('.handleEdit')){
        const id = event.target.dataset.id;
        console.log(id);
        editForm(id)
        
        const reg = await getLocations(id);
        console.log(reg)
        completeForm(reg)
       
    }
    
    document.addEventListener('click', function(){
        event.preventDefault();
        if(event.target.matches('.handleDelete')){
            const id = event.target.dataset.id;
            console.log('clickeado en el delete', id);
            confirmation(id);
        }

}, false)

*/