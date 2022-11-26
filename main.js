//GLOBAL
var categoriesSection = document.querySelector(".header-top-categories");
var productsSection = document.querySelector(".products-section")
var currentProducts = productsList;
var categories = new Set();
var basketIcon = document.querySelector(".header-top-basket");

//add to basket
var addToBasket = (e) => {
        currentProducts = productsList;
        basketIcon.dataset.count = Number(basketIcon.dataset.count)+1;
        basketIcon.classList.add("active");
        var basketItem = currentProducts.filter((item)=>{
            if (item.id == e.target.dataset.id) {
                return item
            }
        })
        renderBasket(basketItem);
}

//create categories

var renderCategory = (item) => {
    for (let i = 0; i < item.length; i++) {
        categories.add(item[i].category)
    }

    categories = ["Wszystko", ...categories, "Promocje"];

    categories.forEach((element) => {
        var categoryBtn = document.createElement("button");
        categoryBtn.innerHTML = element;
        categoryBtn.classList.add("header-top-button");
        categoryBtn.dataset.category = element;

        categoriesSection.appendChild(categoryBtn);
    }
    );
}

document.onload = renderCategory(currentProducts);

//create products

var renderProducts = (item) => {
    productsSection.innerHTML = "";
    for (let i = 0; i < item.length; i++) {
        var productItem = document.createElement("div");
        productItem.innerHTML = `<div class="product-item">
        <div class="product-img">
            <img src="${item[i].image}" alt="">
            <i data-id="${item[i].id}" class="add-to-basket fa-solid fa-basket-shopping "></i>
        </div>
        <p class="product-name">${item[i].name}</p>
        <p class="product-description">${item[i].description}</p>
        <div class="product-price ${item[i].sale ? "on-sale":""}">
            <span class="price">${item[i].price} zł</span>
            <span class="price-sale">${item[i].saleAmount ? (item[i].price - item[i].saleAmount).toFixed(2) + " zł" : "" }</span>
        </div>
        </div>`

        productsSection.appendChild(productItem);  
    }
    var addToBasketBtn = document.querySelectorAll(".add-to-basket");
    addToBasketBtn.forEach((btn) => 
    btn.addEventListener("click", addToBasket))
}

document.onload = renderProducts(currentProducts);


// category sort
var categoriesSortBtn  = document.querySelectorAll(".header-top-button"); 

categoriesSortBtn.forEach (btn => 
    btn.addEventListener("click", (e)=> {
        var catrgoryOfBtn = e.target.dataset.category;
        currentProducts = productsList;

        if (catrgoryOfBtn === "Wszystko") {
            currentProducts = productsList;
        }

        else if (catrgoryOfBtn === "Promocje") {
            currentProducts = currentProducts.filter((item) =>{
                if (item.sale === true) {
                    return item
                }
            });
        }

        else {
            currentProducts = currentProducts.filter((item) => {
                if (item.category === catrgoryOfBtn) {
                    return item
                }
            })
        }
        console.log(currentProducts);
        renderProducts(currentProducts);
    })
);

// search input 

var searchInput = document.querySelector(".header-search-input");
searchInput.addEventListener("input", (e)=> {
    var searchInputValue = e.target.value;
    
    var foundProduct = currentProducts.filter((product) =>{
       if (product.name.toLowerCase().includes(searchInputValue.toLowerCase())) {
        return product
       }
    })

    var emptySearch = document.querySelector(".empty-search")

    if (foundProduct.length === 0) {
        emptySearch.classList.add("active")
    }
    else {
        emptySearch.classList.remove("active")
    }

    renderProducts(foundProduct);
})


//add to basket
var basketContentSection = document.querySelector(".basket-content-reged-left");
var basketContentSectionRight = document.querySelector(".basket-content-reged-right");
var prciesBasketPlace = document.querySelector(".basket-price")
var totalPrice = 0;
prciesBasketPlace.innerHTML = totalPrice.toFixed(2) + " zł";


var renderBasket = (item)=> {
    for (let i = 0; i < item.length; i++) {
        var prices = item[i].saleAmount ? (item[i].price-item[i].saleAmount).toFixed(2) : item[i].price;

        var basketContent = document.createElement("div");
        basketContent.innerHTML = `<img src="${item[i].image}" alt="">
        <div class="basket-content-left-text">
            <h1 class="product-name">${item[i].name}</h1>
            <p class="product-description">${item[i].description}</p>
            <p class="price bsp" data-price="${prices}">${prices} zł</p>
            <button class="delete-product">x</button>
        </div>`;
        basketContent.classList.add("basket-content-reged-left-pro");

        basketContentSection.appendChild(basketContent);
        
        totalPrice += parseFloat(prices)
        
        prciesBasketPlace.innerHTML = totalPrice.toFixed(2) + " zł"
    }  
}

//delete procut from basket
var deleteProduct = () => {
    var deleteProductBtn = document.querySelectorAll(".delete-product")
    var productInBasketId = document.querySelectorAll(".basket-content-reged-left-pro");
    var priceClass = document.querySelectorAll(".bsp");

    for (let i = 0; i < deleteProductBtn.length; i++) {
        deleteProductBtn[i].addEventListener("click", () =>{

            totalPrice -= parseFloat(priceClass[i].dataset.price);
            if (totalPrice < 1) {
                totalPrice = 0;
            }
            prciesBasketPlace.innerHTML = totalPrice.toFixed(2) + " zł"
            productInBasketId[i].remove();
            basketIcon.dataset.count = Number(basketIcon.dataset.count)-1;
            if (basketIcon.dataset.count == 0) {
                basketIcon.classList.remove("active");
            }
        })
    }
}

var removeAllBasket = ()=> {
    productInBasketId = document.querySelectorAll(".basket-content-reged-left-pro");
    totalPrice = 0;
    productInBasketId.forEach((item)=>{
        item.remove();
    })
    basketIcon.dataset.count = 0;
    basketIcon.classList.remove("active");
    prciesBasketPlace.innerHTML = totalPrice.toFixed(2) + " zł"
}




/*
var addToBasketBtn = document.querySelectorAll(".add-to-basket");
addToBasketBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        currentProducts = productsList;
        var basketItem = currentProducts.filter((item)=>{
            if (item.id == e.target.dataset.id) {
                return item
            }
        })
        renderBasket(basketItem);
    })
});*/



// hamburger menu
var hamburgerBtn = document.querySelector(".hamburger");
var headerTop = document.querySelectorAll(".header-top")[1];

hamburgerBtn.addEventListener("click", () => {
    headerTop.classList.toggle("active");
    categoriesSection.classList.toggle("active");
})


// show basket
var basketPlace = document.querySelector(".basket");
var closeBasket = document.querySelector(".close-basket");

basketIcon.addEventListener("click", () => {
    document.querySelector("body").classList.add("active")
    basketPlace.classList.add("active")
    deleteProduct();
    
})

var payButton = document.querySelector(".basket-content-button-pay");
    payButton.addEventListener("click", () =>{
    alert("zapłaciłeś " + totalPrice.toFixed(2) + " zł");
    removeAllBasket()
    })

var cancelButton = document.querySelector(".basket-content-button-cancel");
    cancelButton.addEventListener("click", () =>{
    removeAllBasket()
    })


closeBasket.addEventListener("click", ()=>{
    document.querySelector("body").classList.remove("active")
    basketPlace.classList.remove("active")
})