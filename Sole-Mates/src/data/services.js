import { get, post, put, del } from "./api.js";


export async function getAllShoes() {
    return get('/data/shoes?sortBy=_createdOn%20desc')
}

export async function createPair(data) {
    return post('/data/shoes',data)
}

export async function getById(id) {
    return get(`/data/shoes/${id}`)
}

export async function deleteShoes(id) {
    return del(`/data/shoes/${id}`)
}

export async function updateShoes(id,data) {
    return put(`/data/shoes/${id}`,data)
}

//BONUS SEARCH
export async function getBrand(brand) {
    return get(`/data/shoes?where=brand%20LIKE%20%22${brand}%22`)
}