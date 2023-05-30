let id = new URLSearchParams(window.location.search).get("id");

let form = document.querySelector("form");
let fashionName = document.querySelector("#name");
let price = document.querySelector("#price");
let photo = document.querySelector("#photo");

let BASE_URL = "http://localhost:8080/fashions";

if (id) {
  async function editFunc(id) {
    let res = await axios(`${BASE_URL}/${id}`);
    let data =await res.data;
    fashionName.value=data.name
    price.value=data.price
  }
  editFunc(id)
}

form.addEventListener("submit", async function(e){
    e.preventDefault()
    let obj={
        name:fashionName.value,
        price:price.value,
        image: photo.value.split("\\")[2]
    }
    if(id){
        axios.patch(`${BASE_URL}/${id}`,obj);
    }else{
        axios.post(BASE_URL, obj)
    }
    window.location="index.html"
})
