const hamburger_button = document.getElementById("hamburger-button");
const nav_bar = document.querySelector("nav");
const main = document.querySelector("main");
const groups = document.getElementById("groups");
const group_items = document.getElementById("group-items");

hamburger_button.addEventListener("click", () => {
    if (nav_bar.style.width === "15%") {
        nav_bar.style.width = "0%";
        main.style.marginLeft = "0%";
        hamburger_button.innerHTML = "&#10095;";
    }
    else {
        nav_bar.style.width = "15%";
        main.style.marginLeft = "15%";
        hamburger_button.innerHTML = "&#10094;";
    }
});

groups.addEventListener("click", () => {
    if (group_items.style.display === "block") {
        group_items.style.display = "none";
        groups.innerHTML = "Groups &#9660;";
    }
    else{
        group_items.style.display = "block";
        groups.innerHTML = "Groups &#9650;";
    }
});



function displayGroup(groupName) {
    search_contact.value = '';
    const selectedGroup = event.target;
    if (selectedGroup.className.includes("active")) {
        selectedGroup.className = selectedGroup.className.replace(" active", "");
        init(address_book);
    }
    else {
        const groupList = document.getElementsByClassName("active");
        for (let i = 0; i < groupList.length; i++) {
            groupList[i].className = groupList[i].className.replace("active", "");
        }
        selectedGroup.className += ' active';
        const new_address_book = address_book.filter((address) => {
            return address.group.includes(groupName);
        });
        init(new_address_book);
    }
}





const create_new_contact = document.getElementById("create-new-contact");
const create_new_contact_modal = document.getElementById("create-new-contact-modal");

create_new_contact.addEventListener("click", () => {
    create_new_contact_modal.style.display = "block";
    const formElement = create_new_contact_modal.querySelector("form");
    formElement.reset();
    let activeGroup = activeGroupGenerator();
    if (activeGroup == null)
        activeGroup = "None";
    document.getElementById("group-new-contact").value = activeGroup;
});

function getPhotoPath(path) {
    
    console.log(path);
    if(path == '')
        return "null";
    console.log(path);
    const index = path.lastIndexOf("\\");
    const photoName = path.slice(index + 1);
    return `${folderPath}${photoName}`

}

const saveContact = (event) => {
    const newContact = {
        id: generateAddressID(),
        name: `${document.getElementById("name-new-contact").value}`,
        phone: `${document.getElementById("phone-new-contact").value}`,
        email: `${document.getElementById("email-new-contact").value}`,
        group: `${document.getElementById("group-new-contact").value}`,
        address: `${document.getElementById("address-new-contact").value}`,
        birth_day: `${document.getElementById("birth-day-new-contact").value}`,
        photo: `${getPhotoPath(document.getElementById("photo-new-contact").value)}`,
        dateCreated: new Date().toLocaleDateString(),
    }
    address_book.push(newContact);
    init(address_book);
    closeModal(create_new_contact_modal);
}

const saveEditedContact = (address) => {
    
    const addressID = address.id;
    console.log(addressID)
    const index = address_book.findIndex((element) => {
        return element.id == addressID;
    })
    address_book[index].name = document.getElementById("name-edit-contact").value;
    address_book[index].phone = document.getElementById("phone-edit-contact").value;
    address_book[index].email = document.getElementById("email-edit-contact").value;
    address_book[index].group = document.getElementById("group-edit-contact").value;
    address_book[index].address = document.getElementById("address-edit-contact").value;
    address_book[index].birth_day = document.getElementById("birth-day-edit-contact").value;
    const editedPhoto = `${getPhotoPath(document.getElementById("photo-edit-contact").value)}`;
    if(editedPhoto != "null")
        address_book[index].photo = editedPhoto;
    init(address_book);
    closeModal(editContactModal);
}

const closeModal = (modal) => {
    modal.style.display = "none";
}

