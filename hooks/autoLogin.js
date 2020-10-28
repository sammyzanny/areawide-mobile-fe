import Urls from '../constants/Urls';

export default function autoLogin(token){
    const reqObj = {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
  
      fetch(Urls.API+'/login', reqObj)
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