
export default function manualLogin(userInfo){
    const reqObj = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            userInfo
        })
    }

    fetch("https://b0a2aeac3053.ngrok.io/auth", reqObj)
        .then(response => response.json())
        .then(data =>  {
            if (data.message) {
                alert(data.message)
                } else {
                return(data)
                }
            
        });
}