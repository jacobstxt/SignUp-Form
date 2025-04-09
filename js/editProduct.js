const ProductForm = document.getElementById('createProductForm');



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
    document.getElementById('ProductCategory').value = data.categoryName;
    document.getElementById('ProductPriority').value = data.priority;
    document.getElementById('ProductPrice').value = data.price;
    tinymce.get("ProductDescription").setContent(data.description);

    const imagesContainer = document.getElementById('ProductImagesList');
    imagesContainer.innerHTML = "";

    data.images.foreach(img => {
        const imageElement = document.createElement("img");
        imageElement.src = `${window.API_BASE_URL}/images/100_${img.name}`;
        imageElement.alt = "Product image";
        imageElement.className = "h-32 rounded shadow";
        imagesContainer.appendChild(imageElement);
    });
});