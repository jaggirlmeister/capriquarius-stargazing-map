const $list = document.querySelector('#list');
const $add_button = document.querySelector('.handleAdd');
let editBtnClick = true;
let saveImg;

const dataRow = (props, index) => {
    const {_id, lat, lng, name, country, type, img, link, description} = props

    return `
        <div class="item">
            <div class="countriesAdmin">
                <div id="arrow-${_id}" class="countriesAdmin">
                    <img class="down" data-id="${_id}" src="assets/images/down.svg" width="25px">
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
                <a href="#" data-id="${_id}" id="edit${_id}" class="red btn handleEdit">Edit</a>
                <a href="#" data-id="${_id}" id="delete${_id}" class="green btn handleDelete">Delete</a>
            </div>

            <div id="data-${index}" data-info="info${_id}" class="adminDescription hide">

                <div id="formWrapper">

                    <form id="adminForm${_id}">

                        <div id="locationsOptions">

                            <div class="inputDiv" id="imageLocation">
                            
                                <div class="container">
                                    <img id="img${_id}" class="actualImage" src="${img}" alt="Image preview...">
                                    <input type="file" id="form_field_image${_id}" name="file" disabled value="${img}" class="hide">
                                    <label class="uploadLabel hide"  id="label${_id}" for="form_field_image${_id}">  
                                        <img src="/assets/images/upload.svg" id="uploadImage${_id}" class="upload">
                                    </label>
                                    <div class="editImage"></div>    
                                </div>

                            </div>

                            <div class="inputDiv latLng">
                                <input id="form_field_lat${_id}" type="text" name="lat" disabled value="${lat}" required>
                                <label>Latitude</label>
                            </div>

                            <div class="inputDiv latLng">
                                <input id="form_field_lng${_id}" type="text" name="lng" disabled value="${lng}" required>
                                <label>Longitude</label>
                            </div>

                            <div class="typeSelection" id="selectType${_id}">
                                <div class="inlineInput">
                                    <input type="radio" data-type="National Park" id="RNationalPark${index}" name="type" disabled required>
                                    <label for="natPark${_id}">National Park</label>
                                </div>
                                <div class="inlineInput">
                                    <input type="radio" data-type="Recreational Area" id="RRecreationalArea${index}" name="type" disabled>
                                    <label for="recArea${_id}">Recreational Area</label>
                                </div>    
                                <div class="inlineInput">
                                    <input type="radio" data-type="Nature Reserve" id="RNatureReserve${index}" name="type" disabled>
                                    <label for="natRes${_id}">Natural Reserve</label>
                                </div>
                                <div class="inlineInput">
                                    <input type="radio" data-type="Observatory" id="RObservatory${index}" name="type" disabled>
                                    <label for="obser${_id}">Observatory</label>
                                </div>
                                <div class="inlineInput">
                                    <input type="radio" data-type="Northern Lights" id="RNorthernLights${index}" name="type" disabled>
                                    <label for="aurora${_id}">Aurora</label>
                                </div>
                            </div>
                        
                            <div class="inputDiv">
                                <input id="form_field_name${_id}" type="text" name="name" disabled value="${name}" required>
                                <label>Name</label>
                            </div>

                            <div class="inputDiv autocomplete">
                                <input id="form_field_country${_id}" type="text" name="myCountry" disabled value="${country}" required>
                                <label>Country</label>
                            </div>

                            <div class="inputDiv websiteInput">
                                <input type="text" id="form_field_website${_id}" name="" disabled value="${link}" required>
                                <label>Website</label>
                            </div>

                            <div class="inputDiv">
                                <textarea type="text" id="form_field_description${_id}" name="description" disabled required>${description}</textarea>
                                <label>Description</label>
                            </div>

                            <button class="btn disabledState azul" id="form_button${_id}" type="submit" disabled>Enviar</button>

                        </div>

                    </form>
            </div>
            </div>
        </div>
    `
}

const getLocations = async (id='') => { 

    const result = await api.getLocations();
    if(id == ''){
        $list.innerHTML = '';
        result.forEach((element, index) => {
            $list.innerHTML += dataRow(element, index);
        });
        handleButtons(result);
    }else{
        const elementByID= result.find(el => id == el._id)
        return elementByID;
    }

}

