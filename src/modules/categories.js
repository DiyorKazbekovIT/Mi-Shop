import { GetAPIFunc } from "./api"
export const CategoriesFunc = () => {

    const container = document.querySelector("#categories-container")
    const inputCatalogSearch = document.querySelector("#catalog-search")

    GetAPIFunc("/catalog").then(data => {

        container.innerHTML = ""

        data.map(item => {
            const { id, category, name, image } = item
            container.insertAdjacentHTML("beforeend", `
            <div class="col col-12 col-md-6 col-lg-4 mb-3">

                <a href="./catalog.html?id=${id}" class="card-link">
                    <div class="card">
                        <img src="${image}" class="card-img-top" alt="phones">
                        <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                        </div>
                    </div>
                </a>
            </div>
            `)
        })
    })

    inputCatalogSearch.addEventListener("input", (e)=>{
        GetAPIFunc(`/catalog?q=${e.target.value}`).then(data => {

            container.innerHTML = ""
    
            data.map(item => {
                const { id, category, name, image } = item
                container.insertAdjacentHTML("beforeend", `
                <div class="col col-12 col-md-6 col-lg-4 mb-3">
    
                    <a href="./catalog.html?id=${id}" class="card-link">
                        <div class="card">
                            <img src="${image}" class="card-img-top" alt="phones">
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                            </div>
                        </div>
                    </a>
                </div>
                `)
            })
        })
    })    
}