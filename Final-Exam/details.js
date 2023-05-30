
let id = new URLSearchParams(window.location.search).get("id")
let row= document.querySelector(".row")

let BASE_URL = "http://localhost:8080/fashions";

async function detailsFunc (){
    let res = await axios(`${BASE_URL}/${id}`);
    let data = await res.data;
    row.innerHTML = `
        <div class="product-card d-flex align-items-center justify-content-center w-50">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <img class="w-100" src="./assets/images/${data.image}" alt="" />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <h1 class="text-center">${data.name}</h1>
              <h3 class="text-center text-primary">${data.price}</h3>
            </div>
          </div>
    `;
}
detailsFunc()
