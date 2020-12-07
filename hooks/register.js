import Urls from './constants/Urls';



export default function register(userInfo){

    const reqObj = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
         user: userInfo
        })
    }

    fetch(Urls.API + "/users", reqObj)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        if (data.error){
            alert(data.error)
        } else {
            return data
        }
    })
}
