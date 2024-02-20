import { AuthFunc, CHeckAuthFunc, LogoutAuthFunc } from "./auth"
import { openModalFunc, closeModalFunc, ModalLoginFunc, LogoutFunc } from "./modal"

export const ScriptFunc = () => {
    const openAuthBtnElement = document.querySelector("#open-auth-btn")
    const authModalElement = document.querySelector("#auth-modal")
    const modalWindowCloseElements = document.querySelectorAll("#modal-window-close")
    const modalLoginBtnElemen = authModalElement.querySelector("#login")
    const openCartBtnElement = document.querySelector("#open-cart-btn")
    const logoutBtnElement = document.querySelector("#logout-btn")
    const cartModalElemet = document.querySelector("#cart-modal")
    // 
    const loginControlElement = document.querySelector("#login-control")
    const passwordControlElement = document.querySelector("#password-control")

    // 
    closeModalFunc(openAuthBtnElement)
    openAuthBtnElement.addEventListener("click", () => {
        openModalFunc(authModalElement)
    })

    modalWindowCloseElements.forEach((modalWindowCloseElement, modalWindowCloseElementIndex) => {
        modalWindowCloseElement.addEventListener("click", () => {
            closeModalFunc(authModalElement)
        })
        modalWindowCloseElement.addEventListener("click", () => {
            closeModalFunc(cartModalElemet)
        })
    })

    modalLoginBtnElemen.addEventListener("click", () => {
        ModalLoginFunc(authModalElement, openCartBtnElement, logoutBtnElement, openAuthBtnElement)
    })

    logoutBtnElement.addEventListener("click", () => {
        openCartBtnElement.classList.add("d-none")
        logoutBtnElement.classList.add("d-none")
        openAuthBtnElement.classList.remove("d-none")
    })

    openCartBtnElement.addEventListener("click", () => {
        openModalFunc(cartModalElemet)
    })

    AuthFunc(loginControlElement, passwordControlElement, modalLoginBtnElemen)
    
    logoutBtnElement.addEventListener("click", () => {
        LogoutFunc(openCartBtnElement, logoutBtnElement, openAuthBtnElement)
    })

    // Auth
    CHeckAuthFunc(authModalElement, openCartBtnElement, logoutBtnElement, openAuthBtnElement)
    LogoutAuthFunc(logoutBtnElement)

}