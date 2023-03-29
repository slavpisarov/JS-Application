import { get, post, put, del } from "./api.js";


export async function getAllProducts() {
    return get('/data/products?sortBy=_createdOn%20desc')
}

export async function createProduct(data) {
    return post('/data/products',data);
}

export async function getById(id) {
    return get(`/data/products/${id}`);
}

export async function deleteProduct(id) {
    return del(`/data/products/${id}`);
}

export async function updateProduct(id, data) {
    return put(`/data/products/${id}`, data);
}


//BONUS

export async function addBuys(productId) {
    return post('/data/bought', productId);
}

export async function totalBuyCountForProducts(productId) {
    return get(`/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`);
}

export async function getBuysByMyId(productId,userId) {
    return get(`/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

