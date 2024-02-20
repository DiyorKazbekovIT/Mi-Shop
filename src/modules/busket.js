import { GetAPIFunc, PatchDataFunc } from "./api"

export const BusketFunc = () => {
    const container = document.querySelector("#cart-container")
    const totalPriceElement = document.querySelector("#cart-totlal-price")

    const UpdateTotalPriceFunc = (data) =>{
        let total = 0
        data.forEach(element => {
            total += (Number(element.count) * Number(element.price))
        })

        totalPriceElement.innerText = total + " ₽"
    }

    const UpdateBusketFunc = () => {
        GetAPIFunc("/cart").then(data => {
            container.innerHTML = ""
            data.map(item => {
                const { id, name, price, count } = item
                container.insertAdjacentHTML("beforeend", `
                    <div class="row border-bottom pb-3 pt-3">
                        <div class="col col-12 col-md-6 mb-3 mb-md-0 fs-4">
                            ${name}
                        </div>
                        <div
                            class="col col-12 col-md-6 fs-4 d-flex align-items-center justify-content-end flex-wrap">
                            <h4 class="me-3 d-flex align-itemns-center">${price} ₽</h4>
                            <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                                id="control-dec" id="control-inc" data-id="${id}" data-count="${count}">
                                -
                            </button>
                            <h6 class="cart-item-count me-3 ms-3"> ${count} </h6>
                            <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                                id="control-inc" data-id="${id}" data-count="${count}">
                                +
                            </button>
                        </div>
                    </div>
                `)
            })

            UpdateTotalPriceFunc(data)
        })
    }

    container.addEventListener("click", (e) => {

        if (e.target.tagName === "BUTTON") {

            if (e.target.id && e.target.id === "control-inc") {

                const id = e.target.dataset.id
                const count = Number(e.target.dataset.count)

                const item = {
                    count: count + 1
                }

                PatchDataFunc(`/cart/${id}`, item).then(() => {
                    UpdateBusketFunc()
                })
            } else if (e.target.id && e.target.id === "control-dec") {

                const id = e.target.dataset.id
                const count = Number(e.target.dataset.count)

                if (count > 0) {
                    const item = {
                        count: count - 1
                    }
                    PatchDataFunc(`/cart/${id}`, item).then(() => {
                        UpdateBusketFunc()
                    })
                }
                
            }

        }

    })

    UpdateBusketFunc()

}