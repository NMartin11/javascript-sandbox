document.getElementById('button1').addEventListener('click', loadCustomer);

function loadCustomer(e) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'customer.json', true);

    xhr.onload = function() {
        if(this.status === 200) {
            const customer = JSON.parse(this.responseText);
            const output = `
                <ul>
                    <li>ID: ${customer.id}</li>
                    <li>ID: ${customer.name}</li>
                    <li>ID: ${customer.company}</li>
                    <li>ID: ${customer.phone}</li>
                </ul>
            `; 

            document.getElementById('customer').innerHTML = output;
        }
    }

    xhr.send();
}