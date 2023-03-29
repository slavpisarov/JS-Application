import { get, post, put, del } from "./api.js";


export async function getAllAlbums() {
    return get('/data/albums?sortBy=_createdOn%20desc')
}

export async function createAlbum(data) {
    return post('/data/albums',data);
}

export async function getById(id) {
    return get(`/data/albums/${id}`);
}

export async function deleteAlbum(id) {
    return del(`/data/albums/${id}`);
}

export async function updateAlbum(id,data) {
    return put(`/data/albums/${id}`,data);
}

export async function likeAlbum(albumId) {
    return post('/data/likes',{albumId});
}
export async function getLikesByAlbumId(albumId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`);
}
export async function getMyLikeAlbumId(albumId,userId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
