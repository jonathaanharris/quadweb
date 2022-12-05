import { LOGIN_SUCCESS } from "./type"

export const LoginHandler = (data) => {
  return (dispatch) => {
    return fetch('http://localhost:8080/users/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json().then(data => {
            localStorage.setItem("accessToken", data.acces_token)
          })
        }
        throw new Error('something went wrong')
      })
      .catch(err => {
        return err
      })
  }
}