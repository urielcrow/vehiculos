
export const nameToken = 'X-Token-Vehicular';

export const getToken = ()=>{
    //return JSON.parse( localStorage.getItem(nameToken) || "" );
    return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Njc5MzM3ODksImRhdGEiOnsiaWQiOiIxIiwibm9tYnJlIjoiVVJJRUwifX0.x1QZXCDYsK9YovsmJm3Xh3_CrkqfaL94QjILhUn7Mh4";
}

export const setToken = (token : string) =>{
    localStorage.setItem(nameToken,JSON.stringify(token));
}