const handleButtons = (result) =>{

    const downBtn = document.querySelectorAll('.down');
    downBtn.forEach((button,index) => {
        button.addEventListener('click', (e) => { 
            showLocationItem(index);
        }); 
    });

    const $btnsDelete = document.querySelectorAll('.handleDelete');
    $btnsDelete.forEach(element => {
        element.addEventListener('click', handleClickDelete)
    });

    const $btnsEdit = document.querySelectorAll('.handleEdit');
    $btnsEdit.forEach(element => {
        element.addEventListener('click', handleClickEdit)
    });

    /*
    const $orderBtn = document.querySelector('#orderByName');
    $orderBtn.addEventListener('click', ()=>{
        orderByName(result);
    });

    const $orderBtnCountry = document.querySelector('#orderByCountry');
    $orderBtnCountry.addEventListener('click', ()=>{
        orderByCountry(result);
    });

    const $orderBtnDefault = document.querySelector('#orderByDefault');
    $orderBtnDefault.addEventListener('click', ()=>{
        getLocations();
    });
    */
   
}

const showLocationItem = (index) =>{
        
    const id = event.target.dataset.id;
    const downBtn = document.querySelectorAll('.down');
    let descriptionAdmin = document.querySelectorAll('.adminDescription');
    
    let locations = Array.from(descriptionAdmin);
    let locationPicked = descriptionAdmin[index];
    locations.splice(index, 1);

    checkType(types[index], index);

    if(locationPicked.classList.contains('hide')){
        locationPicked.classList.remove("hide");
        downBtn[index].classList.add("rotate");
        locations.forEach(anotherLocation => {
            anotherLocation.classList.add("hide");
        })
    } else {
        locationPicked.classList.add('hide');
        downBtn[index].classList.remove("rotate");
        blockEdit(id);
    }

}

const blockEdit = (id) => {

    const $form_field_lat = document.querySelector('#form_field_lat'+id);
    const $form_field_lng = document.querySelector('#form_field_lng'+id);
    const $form_field_description = document.querySelector('#form_field_description'+id);
    const $form_field_name = document.querySelector('#form_field_name'+id);
    const $form_field_website = document.querySelector('#form_field_website'+id);
    const $form_field_image = document.querySelector('#form_field_image'+id);
    const $form_field_country = document.querySelector('#form_field_country'+id);
    const $form_button = document.querySelector("#form_button"+id);
    const $radio_buttons = document.querySelectorAll('#selectType'+id+' > .inlineInput > input');
    const $uploadImage = document.querySelector('#label'+id);
    const $editBtn = document.querySelector('#edit'+id);
    const $image = document.querySelector('#img'+id);
    const $locationInfo = document.querySelector(`[data-info="info${id}"]`);
    const $form = form;

    //locationPicked.classList.add('hide');
    $form_field_lat.disabled = true;
    $form_field_lng.disabled = true;
    $form_field_description.disabled = true;
    $form_field_name.disabled = true;
    $form_field_website.disabled = true;
    $form_field_image.disabled = true;
    $form_field_country.disabled = true;
    $radio_buttons.forEach(button =>{
        button.disabled = true;
    });
    $uploadImage.classList.add("hide");
    $image.classList.remove("blur");

    if($editBtn.innerHTML == "Cancel"){
        $image.src = saveImg;
        saveImg = undefined;
    }

    $editBtn.innerHTML = "Edit";
    editBtnClick = true;   
 
}

getLocations();

 
const checkType = (type, index) =>{
    type = type.replace(/\s+/g, ''); 
    const typeRadioBtn = document.querySelector('#R'+type+index);
    typeRadioBtn.setAttribute("checked", "checked");
}

// EDIT

const updateLocation = async (data, id) => {
    const result = await api.updateLocations(data, id);
    console.log('Updated', result)
    confirmation(id);
    $list.innerHTML = '';
    getLocations();
}

