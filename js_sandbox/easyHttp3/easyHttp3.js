/**
 * EasyHttp library version 2
 * @version 3.0.0
 */

 class EasyHttp {
     // make an http GET request
     async get(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
     }

     // make an http Post request
     async post(url) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json', 
                'Access-Control-Allow-Orgin': '*'
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        return resData;
     }

     // Make an http put request
     async put(url) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
     }

     async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        });
        const resData = await 'Resource Deleted...';
        return resData;
     }
 }