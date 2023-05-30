let row = document.querySelector(".fashions");
let sortBtn = document.querySelector(".sort");
let searchBtn = document.querySelector(".search");
let loadMore = document.querySelector(".load-more");
let burgerMenu= document.querySelector(".burger-menu")
let menuBtn= document.querySelector(".menuBtn")
let removeBurger= document.querySelector("#modal-remove")




let BASE_URL = "http://localhost:8080/fashions";
let filtered = [];
let defaultArr=[]
let copyArr=[]
let allData = [];
let num=4

async function getAllData() {
  let res = await axios(BASE_URL);
  let data = res.data;
  allData = data;
  filtered =
    filtered.length || searchBtn.value
      ? filtered.slice(0, num)
      : data.slice(0, num);
  row.innerHTML = "";
  filtered.forEach((item) => {
    row.innerHTML += `
            <div class="col-lg-3 col-md-6 col-sm-12 fashion p-3">
              <div class="fashion-img">
                <img src="./assets/images/${item.image}" alt="" />
              </div>
              <div class="fashion-text">
                <p class="date">10 JAN 2018</p>
                <h6>${item.name}</h6>
                <p class="price">
                  ${item.price}
                </p>
                <div class="icons">
                  <div class="likes">
                    <i class="fa-regular fa-heart" style="color: #000000"></i>
                    <p>15 Likes</p>
                  </div>
                  <div class="comments">
                    <i class="fa-regular fa-comment" style="color: #000000"></i>
                    <p>02 Comments</p>
                  </div>
                </div>
                <div class="buttons">
                  <div>
                    <a onclick=deleteFunc(${item.id}) class="btn btn-danger">Delete</a>
                    <a href="details.html?id=${item.id}" class="btn btn-primary">More Details</a>
                  </div>
                  <div>
                    <a onclick=favFunc(${item.id}) class="btn btn-warning">Add Favorits</a>
                    <a href="add-edit.html?id=${item.id}" class="btn btn-success">Edit</a>
                  </div>
                </div>
              </div>
            </div>
        `;
  });
}
getAllData();

loadMore.addEventListener("click", async function(){
    num=num+4
    filtered=copyArr
    getAllData()
})

async function deleteFunc(id) {
  await axios.delete(`${BASE_URL}/${id}`);
  filtered.filter((item) => item.id != id);
  getAllData();
}

searchBtn.addEventListener("input", async function (e) {
  filtered = allData.filter((item) =>
    item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  getAllData();
});

sortBtn.addEventListener("click", async function(e){
    e.preventDefault()
    if(sortBtn.innerHTML=="Sort"){
        sortBtn.innerHTML="Ascending"
        filtered.sort((a,b)=> a.price.localeCompare(b.price))
        getAllData()
    }else if (sortBtn.innerHTML == "Ascending") {
        sortBtn.innerHTML = "Descending";
        filtered.sort((a, b) => b.price.localeCompare(a.price));
        getAllData()
    }else{
        sortBtn.innerHTML="Sort"
        filtered=defaultArr
        getAllData()
    }
})

let favData = JSON.parse(localStorage.getItem("favData")) || [];

async function favFunc(id) {
  console.log(id);
  let res = await axios(`${BASE_URL}/${id}`);
  let data = res.data;
  console.log(favData);
  let available = favData.find((item) => item.id == id);
  if (!available) {
    favData.push(data);
    localStorage.setItem("favData", JSON.stringify(favData));
  } else {
    alert("already exist information");
  }
}

menuBtn.addEventListener("click", function(){
  burgerMenu.style.display="block"
})
removeBurger.addEventListener("click", function(){
  burgerMenu.style.display="none"
})
