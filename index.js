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








const create_new_contact = document.getElementById("create-new-contact");
const create_new_contact_modal = document.getElementById("create-new-contact-modal");

create_new_contact.addEventListener("click",()=>{
    create_new_contact_modal.style.display = "block";
});

const saveContact = (event)=>{
    const newContact = {
        name: `${document.getElementById("name-new-contact").value}`,
        phone: `${document.getElementById("phone-new-contact").value}`,
        email: `${document.getElementById("email-new-contact").value}`,
        group: `${document.getElementById("group-new-contact").value}`,
        address: `${document.getElementById("address-new-contact").value}`,
        birth_day: `${document.getElementById("birth-day-new-contact").value}`,
        photo: "",
    }
    address_book.push(newContact);
    init(address_book);
    closeModal(create_new_contact_modal);
    //event.preventDefault();
}

const closeModal = (modal = create_new_contact_modal)=>{
    modal.style.display = "none";
}

window.addEventListener("click", (event)=>{
    if(event.target === create_new_contact_modal)
        closeModal(create_new_contact_modal);
    else if(event.target === view_contact_modal)
        closeModal(view_contact_modal);
})








const view_contact_modal = document.getElementById("view-contact-modal");

function displayContact(event){
    address = address_book.find((addr)=>{
        return addr.name == event.currentTarget.id;
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
    console.log(event.currentTarget.id, view_contact_modal.children[0]);
}









const search_contact = document.getElementById("search-contact");
handleChange = ()=>{
    let timeout;
    return function(event){
        clearTimeout(timeout);
        timeout = setTimeout((previous)=>{
            const name = event.target.value;
            new_address_book = address_book.filter((address)=>{
                if(address.name.toLowerCase().search(name.toLowerCase()) !== -1)
                    return true;
                else if(address.email.toLowerCase().search(name.toLowerCase()) !== -1)
                    return true;
                else if(address.phone.search(name.toLowerCase()) !== -1)
                    return true;
                return false;
            });
            init(new_address_book);            
        }, 100);
    }
}
search_contact.addEventListener("input",handleChange());







function displayGroup(groupName){
    const new_address_book = address_book.filter((address)=>{
        return address.group.includes(groupName);            
    });
    init(new_address_book);
}







const address_book_area = document.getElementById("address-book-area");
const address_book = [
    {name: "Enakshi Mehra",
    phone: "+919374134502",
    email: "Enakshi48@yahoo.co.in",
    group: ["Favourites"],
    address: "Chapalfurt, WB 494 600",
    birth_day: "1990-12-14",
    photo: "",},
    {name: "Devadatt Kaniyar",
    phone: "+917500283517",
    email: "Devadatt74@gmail.com",
    group: ["Work"],
    address: "West Devakberg, NL 872 861",
    birth_day: "1991-1-28",
    photo: "",},
    {name: "Sheela Khan",
    phone: "6155925572",
    email: "Sheela_Khan21@gmail.com",
    group: ["Favourites", "Work"],
    address: "Lake Jaya, NL 285 822",
    birth_day: "1984-12-6",
    photo: "",},
    {name: "Karan Nair",
    phone: "+916155925572",
    email: "Karan99@yahoo.co.in",
    group: ["Favourites", "Home"],
    address: "Dhyaneshburgh, PY 886 773",
    birth_day: "1946-12-23",
    photo: "",},
    {name: "Vaishvi Abbott",
    phone: "+916155925572",
    email: "Vaishvi85@gmail.com",
    group: ["Work"],
    address: "North Bhanumatiside, UK 604 941",
    birth_day: "1955-4-19",
    photo: "",},
    {name: "Chatura Joshi",
    phone: "+916155925572",
    email: "Chatura60@gmail.com",
    group: ["Home"],
    address: "Chapalfurt, WB 494 600",
    birth_day: "1988-8-22",
    photo: "",},
];

function renderAddressBook(address_book){
    address_book.forEach(element => {
        const address = document.createElement("div");
        address.className = "placard"
        address.id = element.name;
        address.addEventListener("click",displayContact);
        address.innerHTML = `
            <table>
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
                </tr>
            </table>`  
            address_book_area.appendChild(address);
    });

}
function init(address_book){
    address_book_area.textContent = '';
    address_book.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase())
            return -1;
        else
            return 1;
    });
    renderAddressBook(address_book);
}

init(address_book);