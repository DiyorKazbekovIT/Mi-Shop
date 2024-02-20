import { GetAPIFunc, PostDataFunc } from "./api"
import { BusketFunc } from "./busket"

export const CartFunc = () => {
    const container = document.querySelector("#products-container")
    const inputCatalogSearch = document.querySelector("#catalog-search")

    const init = () => {
        const params = window.location.search
        const urlSearchParams = new URLSearchParams(params)
        const id = urlSearchParams.get('id')
        const url = id ? `/products?category=${id}` : "/products"

        GetAPIFunc(url).then(data => {
            data.map(item => {
                const { id, title, productName, price, image } = item
                container.insertAdjacentHTML("beforeend", `
                    <div class="col col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <a href="#!" class="card-link">
                            <div class="card">
    
                                <img src="${image}" class="card-img-top" alt="${title}" title="${title}">
    
                                <div class="card-body">
                                    <span class="mb-2 d-block text-secondary">${productName}</span>
                                    <h6 class="card-title mb-3">${title}</h6>
    
                                    <div class="row">
                                        <div class="col d-flex align-itemns-center justify-content-between">
                                            <h4>${price} ₽</h4>
                                            <button type="button" class="btn btn-outline-dark" data-product-id="${id}">
    
                                                <img src="./images/icon/shopping-cart-big.svg" alt="login">
    
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                `)
            })
        })
    }

    inputCatalogSearch.addEventListener("input", (e) => {
        GetAPIFunc(`/products?q=${e.target.value}`).then(data => {

            container.innerHTML = ""

            data.map(item => {
                const { id, title, productName, price, image } = item
                container.insertAdjacentHTML("beforeend", `
                    <div class="col col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <a href="#!" class="card-link">
                            <div class="card">
    
                                <img src="${image}" class="card-img-top" alt="${title}" title="${title}">
    
                                <div class="card-body">
                                    <span class="mb-2 d-block text-secondary">${productName}</span>
                                    <h6 class="card-title mb-3">${title}</h6>
    
                                    <div class="row">
                                        <div class="col d-flex align-itemns-center justify-content-between">
                                            <h4>${price} ₽</h4>
                                            <button type="button" class="btn btn-outline-dark" data-product-id="${id}">
    
                                                <img src="./images/icon/shopping-cart-big.svg" alt="login">
    
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                `)
            })
        })
    })

    container.addEventListener("click", (e) => {
        if (e.target.closest("button")) {
            const id = e.target.closest("button").dataset.productId
            GetAPIFunc(`/products/${id}`).then(data => {
                const { productName, price } = data
                PostDataFunc("/cart", {
                    method: "POST",
                    body: JSON.stringify({
                        name: productName,
                        price: price,
                        count: 1
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(() => {
                    BusketFunc()
                })
            })
        }
    })

    init()
}