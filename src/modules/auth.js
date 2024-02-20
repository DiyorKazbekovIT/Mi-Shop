import { GetAPIFunc } from "./api"
import { ModalLoginFunc, LogoutFunc } from "./modal"

export const AuthFunc = (input, password, login) => {
    login.addEventListener("click", () => {
        const user = {
            lognUser: input.value,
            passUser: password.value,
        }
        
        GetAPIFunc("/profile").then((data) => {
            if (
                (data.login === user.lognUser) &&
                (data.password === user.passUser)
            ) {
                localStorage.setItem("auth", JSON.stringify(user))
            }
        })
    })
}

export const CHeckAuthFunc = (modal, removeOne, removeTwo, openAuth) => {
    let user = JSON.parse(localStorage.getItem("auth"))
    if (user) {
        
        GetAPIFunc("/profile").then((data) => {
            if (
                (data.login === user.lognUser) &&
                (data.password === user.passUser)
            ) {
                ModalLoginFunc(modal, removeOne, removeTwo, openAuth)
            }
        })
    }
}

export const LogoutAuthFunc = (eventButton) => {
    eventButton.addEventListener("click", () => {
        localStorage.removeItem("auth")
    })
}