function closeCreateNewContactModal() {
    closeModal(create_new_contact_modal);
}

function closeEditContactModal() {
    closeModal(editContactModal);
}

window.addEventListener("click", (event) => {
    if (event.target === create_new_contact_modal)
        closeModal(create_new_contact_modal);
    else if (event.target === view_contact_modal)
        closeModal(view_contact_modal);
    else if (event.target === editContactModal)
        closeModal(editContactModal);
})








const view_contact_modal = document.getElementById("view-contact-modal");

function displayContact(addressID) {
    address = address_book.find((addr) => {
        return addr.id == addressID;
    });
    view_contact_modal.style.display = "block";                 //"./images/user_profile.png"
    view_contact_modal.children[0].innerHTML = `
    <h2>Contact Details</h2>
    <div class="modal-flex-area">
        <div class="flex-item-1">
            <img src=${(address.photo !== "null" )? address.photo : './images/user_profile.png'} width="100%" height="100%">
        </div>
        <div class="flex-item-2">
            <table>
                <tr>
                    <td class="col1">Name</td>
                    <td class="col2">${address.name}</td>
                </tr>
                <tr>
                    <td class="col1">Phone</td>
                    <td class="col2">${address.phone}</td>
                </tr>     
                <tr>
                    <td class="col1">Email</td>
                    <td class="col2">${address.email}</td>
                </tr>                        
                <tr>
                    <td class="col1">Group</td>
                    <td class="col2">${address.group}</td>
                </tr>        
                <tr>
                    <td class="col1">Date of birth</td>
                    <td class="col2">${address.birth_day}</td>
                </tr>                
                <tr>
                    <td class="col1">Address</td>
                    <td class="col2">${address.address}</td>
                </tr>
            </table>
        </div>
    </div>`;
}



const editContactModal = document.getElementById("edit-contact-modal");

function handleAddressEdit(addressID) {
    editContactModal.style.display = "block";
    const address = address_book.find((addr) => {
        return addr.id == addressID;
    });
    editContactModal.children[0].innerHTML =
        `<h2>Edit Contact</h2>
    <div class="modal-flex-area">
        <div class="flex-item-1">
            <img src=${address.photo!=="null" ? address.photo: './images/user_profile.png'}>
        </div>
        <div class="flex-item-2">
            <form onsubmit="return false">
                <table>
                    <tr>
                        <td class="col1"><label for="name-edit-contact">Name</label></td>
                        <td class="col2"><input type="text" id="name-edit-contact" name="Name" value='${address.name}' required></td>
                    </tr>
                    <tr>
                        <td class="col1"><label for="phone-edit-contact">Phone</label></td>
                        <td class="col2"><input type="tel" id="phone-edit-contact" name="Phone" pattern="[1-9]{1}[0-9]{9}" value=${address.phone}></td>
                    </tr>
                    <tr>
                        <td class="col1"><label for="email-edit-contact">Email</label></td>
                        <td class="col2"><input type="email" id="email-edit-contact" name="Email" value=${address.email}></td>
                    </tr>
                    <tr>
                        <td class="col1"><label for="group-edit-contact">Group</label></td>
                        <td class="col2"><select id="group-edit-contact" name="Group">
                            <option value="None" ${"None" == address.group ? "selected" : ""}>None</option>
                            <option value="Favourites" ${"Favourites" == address.group ? "selected" : ""}>Favourites</option>
                            <option value="Home" ${"Home" == address.group ? "selected" : ""}>Home</option>
                            <option value="Work" ${"Work" == address.group ? "selected" : ""}>Work</option>
                        </select></td>
                    </tr>
                    <tr>
                        <td class="col1"><label for="birth-day-edit-contact">Birthday</label></td>
                        <td class="col2"><input type="date" id="birth-day-edit-contact" name="Birthday" value=${address.birth_day}                  
                    </tr>
                    <tr>
                        <td class="col1"><label for="address-edit-contact">Address</label></td>
                        <td class="col2"><textarea id="address-edit-contact" name="Address">${address.address}</textarea></td>
                    </tr>
                    <tr>
                        <td class="col1"><label for="photo-edit-contact">Photo</label></td>
                        <td class="col2"><input type="file" accept="image/gif, image/jpeg, image/png" id="photo-edit-contact" name="Photo"></input></td>
                    </tr>
                </table>
                <div id="buttons">
                    <input type="button" value="Cancel" onclick="closeEditContactModal()" />
                    <input type="submit" value="Submit" onclick="saveEditedContact(${addressID});"/>
                <div>
            </form>                        
        </div>
    </div>`
}




