import Urls from "../constants/Urls"

const reqObj = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        username,
        password,
        name,
        email,
        city,
        phone
    })
}

export default function register(userInfo){
    fetch(Urls.API, reqObj)
}
