const hamburger_button = document.getElementById("hamburger-button");
const nav_bar = document.querySelector("nav");
const main = document.querySelector("main");
const groups = document.getElementById("groups");
const group_items = document.getElementById("group-items");

hamburger_button.addEventListener("click",()=>{
    if(nav_bar.style.width === "15%"){
        nav_bar.style.width = "0%";
        main.style.marginLeft = "0%";
    }
    else{
        nav_bar.style.width = "15%";
        main.style.marginLeft = "15%";
    }
});

groups.addEventListener("click", ()=>{
    if(group_items.style.display === "block"){
        group_items.style.display = "none";
    }
    else
        group_items.style.display = "block";        
});



function displayGroup(groupName){
    search_contact.value = '';
    const selectedGroup = event.target;
    if(selectedGroup.className.includes("active")){
        selectedGroup.className = selectedGroup.className.replace(" active","");
        init(address_book);
    }
    else{
        const groupList = document.getElementsByClassName("active");
        for(let i=0;i<groupList.length;i++){
            groupList[i].className = groupList[i].className.replace("active", "");
        }
        selectedGroup.className += ' active';
        const new_address_book = address_book.filter((address)=>{
            return address.group.includes(groupName);            
        });
        init(new_address_book);
    }
}








const create_new_contact = document.getElementById("create-new-contact");
const create_new_contact_modal = document.getElementById("create-new-contact-modal");

create_new_contact.addEventListener("click",()=>{
    create_new_contact_modal.style.display = "block";
    let activeGroup = activeGroupGenerator();
    if(activeGroup==null)
        activeGroup = "None";
    document.getElementById("group-new-contact").value=activeGroup;
});

const saveContact = (event)=>{
    const newContact = {
        id: generateAddressID(),
        name: `${document.getElementById("name-new-contact").value}`,
        phone: `${document.getElementById("phone-new-contact").value}`,
        email: `${document.getElementById("email-new-contact").value}`,
        group: `${document.getElementById("group-new-contact").value}`,
        address: `${document.getElementById("address-new-contact").value}`,
        birth_day: `${document.getElementById("birth-day-new-contact").value}`,
        photo: `${document.getElementById("photo-new-contact").value}`,
    }
    address_book.push(newContact);
    init(address_book);
    closeModal(create_new_contact_modal);
}

const saveEditedContact = (htmlObject)=>{
    const addressID = htmlObject[0].id;
    const index = address_book.findIndex((element)=>{
        return element.id==addressID;
    })
    address_book[index].name = document.getElementById("name-edit-contact").value;
    address_book[index].phone = document.getElementById("phone-edit-contact").value;
    address_book[index].email = document.getElementById("email-edit-contact").value;
    address_book[index].group = document.getElementById("group-edit-contact").value;
    address_book[index].address = document.getElementById("address-edit-contact").value;
    address_book[index].birth_day = document.getElementById("birth-day-edit-contact").value;
    address_book[index].photo = document.getElementById("photo-edit-contact").value;

    init(address_book);
    closeModal(editContactModal);
}

const closeModal = (modal)=>{
    modal.style.display = "none";
}

function closeCreateNewContactModal(){
    closeModal(create_new_contact_modal);
}

function closeEditContactModal(){
    closeModal(editContactModal);
}

window.addEventListener("click", (event)=>{
    if(event.target === create_new_contact_modal)
        closeModal(create_new_contact_modal);
    else if(event.target === view_contact_modal)
        closeModal(view_contact_modal);
    else if(event.target === editContactModal)
        closeModal(editContactModal);
})








const view_contact_modal = document.getElementById("view-contact-modal");

