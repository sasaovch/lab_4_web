import BASE_URL from '../constants/global.js'


export async function loginUser(credentials) {
    return fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {return {status: 500, message: "Server error"}})
  }

export async function signupUser(credentials) {
  return fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
  })
      .then(data => data.json())
      .catch(error => {return {status: 500, message: "Server error"}})
}

export async function checkUserByToken(credentials) {
  return fetch(`${BASE_URL}/check-token?token=${credentials.token}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json'
      }
  })
      .then(data => data.json())
      .catch(error => {return {status: 500, message: "Server error"}})
}