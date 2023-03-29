import { get, post, put, del } from "./api.js";

const endpoints ={
    catalog:'/data/books?sortBy=_createdOn%20desc',
    byId:'/data/books/'
};

export async function getAllBooks() {
    return get(endpoints.catalog)
}

export async function getMyBooks(userId) {
    return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function getById(id) {
    return get(endpoints.byId + id);
}

export async function createBook(data) {
    return post('/data/books',data);
}

export async function updateBook(id, data) {
    return put(endpoints.byId + id, data);
}

export async function deleteBook(id) {
    return del(endpoints.byId + id);
}


//BONUS
export async function likeBook(bookId) {
    return post('/data/likes',{bookId});
}
export async function getLikesByBookId(bookId) {
    return get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}
export async function getMyLikeBookId(bookId,userId) {
    return get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