const search_contact = document.getElementById("search-contact");
handleChange = () => {
    let timeout;
    return function (event) {
        clearTimeout(timeout);
        timeout = setTimeout((previous) => {
            const name = event.target.value;
            const matchedAddress = address_book.filter((address) => {
                if (address.name.toLowerCase().search(name.toLowerCase()) !== -1)
                    return true;
                else if (address.email.toLowerCase().search(name.toLowerCase()) !== -1)
                    return true;
                else if (address.phone.search(name.toLowerCase()) !== -1)
                    return true;
                else
                    return false
            });
            init(matchedAddress);
        }, 100);
    }
}
search_contact.addEventListener("input", handleChange());




function activeGroupGenerator() {
    const groupItems = document.getElementById("group-items");
    const activeGroupList = groupItems.getElementsByClassName("active");
    if (activeGroupList.length == 0)
        return null;
    else {
        const activeGroup = activeGroupList[0].id.slice(12);
        return activeGroup;
    }
}

function activeGroupListGenerator(addressBook) {

    const activeGroup = activeGroupGenerator();
    if (activeGroup == null)
        return addressBook;
    else {
        return addressBook.filter(address => {
            if (address.group.includes(activeGroup))
                return true;
            else
                return false;
        });
    }
}

function generateAddressID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

const folderPath = "/Users/anmol/Desktop/Practice/address-book/images/profile-image/";
const address_book_area = document.getElementById("address-book-area");
const address_book = [
    {
        id: generateAddressID(),
        name: "Enakshi Mehra",
        phone: "9374134502",
        email: "Enakshi48@yahoo.co.in",
        group: "Favourites",
        address: "Chapalfurt, WB 494 600",
        birth_day: "1990-12-14",
        photo: `${folderPath}bill-gates.jpeg`,
        dateCreated: new Date().toLocaleDateString(),
    },
    {
        id: generateAddressID(),
        name: "Devadatt Kaniyar",
        phone: "7500283517",
        email: "Devadatt74@gmail.com",
        group: "Work",
        address: "West Devakberg, NL 872 861",
        birth_day: "1991-01-24",
        photo: `${folderPath}charlie.jpeg`,
        dateCreated: new Date().toLocaleDateString(),
    },
    {
        id: generateAddressID(),
        name: "Sheela Khan",
        phone: "6155925572",
        email: "Sheela_Khan21@gmail.com",
        group: "Work",
        address: "Lake Jaya, NL 285 822",
        birth_day: "1984-06-12",
        photo: `${folderPath}elon-musk.jpeg`,
        dateCreated: new Date().toLocaleDateString(),
    },
    {
        id: generateAddressID(),
        name: "Karan Nair",
        phone: "6155925572",
        email: "Karan99@yahoo.co.in",
        group: "Favourites",
        address: "Dhyaneshburgh, PY 886 773",
        birth_day: "1943-04-12",
        photo: `${folderPath}hazard.jpeg`,
        dateCreated: new Date().toLocaleDateString(),
    },
    {
        id: generateAddressID(),
        name: "Vaishvi Abbott",
        phone: "6155925572",
        email: "Vaishvi85@gmail.com",
        group: "Work",
        address: "North Bhanumatiside, UK 604 941",
        birth_day: "1955-04-19",
        photo: `${folderPath}jack.jpeg`,
        dateCreated: new Date().toLocaleDateString(),
    },
    {
        id: generateAddressID(),
        name: "Chatura Joshi",
        phone: "6155925572",
        email: "Chatura60@gmail.com",
        group: "Home",
        address: "Chapalfurt, WB 494 600",
        birth_day: "1988-08-22",
        photo: `${folderPath}mark.jpeg`,
        dateCreated: new Date().toLocaleDateString(),
    },
];