const editForm = (id, form) =>{

    // Elementos del DOM
    const $form_field_lat = document.querySelector('#form_field_lat'+id);
    const $form_field_lng = document.querySelector('#form_field_lng'+id);
    const $form_field_description = document.querySelector('#form_field_description'+id);
    const $form_field_name = document.querySelector('#form_field_name'+id);
    const $form_field_website = document.querySelector('#form_field_website'+id);
    const $form_field_image = document.querySelector('#form_field_image'+id);
    const $form_field_country = document.querySelector('#form_field_country'+id);
    const $form_button = document.querySelector("#form_button"+id);
    const $radio_buttons = document.querySelectorAll('#selectType'+id+' > .inlineInput > input');
    console.log($radio_buttons);
    const $uploadImage = document.querySelector('#label'+id);
    const $editBtn = document.querySelector('#edit'+id);
    const $image = document.querySelector('#img'+id);
    const typeSelection = document.querySelector('#selectType'+id);
    const $locationInfo = document.querySelector(`[data-info="info${id}"]`);
    const $form = form;
    let $descriptionAdminEdit = document.querySelectorAll('.adminDescription');
    let $locationsEdit = Array.from($descriptionAdminEdit);

    let typeValue;

    // Elimina la ubicación actual del array de ubicaciones
    const picked = $locationsEdit.find((element,index) => {
        if(element === $locationInfo){
            $locationsEdit.splice(index, 1);
        }
    });

    // Guarda la imagen de la ubicación para volverla a poner en caso de que se toque el botón "cancel"
    if(saveImg == undefined){
        saveImg = $image.src;
    } 

    // Blurea la imagen y muestra el icono de subida
    $uploadImage.classList.remove("hide");
    $image.classList.add("blur");

    // Muestra el formulario de la ubicación y oculta todo lo demás
    if($locationInfo.classList.contains('hide')){
        $locationInfo.classList.remove("hide");
        $locationsEdit.forEach(anotherLocation => {
            anotherLocation.classList.add("hide");
        })
    } 
  
    // Si el botón dice "Edit" (true) entonces se habilitan los campos del form
    if(editBtnClick == true){

        $editBtn.innerHTML = "Cancel";
        
        // Habilita los inputs para poder editar
        $form_field_lat.removeAttribute('disabled');
        $form_field_lng.removeAttribute('disabled');
        $form_field_description.removeAttribute('disabled');
        $form_field_name.removeAttribute('disabled');
        $form_field_website.removeAttribute('disabled');
        $form_field_image.removeAttribute('disabled');
        $form_field_country.removeAttribute('disabled');
        $form_button.removeAttribute('disabled');
        $form_button.classList.remove('disabledState');
        $form_button.classList.add('submit');
        $radio_buttons.forEach(button =>{
            button.removeAttribute('disabled');
        });

        // Guarda el valor elegido en los radio buttons 
        $radio_buttons.forEach(radioBtn =>{
            if(radioBtn.checked){
                typeValue = radioBtn.dataset.type;
            }
        })

        typeSelection.addEventListener("click", ()=>{
            typeValue = event.target.dataset.type;
        })
            
        // Convertir imagen en base64 para poder subirla a la base de datos 
        $form_field_image.addEventListener('change', ()=>{
            convertToBase64(id);
        });

        autocomplete($form_field_country, countries);
            
        // Enviar formulario a la base de datos
        $form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = {
                "lat": $form_field_lat.value,
                "lng": $form_field_lng.value,
                "name": $form_field_name.value,
                "country": $form_field_country.value,
                "img": $image.src,
                "link": $form_field_website.value,
                "description": $form_field_description.value, 
                "type": typeValue
            }
            updateLocation(formData, id);
        });

        editBtnClick = false;

    } else { // Si el botón dice "Cancel" (false) entonces se deshabilitan los campos del form

        $editBtn.innerHTML = "Edit";
        $form_button.disabled = true;
        $form_button.classList.remove('submit');
        $form_button.classList.add('disabledState');

        // Pone la imagen original si es que se toca el botón "cancel"
        $image.src = saveImg;
        saveImg = undefined;

        blockEdit(id);
    }
}

const handleClickEdit = async () => {
    const id = event.target.dataset.id;
    const $form = document.querySelector('#adminForm'+id);
    editForm(id, $form);
}

const convertToBase64 = (id) => {
    const $form_field_image = document.querySelector('#form_field_image'+id);
    const $image = document.querySelector('#img'+id);

    var file = $form_field_image.files[0];
    var reader = new FileReader();
          
    reader.onloadend = function () {
        $image.src = reader.result;
    }  
    if (file) {
        reader.readAsDataURL(file);
        $image.src = file;
        $image.classList.remove("blur");
    } else {
        $image.src = "";
    }
}

// DELETE

const deleteLocation = async (id) => {
    const result = await api.deleteLocations(id);
    console.log('Deleted')
    getLocations();
}

const confirmation = (id) =>{
    const $confirmationWindow = document.querySelector('#confirmationWindow');
    const $editConfirmation = document.querySelector('#editConfirmation');
    

    $editConfirmation.classList.remove('hide');
    setTimeout(function() {
       $editConfirmation.classList.add('hide');
    }, 3000);
    
    $delete_button.addEventListener("click", () =>{
        $confirmationWindow.classList.remove('hide');
    });
}

const locationAdded = () =>{
    const $locationAdded = document.querySelector('#locationAdded');
    $locationAdded.classList.remove('hide');
    setTimeout(function() {
        $locationAdded.classList.add('hide');
    }, 1000);
}

