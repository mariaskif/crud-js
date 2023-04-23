
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');

let mood='create'
let tmp;

//get total
function getTotal(){

if(price.value !=''){
    let result=(+price.value+ +taxes.value + +ads.value)- +discount.value ;
    total.innerHTML=result;
    total.style.backgroundColor="#040";
}else{
    total.innerHTML="";
    total.style.backgroundColor="#720303"
}
}

//create product
//save local storage

let dataArr=[];
if(localStorage.products != null){
    dataArr=JSON.parse(localStorage.products)
}else{
    dataArr=[];
}

submit.onclick=function(){
    let proObj={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }

    if(title.value !=''
     && price.value !=''
     && category.value!=''
     && proObj.count<100){
        if(mood==='create'){
            if(proObj.count >1){
                for(let i=0;i< proObj.count;i++){
                    dataArr.push(proObj)
                }
            }else{
                dataArr.push(proObj)
            }
    
        }
        else{

            dataArr[tmp]=proObj;
            mood='create'
            submit.innerHTML='Create'
            count.style.display='block'
     
         }
     
         clearData();
     
    }


    localStorage.setItem('products',JSON.stringify(dataArr));
  
    showData();
} 

//clear inputs

function clearData(){
title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
total.innerHTML='';
count.value='';
category.value='';
}

//read

function showData(){
   let table='';
    for( let i=0;i< dataArr.length;i++){
        table +=`
        <tr>
                <td>${i+1}</th>
                <td>${dataArr[i].title}</td>
                <td>${dataArr[i].price}</td>
                <td>${dataArr[i].price}</td>
                <td>${dataArr[i].ads}</td>
                <td>${dataArr[i].discount}</td>
                <td>${dataArr[i].count}</td>
                <td>${dataArr[i].category}</td>
                <td><button id="update" onclick="updateData(${i})">Update</button></td>
                <td><button id="delete" onclick="deletData(${i})" >Delete</button></td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;

let btnDeleteAll=document.getElementById('deleteAll');
if (dataArr.length > 0){
    btnDeleteAll.innerHTML=`<button onclick="deleteAll()"> Delete All (${dataArr.length})</button>`
}else{
    btnDeleteAll.innerHTML="";
}
}
showData();

//delete

function deletData(i){
    dataArr.splice(i,1);
    localStorage.products=JSON.stringify(dataArr);
    showData();
}

function deleteAll(){
    localStorage.clear();
    dataArr.splice(0);
    showData();

}
//count


//update
function updateData(i){
title.value=dataArr[i].title;
price.value=dataArr[i].price;
taxes.value=dataArr[i].taxes;
ads.value=dataArr[i].ads;
discount.value=dataArr[i].discount;
getTotal()
count.style.display='none'
category.value=dataArr[i].category;
submit.innerHTML='Update'
mood='update'
tmp=i
}
//search

let searchMood="title";
function getSearcMood(id){
    let search=document.getElementById('search');
   if(id ==='searchTitle'){
    searchMood="title";
    search.placeholder='Search By Title'
   }else{
    searchMood="category";
    search.placeholder='Search By Category'

   }
   search.focus();
   search.value='';
   showData();
}
function searchData(value){

    let table='';
    for(let i=0;i<dataArr.length;i++){

    if(searchMood ==="title"){
if(dataArr[i].title.includes(value.toLowerCase())){
    table +=`
    <tr>
            <td>${i+1}</th>
            <td>${dataArr[i].title}</td>
            <td>${dataArr[i].price}</td>
            <td>${dataArr[i].price}</td>
            <td>${dataArr[i].ads}</td>
            <td>${dataArr[i].discount}</td>
            <td>${dataArr[i].count}</td>
            <td>${dataArr[i].category}</td>
            <td><button id="update" onclick="updateData(${i})">Update</button></td>
            <td><button id="delete" onclick="deletData(${i})" >Delete</button></td>
        </tr>
    `;
} }
    else{
            if(dataArr[i].category.includes(value.toLowerCase())){
                table +=`
                <tr>
                        <td>${i+1}</th>
                        <td>${dataArr[i].title}</td>
                        <td>${dataArr[i].price}</td>
                        <td>${dataArr[i].price}</td>
                        <td>${dataArr[i].ads}</td>
                        <td>${dataArr[i].discount}</td>
                        <td>${dataArr[i].count}</td>
                        <td>${dataArr[i].category}</td>
                        <td><button id="update" onclick="updateData(${i})">Update</button></td>
                        <td><button id="delete" onclick="deletData(${i})" >Delete</button></td>
                    </tr>
                `
            
            }
            }
    }
    document.getElementById('tbody').innerHTML=table;

}
//clean data