function handleAddressDelete(addressID) {
    const index = address_book.findIndex((element) => {
        return element.id == addressID;
    })
    const result = confirm(`Are you sure you want to Delete this contact?`);
    if (result == true) {
        address_book.splice(index, 1);
        setTimeout(() => { init(address_book) }, 200);
    }
}

function handleAddressOptions(event) {
    if (event.target.id == 'placard-delete')
        handleAddressDelete(event.currentTarget.id);
    else if (event.target.id == 'placard-edit')
        handleAddressEdit(event.currentTarget.id);
    else
        displayContact(event.currentTarget.id);
}

function getInitials(name){
    const words = name.split(' ');
    let initials ='';
    words.forEach(word=>{
        initials+=word[0];
    });
    return initials;
}

function renderAddressBook(address_book) {
    address_book.forEach(element => {
        const address = document.createElement("div");
        address.className = 'placard';
        address.id=element.id;

        address.innerHTML = `
            <div class="group-initial">
                <h2>${getInitials(element.group)}</h2>
            </div>
            <div class="group-name">
                ${element.group}
            </div>
            <div class="profile" style="background-color: ${'#'+Math.floor(Math.random()*16777215).toString(16)}">
                <h1>${getInitials(element.name)}</h1>
            </div>
            <div class="profile-photo" 
                style="background-image: url('${element.photo != "null" ? element.photo : "ea"}'); background-size: cover">
            </div>            
            <div class="content">
                <h1>${element.name}</h1>
                <h2>${element.phone}</h2>
                <p>${element.email}</p>
            </div>
            <div class="date-created">
                <p>Added on: ${element.dateCreated}</p>
            </div>
            <div class="options">
                <img id="placard-edit" src="./images/edit-icon-6.png" width="30px" height="35px">
                <img id="placard-delete" src="./images/delete.jpeg" width="30px" height="35px">
            </div>
        `
        address.addEventListener("click",handleAddressOptions);

/*        const addressField = document.createElement("table");
        addressField.id = element.id;
        addressField.addEventListener("click", displayContact);
        addressField.innerHTML = `
            <tr>
                <td class="col1">Name:</td>
                <td class="col2">${element.name}</td>
            </tr>
            <tr>
                <td class="col1">Phone:</td>
                <td class="col2">${element.phone}</td>
            </tr>
            <tr>
                <td class="col1">Email:</td>
                <td class="col2">${element.email}</td>
            </tr>
            <tr>
                <td class="col1">Group:</td>
                <td class="col2">${element.group}</td>
            </tr>`

        const addressOptions = document.createElement("div");
        addressOptions.id = element.id;
        addressOptions.addEventListener("click", handleAddressOptions)
        addressOptions.innerHTML = `
            <img id="placard-delete" src="./images/delete.jpeg" width="50em" height="50em">
            <img id="placard-edit" src="./images/edit-icon-6.png" width="50em" height="50em">
        `*/

//        address.appendChild(addressOptions);
  //      address.appendChild(addressField);
        address_book_area.appendChild(address);
    });

}

function init(address_book) {
    address_book_area.textContent = '';
    const activeGroupList = activeGroupListGenerator(address_book);
    activeGroupList.sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase())
            return -1;
        else
            return 1;
    });
    renderAddressBook(activeGroupList);
}

init(address_book);