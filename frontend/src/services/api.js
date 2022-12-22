import BASE_URL from '../constants/global.js'

export async function addAttempt(attempt) {
    const token = localStorage.getItem('token')
    if (token === null || token === undefined) {
        return {status: 401, message: "Access denied"}
    }
    let jwtToken = token.substring(1, token.length - 1)
    const newBody = {
        jwtToken,
        attempt
    }
    let body = JSON.stringify(newBody)
    return fetch(`${BASE_URL}/attempt`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: body
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {return {status: 500, message: "Server error"}})
    .then(data => { return data})
}

export async function getAttempts(page, size) {
    return fetch(`${BASE_URL}/attempts?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {return {status: 500, message: "Server error"}})
    .then(data => {return data})
}

export async function deleteAttempts() {
    return fetch(`${BASE_URL}/attempts`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {return {status: 500, message: "Server error"}})
    .then(data => {return data})
}

export async function getNumberOfAllAttempts() {
    return fetch(`${BASE_URL}/attempts/number`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {return {status: 500, message: "Server error"}})
    .then(data => {return data})
}
