import { DeleteDataFunc, GetAPIFunc, PostDataFunc } from "../api"

export const AddProductFunc = () => {
    const inputProductTitleElement = document.querySelector("#product-title")
    const inputProductNameElement = document.querySelector("#product-name")
    const inputProductPriceElement = document.querySelector("#product-price")
    const inputProductImageElement = document.querySelector("#product-image")
    const buttonProductSaveElement = document.querySelector("#product-save-button")
    const selectCategoryElement = document.querySelector("#product-category")
    const container = document.querySelector("#product-container")

    const productData = {
        title: "",
        productName: "",
        image: "",
        price: 0,
        category: 0
    }

    const UpdateTableFunc = () => {
        GetAPIFunc("/products").then(data => {
            container.innerHTML = ""
            data.map((item, index) => {
                const { title, productName, price, id } = item
                container.insertAdjacentHTML("beforeend", `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${title}</td>
                        <td>${productName}</td>
                        <td>${price} ₽</td>
                        <td class="text-end">
                            <button type="button" class="btn btn-outline-danger btn-sm" data-product-id="${id}">
                                удалить
                            </button>
                        </td>
                    </tr>   
                `)
            })
        })
    }

    const CheckValueFunc = () => {
        if (
            inputProductTitleElement.value.trim() === "" ||

            inputProductNameElement.value.trim() === "" ||

            Number(inputProductPriceElement.value.trim()) === 0 ||

            inputProductImageElement.value.trim() === "" ||

            selectCategoryElement.value === "default"

        ) {
            buttonProductSaveElement.disabled = true
        } else {
            buttonProductSaveElement.disabled = false
        }
    }

    selectCategoryElement.addEventListener("change", () => {
        productData.category = selectCategoryElement.value

        const id = selectCategoryElement.value !== "default" ? `/products?category=${selectCategoryElement.value}` : "/products"

        GetAPIFunc(id).then(data => {
            console.log(id);
            container.innerHTML = ""
            data.map((item, index) => {
                const { title, productName, price, id } = item
                container.insertAdjacentHTML("beforeend", `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${title}</td>
                        <td>${productName}</td>
                        <td>${price} ₽</td>
                        <td class="text-end">
                            <button type="button" class="btn btn-outline-danger btn-sm" data-product-id="${id}">
                                удалить
                            </button>
                        </td>
                    </tr>
                `)
            })
        })

        CheckValueFunc()
    })

    inputProductTitleElement.addEventListener("input", () => {
        productData.title = inputProductTitleElement.value
    })

    inputProductNameElement.addEventListener("input", () => {
        productData.productName = inputProductNameElement.value
    })

    inputProductPriceElement.addEventListener("input", () => {
        productData.price = Number(inputProductPriceElement.value)
    })

    inputProductImageElement.addEventListener("input", () => {
        const file = inputProductImageElement.files[0]

        if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png") {
            const readerFile = new FileReader()

            readerFile.addEventListener("load", () => {
                productData.image = readerFile.result
            })

            readerFile.addEventListener("error", () => {
                productData.image = ""
                inputProductImageElement.value = ""
            })

            readerFile.readAsDataURL(file)
        } else {
            inputProductImageElement.value = ""
        }

        CheckValueFunc()
    })


    buttonProductSaveElement.addEventListener("click", () => {
        // console.log(productData);
        PostDataFunc("/products", {
            method: "POST",
            body: JSON.stringify(productData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((data) => {
            inputProductTitleElement.value = ""
            inputProductNameElement.value = ""
            inputProductPriceElement.value = 0
            inputProductImageElement.value = ""
            UpdateTableFunc()
        })
    })

    container.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const id = e.target.dataset.productId
            DeleteDataFunc(`/products/${id}`).then(() => {
                UpdateTableFunc()
            })
        }
    })

    CheckValueFunc()
    UpdateTableFunc()
}