const deleteConfirmation = (id) =>{
    const $confirmationWindow = document.querySelector("#confirmationWindow");
    const $confirm = document.querySelector("#confirm");
    const $denied = document.querySelector("#denied");

    $confirmationWindow.classList.remove('hide');
    
    $confirm.addEventListener("click", () =>{
        deleteLocation(id);
    });

    $denied.addEventListener("click", () =>{
        $confirmationWindow.classList.add('hide');
    });
}

const handleClickDelete = async () => {
    const id = event.target.dataset.id;
    deleteConfirmation(id)
}

//CREATE
const createLocation = async (data) => {
    const result = await api.createLocation(data);
    console.log('Created', result);
    locationAdded();
    getLocations();
}

const handleClickAdd = (event) => {
    event.preventDefault();
    form();
}

const form = () =>{
    const $div = document.querySelector("#buttons");
    const $divList = document.querySelector("#addForm");
    const $backToList = document.querySelector("#backToList"); 
    $div.classList.add("hide");
    $divList.classList.remove("hide");
    $backToList.classList.remove("hide");

    $backToList.addEventListener("click", () => {
        $div.classList.remove("hide");
        $divList.classList.add("hide");
        $backToList.classList.add("hide");
    });

    const $addLat = document.querySelector('#addLat');
    const $addLng = document.querySelector('#addLng');
    const $addDescription = document.querySelector('#addDescription');
    const $addName = document.querySelector('#addName');
    const $addWebsite = document.querySelector('#addWebsite');
    const $addImgForm = document.querySelector('#addImgForm');
    const $addCountry = document.querySelector('#addCountry');
    const $addRadioButtons = document.querySelectorAll('#selectType > .inlineInput > input');
    const $uploadImage = document.querySelector('#addLabel');
    const $image = document.querySelector('#addImg');
    const $addLocationForm = document.querySelector('#addLocationForm');
    let typeValue;
    console.log($addRadioButtons);

    $addRadioButtons.forEach(radioBtn =>{
        radioBtn.addEventListener("click", ()=>{
            if(radioBtn.checked){
                typeValue = radioBtn.getAttribute("id");
            }
        })
        
    })

    autocomplete($addCountry, countries);
        
    // Convertir imagen en base64  
    $addImgForm.addEventListener('change', ()=>{
        var file = $addImgForm.files[0];
        var reader = new FileReader();
        
        reader.onloadend = function () {
            $image.src = reader.result;
        }  
        if (file) {
            reader.readAsDataURL(file);
            $image.src = file;
        } else {
            $image.src = "";
        }
    });

    $addLocationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = {
            "lat": $addLat.value,
            "lng": $addLng.value,
            "name": $addName.value,
            "country": $addCountry.value,
            "img": $image.src,
            "link": $addWebsite.value,
            "description": $addDescription.value, 
            "type": typeValue
        }
        //validate();
        createLocation(data);
    });
}

/*
const orderByName = (elements) => {
    elements.sort((a, b) => a.name.localeCompare(b.name));
    $list.innerHTML = '';
    elements.forEach((element, index) => {
        $list.innerHTML += dataRow(element, index);
    });
    handleButtons();
}

const orderByCountry = (elements) => {
    $list.innerHTML = "";
    elements.sort((a, b) => a.country.localeCompare(b.country));
    elements.forEach((element, index) => {
        $list.innerHTML += dataRow(element, index);
    });
    handleButtons();
    
}
*/

$add_button.addEventListener('click', handleClickAdd)

/*



const createLocation = () =>{
        form();
};

$add_button.addEventListener('click', createLocation);
*/


/*

<div class="">
        <div class="inlineInput">
            <input type="radio" id="RNational Park${index}" name="type">
            <label for="natPark${_id}">National Park</label>
        </div>
        <div class="inlineInput">
            <input type="radio" id="RRecreational Area${index}" name="type">
            <label for="recArea${_id}">Recreational Area</label>
        </div>    
        <div class="inlineInput">
            <input type="radio" id="RNatural Reserve${index}" name="type">
            <label for="natRes${_id}">Natural Reserve</label>
        </div>
        <div class="inlineInput">
            <input type="radio" id="RObservatory${index}" name="type">
            <label for="obser${_id}">Observatory</label>
        </div>
        <div class="inlineInput">
            <input type="radio" id="RAurora${index}" name="type">
            <label for="aurora${_id}">Aurora</label>
        </div>
    </div>



    
                                <img id="img${_id}" class="actualImage" src="${img}" alt="Image preview...">
                                <img src="/assets/images/upload.svg" id="uploadImage${_id}" class="upload">  
                                

*/