function displayContact(event){
    address = address_book.find((addr)=>{
        return addr.id == event.currentTarget.id;
    });
    view_contact_modal.style.display = "block";     
    view_contact_modal.children[0].innerHTML = `
    <h2>Contact Details</h2>
    <div class="modal-flex-area">
        <div class="flex-item-1">
            <img src="./images/user_profile.png">
        </div>
        <div class="flex-item-2">
            <table>
                <tr>
                    <td class="col1">Name</td>
                    <td>${address.name}</td>
                </tr>
                <tr>
                    <td class="col1">Phone</td>
                    <td>${address.phone}</td>
                </tr>     
                <tr>
                    <td class="col1">Email</td>
                    <td>${address.email}</td>
                </tr>                        
                <tr>
                    <td class="col1">Group</td>
                    <td>${address.group}</td>
                </tr>        
                <tr>
                    <td class="col1">Birthday</td>
                    <td>${address.birth_day}</td>
                </tr>                
                <tr>
                    <td class="col1">Address</td>
                    <td>${address.address}</td>
                </tr>
            </table>
        </div>
    </div>`;
}



const editContactModal = document.getElementById("edit-contact-modal");

function handleAddressEdit(addressID){
    editContactModal.style.display = "block";
    const address = address_book.find((addr)=>{
        return addr.id == addressID;
    }); 
    editContactModal.children[0].innerHTML = 
    `<h2>Edit Contact</h2>
    <div class="modal-flex-area">
        <div class="flex-item-1">
            <img src="./images/user_profile.png">
        </div>
        <div class="flex-item-2">
            <form onsubmit="saveEditedContact(${address.id}); return false;">
                <table>
                    <tr>
                        <td class="col1"><label for="name-edit-contact">Name</label></td>
                        <td><input type="text" id="name-edit-contact" name="Name" value='${address.name}' required></td>
                    </tr>
                    <tr>
                        <td class="col1"><label for="phone-edit-contact">Phone</label></td>
                        <td><input type="tel" id="phone-edit-contact" name="Phone" pattern="[1-9]{1}[0-9]{9}" value=${address.phone}></td>
                    </tr>
                    <tr>
                        <td class="col1"><label for="email-edit-contact">Email</label></td>
                        <td> <input type="email" id="email-edit-contact" name="Email" value=${address.email}></td>
                    </tr>
                    <tr>
                        <td class="col1"><label for="group-edit-contact">Group</label></td>
                        <td><select id="group-edit-contact" name="Group">
                            <option value="None" ${"None"==address.group?"selected":""}>None</option>
                            <option value="Favourites" ${"Favourites"==address.group?"selected":""}>Favourites</option>
                            <option value="Home" ${"Home"==address.group?"selected":""}>Home</option>
                            <option value="Work" ${"Work"==address.group?"selected":""}>Work</option>
                        </select></td>
                    </tr>
                    <tr>
                        <td class="col1"><label for="birth-day-edit-contact">Birthday</label></td>
                        <td><input type="date" id="birth-day-edit-contact" name="Birthday" value=${address.birth_day}                  
                    </tr>
                    <tr>
                        <td class="col1"><label for="address-edit-contact">Address</label></td>
                        <td><textarea id="address-edit-contact" name="Address">${address.address}</textarea></td>
                    </tr>
                    <tr>
                        <td class="col1"><label for="photo-edit-contact">Photo</label></td>
                        <td><input type="file" accept="image/gif, image/jpeg, image/png" id="photo-edit-contact" name="Photo" value=${address.photo}></input></td>
                    </tr>
                </table>
                <div id="buttons">
                    <input type="button" value="Cancel" onclick="closeEditContactModal()" />
                    <input type="submit" value="Submit" />
                <div>
            </form>                        
        </div>
    </div>`
}




const search_contact = document.getElementById("search-contact");
handleChange = ()=>{
    let timeout;
    return function(event){
        clearTimeout(timeout);
        timeout = setTimeout((previous)=>{
            const name = event.target.value;
            const matchedAddress = address_book.filter((address)=>{             
                if(address.name.toLowerCase().search(name.toLowerCase()) !== -1)
                    return true;
                else if(address.email.toLowerCase().search(name.toLowerCase()) !== -1)
                    return true;
                else if(address.phone.search(name.toLowerCase()) !== -1)
                    return true;
                else
                    return false
            });
            init(matchedAddress);            
        }, 100);
    }
}
search_contact.addEventListener("input",handleChange());




