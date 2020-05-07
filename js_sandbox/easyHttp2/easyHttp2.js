/**
 * EasyHttp library version 2
 * @version 2.0.0
 */

 class EasyHttp {
     // make an http GET request
     get(url) {
         return new Promise((resolve, reject) => {
            fetch(url)
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
         })
     }

     // make an http Post request
     post(url) {
         return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
         })
     }

     // Make an http put request
     put(url) {
         return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
         })
     }

     delete(url) {
         return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(() => resolve('Resource Deleted...'))
            .catch(err => reject(err));
         })
     }
 }