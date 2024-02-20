import { DeleteDataFunc, GetAPIFunc, PostDataFunc } from "../api"

export const AddCategoryFunc = () => {

    const inputNameElement = document.querySelector("#category-name")
    const inputImageElement = document.querySelector("#category-image")
    const addButtonElement = document.querySelector("#category-add-btn")
    const container = document.querySelector("#category-container")
    const selctElement = document.querySelector("#product-category")

    const categoryData = {
        name: "",
        image: ""
    }

    const CheckValueFunc = () => {
        if (inputNameElement.value.trim() === "" || inputImageElement.value.trim() === "") {
            addButtonElement.disabled = true
        } else {
            addButtonElement.disabled = false
        }
    }

    const UpdateTable = () => {
        GetAPIFunc("/catalog").then(data => {
            container.innerHTML = ""
            data.map((item, index) => {
                const {id, name} = item
                container.insertAdjacentHTML("beforeend", `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${name}</td>
                        <td class="text-end">
                            <button type="button" class="btn btn-outline-danger btn-sm" data-category-id="${id}">
                                удалить
                            </button>
                        </td>
                    </tr>
                `)
                selctElement.insertAdjacentHTML("beforeend", `
                    <option value="${id}">${name}</option>
                `)
            })
        })
    }

    inputNameElement.addEventListener("input", () => {
        categoryData.name = inputNameElement.value
        CheckValueFunc()
    })
    inputImageElement.addEventListener("input", () => {

        const file = inputImageElement.files[0]

        if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png") {
            const readerFile = new FileReader()

            readerFile.addEventListener("load", () => {
                categoryData.image = readerFile.result
            })

            readerFile.addEventListener("error", () => {
                categoryData.image = ""
                inputImageElement.value = ""
            })

            readerFile.readAsDataURL(file)

        } else {
            inputImageElement.value = ""
        }

        CheckValueFunc()
    })

    addButtonElement.addEventListener("click", () => {
        PostDataFunc("/catalog", {
            method: "POST",
            body: JSON.stringify(categoryData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(data => {
            inputImageElement.value = ""
            inputNameElement.value = ""
            UpdateTable()
        })
    })

    container.addEventListener("click", e =>{
        if(e.target.tagName === "BUTTON"){
            const id = e.target.dataset.categoryId

            DeleteDataFunc(`/catalog/${id}`).then(data =>{
                UpdateTable()
            })
        }
    })

    UpdateTable()
    CheckValueFunc()

    /* Смартфон 	Xiaomi Redmi A1+ 2/32GB (голубой) 4990
        Чехол 	Red Line Ultimate для Xiaomi Redmi 9C (оранжевый) 290
        Умные часы 	Amazfit GTS 4 mini (черный) 7490
    */
}