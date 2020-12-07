import Urls from './constants/Urls';

export default function manualLogin(userInfo){
    const reqObj = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            userInfo
        })
    }

    fetch(Urls.API + "/auth", reqObj)
        .then(response => response.json())
        .then(data =>  {
            if (data.message) {
                alert(data.message)
                } else {
                return(data)
                }
            
        });
}