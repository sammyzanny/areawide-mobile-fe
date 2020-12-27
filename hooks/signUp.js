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
