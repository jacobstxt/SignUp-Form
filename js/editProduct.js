const ProductForm = document.getElementById('createProductForm');


ProductForm.onsubmit = (e) => {
    e.preventDefault();

    const imageElements = document.querySelectorAll('#ProductImagesList img');
    let image = null;

    imageElements.forEach(img => {
        if (img.src.startsWith("data:")) {
            image = img.src; 
        }
    });

    const xhr = new XMLHttpRequest();

    const data = {
        id: new URLSearchParams(window.location.search).get('id') || null,
        name: document.getElementById("ProductTitle").value,
        priority: document.getElementById("ProductPriority").value,
        categoryId: parseInt(document.getElementById("ProductCategory").value),
        price: document.getElementById("ProductPrice").value,
        description: tinymce.get("ProductDescription").getContent(),
        image: image, 
        ids: [] 
    };


    console.log("info", data);

    const url = `${window.API_BASE_URL}/api/Products/edit`;
    show_loading();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    hide_loading();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const resp = xhr.responseText;
                location.href = "/partials/productsList.html";
            } else {
                HandleError(xhr.responseText);
            }
        }
    };

    xhr.send(JSON.stringify(data));
}



function HandleError(responseText) {
    console.log(responseText);
}





window.addEventListener('load', async () => {
    const id = new URLSearchParams(window.location.search).get('id') || null;
    console.log("id", id);

    const response = await axios.get(`${window.API_BASE_URL}/api/Products/get/${id}`, {
        headers: {
            'Accept': '*/*'
        }
    });

    const { data } = response;
    console.log("Дані", data);


    document.getElementById('ProductTitle').value = data.name;
    document.getElementById('ProductCategory').value = data.categoryId;
    document.getElementById('ProductPriority').value = data.priority;
    document.getElementById('ProductPrice').value = data.price;
    tinymce.get("ProductDescription").setContent(data.description);

    const imagesContainer = document.getElementById('ProductImagesList');
    imagesContainer.innerHTML = "";

    data.images.forEach(img => {
        const imageElement = document.createElement("img");
        imageElement.src = `${window.API_BASE_URL}/images/100_${img.name}`;
        imageElement.alt = "Product image";
        imageElement.className = "h-32 rounded shadow";
        imagesContainer.appendChild(imageElement);
    });

});