function activeGroupGenerator(){
    const groupItems = document.getElementById("group-items");
    const activeGroupList = groupItems.getElementsByClassName("active");
    if(activeGroupList.length==0)
        return null;
    else{
        const activeGroup = activeGroupList[0].id.slice(12);
        return activeGroup;
    }
}

function activeGroupListGenerator(addressBook){
    
    const activeGroup = activeGroupGenerator();
    if(activeGroup == null)
        return addressBook;
    else{
        return addressBook.filter(address=>{
            if(address.group.includes(activeGroup))
                return true;
            else
                return false;
        });
    }
}

function generateAddressID(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

const address_book_area = document.getElementById("address-book-area");
const address_book = [
    {id: generateAddressID(),
    name: "Enakshi Mehra",
    phone: "9374134502",
    email: "Enakshi48@yahoo.co.in",
    group: "Favourites",
    address: "Chapalfurt, WB 494 600",
    birth_day: "1990-12-14",
    photo: "",},
    {id: generateAddressID(),
    name: "Devadatt Kaniyar",
    phone: "7500283517",
    email: "Devadatt74@gmail.com",
    group: "Work",
    address: "West Devakberg, NL 872 861",
    birth_day: "1991-01-24",
    photo: "",},
    {id: generateAddressID(),
    name: "Sheela Khan",
    phone: "6155925572",
    email: "Sheela_Khan21@gmail.com",
    group: "Work",
    address: "Lake Jaya, NL 285 822",
    birth_day: "1984-06-12",
    photo: "",},
    {id: generateAddressID(),
    name: "Karan Nair",
    phone: "6155925572",
    email: "Karan99@yahoo.co.in",
    group: "Favourites",
    address: "Dhyaneshburgh, PY 886 773",
    birth_day: "1943-04-12",
    photo: "",},
    {id: generateAddressID(),
    name: "Vaishvi Abbott",
    phone: "6155925572",
    email: "Vaishvi85@gmail.com",
    group: "Work",
    address: "North Bhanumatiside, UK 604 941",
    birth_day: "1955-04-19",
    photo: "",},
    {id: generateAddressID(),
    name: "Chatura Joshi",
    phone: "6155925572",
    email: "Chatura60@gmail.com",
    group: "Home",
    address: "Chapalfurt, WB 494 600",
    birth_day: "1988-08-22",
    photo: "",},
];

function handleAddressDelete(addressID){
    const index = address_book.findIndex((element)=>{
        return element.id==addressID;
    })
    address_book.splice(index, 1);
    init(address_book);
}

function handleAddressOptions(event){
    if(event.target.id=='placard-delete')
        handleAddressDelete(event.currentTarget.id);
    else if(event.target.id=='placard-edit')
        handleAddressEdit(event.currentTarget.id);
}

function renderAddressBook(address_book){
    address_book.forEach(element => {
        const address = document.createElement("div");
        address.className = 'placard';

        const addressField = document.createElement("table");
        addressField.id = element.id;
        addressField.addEventListener("click",displayContact);
        addressField.innerHTML = `
            <tr>
                <td class="col1">Name:</td>
                <td>${element.name}</td>
            </tr>
            <tr>
                <td class="col1">Phone:</td>
                <td>${element.phone}</td>
            </tr>
            <tr>
                <td class="col1">Email:</td>
                <td>${element.email}</td>
            </tr>
            <tr>
                <td class="col1">Group:</td>
                <td>${element.group}</td>
            </tr>`  
        
        const addressOptions = document.createElement("div");
        addressOptions.id=element.id;
        addressOptions.addEventListener("click",handleAddressOptions)
        addressOptions.innerHTML = `
            <img id="placard-delete" src="./images/delete.jpeg" width="50em" height="50em">
            <img id="placard-edit" src="./images/edit-icon-6.png" width="50em" height="50em">
        `

        address.appendChild(addressOptions);
        address.appendChild(addressField);        
        address_book_area.appendChild(address);
    });

}
function init(address_book){
    address_book_area.textContent = '';
    const activeGroupList = activeGroupListGenerator(address_book);
    activeGroupList.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase())
            return -1;
        else
            return 1;
    });
    renderAddressBook(activeGroupList);
}

init(address_book);