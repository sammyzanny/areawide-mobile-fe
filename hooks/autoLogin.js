
export default function autoLogin(token){
    const reqObj = {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
  
      fetch('https://b0a2aeac3053.ngrok.io/login', reqObj)
        .then(response => response.json())
        .then(data =>  {
          if (data.error) {
            alert(data.error)
            return (false)
          } else {
            return (data)
          }
         
      });

}