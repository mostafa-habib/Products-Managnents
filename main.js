let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let root = document.querySelector(":root");
let icon = document.getElementById("icon");


icon.onclick = () => {
    root.classList.toggle("active");
    
}

let toogle = 'create';
let temp;
//Get Total Price
function getTotal(){
    if(price.value){
        let sum =(+price.value + +taxes.value + +ads.value) -  +discount.value;
        total.innerHTML = sum;
        total.style.background='green';

    }
    else{
        total.innerHTML = '';
        total.style.background='red';
    }
    
}

//Create Product
let data;
if(localStorage.product != null){
    data=JSON.parse(localStorage.product);
}
else{
    data = [];
}

create.onclick = () => {
    let dataObj = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if(validDate() == true){
        if (toogle == 'create') {
            if (dataObj.count > 1) {
                for (let i = 0; i < dataObj.count; i++) {
                    data.push(dataObj);
                }
            } else {
                data.push(dataObj);
            }

        } else {
            data[temp] = dataObj;
            toogle = 'create';
            create.innerHTML = 'Create';
            count.style.visibility = "visible";
        }
        clearInput();

    }else{
        alert("You enter invalid data");
    }


    // Sava data to local storage to be retrivable
    localStorage.setItem('product' , JSON.stringify(data));
    showData();
    
}

//Clear Inputs

function clearInput() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.background='red';

}

//Read data and show it in UI
function showData(){
    let table = '';
    for(let i = 0; i < data.length; i++) {
         table += `
        <tr>
                        <td>${i + 1}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td><button onclick = "updateData( ${i} )" id="update">update</button></td>
                        <td><button onclick = "deleteData( ${i} )" id="delete">delete</button></td>
                    </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = table;
    if(data.length > 0){
        document.getElementById("deleteAllContainer").innerHTML = `<button onclick = "deleteAllData()" id="deleteAll">Delete All ( ${data.length} )</button> `;
    }
    else{
        document.getElementById("deleteAllContainer").innerHTML = ''
    }


}
showData();

//Delete One product

function deleteData(i){
    data.splice(i,1);
    localStorage.product = JSON.stringify(data);
    showData();

}

//Delete All Products

function deleteAllData(){
    if(confirm("you are going to delete All product \n Are you sure?"))
    {
        data.splice(0);
        localStorage.clear();
        showData();
    }

   
    
}

//update Product

function updateData(i){
    
    count.style.visibility=" hidden";
    create.innerHTML ="Update";
    
    title.value = data[i].title;
    price.value = data[i].price;
    taxes.value = data[i].taxes;
    ads.value = data[i].ads;
    discount.value = data[i].discount;
    getTotal();
    category.value = data[i].category;

    toogle = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })

}

//Search in data
let searchMood = 'title';
function getSearchMood (id){
    let search = document.getElementById("search");
    if(id == "searchTitle")
    {
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.placeholder = "Search by " + searchMood;

    search.focus();
    search.value = '';
    showData();

}

function searchData(value){
    let table = '';
    for (let i = 0; i < data.length; i++) {
        let s = `
        <tr>
                        <td>${i}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td><button onclick = "updateData( ${i} )" id="update">update</button></td>
                        <td><button onclick = "deleteData( ${i} )" id="delete">delete</button></td>
                    </tr>
        `;
        if (searchMood == 'title') {
            if (data[i].title.includes(value.toLowerCase())) {
                table += s ;

            }


        } else {
            if (data[i].category.includes(value)) {
                table += s ;
            }

        }
    }

    document.getElementById("tbody").innerHTML = table;

}

//Validate Data 

function validDate(){
    if(title.value !='' && price.value !='' && category.value !='' && count.value <= 100){
        return true;     
    }
    else{
        return false;
    }
}










