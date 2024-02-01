class Product {
    title = "Default";
    imageURL;
    description;
    price;

    constructor(title, image, desc, price) {
        this.title = title;
        this.imageURL = image;
        this.description = desc;
        this.price = price;
    }
}

const productList = {
    products : [
        new Product(
            'A Pillow',
            "https://woodique.co.kr/web/product/big/202201/8fd8ced872f1868c5a5d7074bf2c12cd.jpg",
            'A soft pillow!',
            2000
        ),
        new Product(
            'A Carpet', 
            'https://i.namu.wiki/i/n5Z93n_WApTDRRj1Z_NtfrJTYpRQXp36mc2qOfVaeTiCAFlOV2mGI33ZZSjrq8oFORn1WApV84Tse36Ep4noWg.jpg', 
            'A Carpet which you might like - or not!',
            50000
        ),
    ],
    // 상품들이 출력될 수 있도록 하는 메서드
    render() {
        const renderHook = document.getElementById('app');
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products)
        {
            const prodEl = document.createElement('li');
            prodEl.className = 'product-item';
            prodEl.innerHTML = `
                <div>
                    <img src="${prod.imageURL}" alt="${prod.title}">
                    <div class="product-item__content">
                        <h2>${prod.title}</h2>
                        <h3>${prod.price}\₩</h3>
                        <p>${prod.description}</p>
                        <button>Add to Cart </button>
                    </div>
                </div>
            `;
            prodList.append(prodEl);
        }
        renderHook.append(prodList);
    }
    
}

productList.render();