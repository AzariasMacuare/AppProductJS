class Product {
    constructor(name, price, year) {

        this.name = name;
        this.price = price;
        this.year = year;


    }
}

class UI {
    addProduct(product) {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        const productList = document.getElementById('productList');
        const element = document.createElement('div');
        for (let i = 0; i < tasks.length; i++) {
            let name = tasks[i].name;
            let price = tasks[i].price;
            let year = tasks[i].year;
        
        element.innerHTML = `
            <div id="${tasks.length}" class="card text-center mb-4">
                <div class="card-body">
                    <strong>Nombre del Producto</strong>: ${name}
                    <strong>Precio del Producto</strong>: ${price}
                    <strong>Año del Producto</strong>: ${year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;}
        productList.appendChild(element);
    }

    resetForm() {
        document.getElementById('productForm').reset();
    }

    deleteProduct(event) {
        let idElement = event.parentElement.parentElement.id
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        for (let i = 0; i < tasks.length; i++) {
             console.log(idElement)
             console.log(i)
        if (idElement == i) {
        //     console.log(tasks[i])
             tasks.splice(i, 1)
             console.log(tasks)

             }

        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        location.reload()
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        // div.className = 'alert alert-' + cssClass

        div.appendChild(document.createTextNode(message));
        // mostrar en pantalla el mensaje estilizado
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div, app);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    
}

window.onload = getTasks; 

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
        const productList = document.getElementById('productList');
        const element = document.createElement('div');
        for (let i = 0; i < tasks.length; i++) {
            let name = tasks[i].name;
            let price = tasks[i].price;
            let year = tasks[i].year;
        
        element.innerHTML += `
            <div id="${i}" class="card text-center mb-4">
                <div class="card-body">
                    <strong>Nombre del Producto</strong>: ${name}
                    <strong>Precio del Producto</strong>: ${price}
                    <strong>Año del Producto</strong>: ${year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;}
        productList.appendChild(element);

}


document.getElementById('productForm')
    .addEventListener('submit', function(event) {

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    
    const task = {
        name: name,
        price: price,
        year: year
    };
    if (localStorage.getItem('tasks') === null) {
        
            let tasks = [];
            tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    
    const product = new Product(name, price, year);
    const ui = new UI(product)

    if (name === '' || price === '' || year === '') {
        return ui.showMessage('Complete todos los campos por favor', 'info')
    }


    ui.addProduct(product)
    ui.resetForm()
    ui.showMessage('Producto Agregado Satisfactoriamente', 'success')


    event.preventDefault()

});


document.getElementById('productList').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteProduct(e.target)
});