export const saveUser = (user) => {
    if (user.accessToken) {
        localStorage.setItem('user', JSON.stringify(user))
    }
}

export const deleteUser = () =>{
    localStorage.removeItem('user');
}

export const getUser = () => {
    let serialisedUser = localStorage.getItem('user');

    if (serialisedUser) {
        let user = JSON.parse(serialisedUser);
        return user;
    }
}

export const getToken =()=> getUser()?.accessToken;