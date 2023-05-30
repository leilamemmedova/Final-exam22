let row= document.querySelector(".row")

let allData= JSON.parse(localStorage.getItem("favData"))

async function getAllFavData(){
    row.innerHTML=""
    allData.forEach((item)=>{
        row.innerHTML += `
         <div class="card d-flex align-items-center justify-content-center flex-direction-column" style="width:18rem;">
        <img class="card-img-top" src="./assets/images/${item.image}" alt="Card image cap">
        <div class="card-body">
          <h5 style='color:brown' class="card-title text-center">${item.name}</h5>
          <hr>
          <p class="card-text text-center">$ ${item.price}</p>
          <br>
          <a href="#" onclick=removeLocal('${item.id}') class="btn btn-primary">Remove Favorits</a>
        </div>
        </div>
        `;
    })
}
getAllFavData()

async function removeLocal(id){
    allData= allData.filter((item)=>item.id!=id)
    localStorage.setItem("favData", JSON.stringify(allData))
    getAllFavData()
}