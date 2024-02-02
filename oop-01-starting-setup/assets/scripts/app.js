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

class ElementAttribute {
	constructor(attrName, attrValue) {
		this.name = attrName;
		this.value = attrValue;
	}
}

class Component {
	
	constructor(renderHookId) {
		console.log('this.hookId:', this.hookId);
		this.hookId = renderHookId;
	}

	createRootElement(tag, cssClasses, attributes) {
		const rootElement = document.createElement(tag);
		if (cssClasses) {
			rootElement.className = cssClasses;
		}
		if (attributes && attributes.lenngth > 0) {
			for (const attr of attributes) {
				rootElement.setAttribute(attr.name, attr.value);
			}
		}
		console.log(this.hoockId);
		document.getElementById(this.hookId).append(rootElement);
		return rootElement;
	}
}

class ShoppingCart extends Component {
	items = [];
	// cartItems = [];

	// set cartItems(value) {
    //     this.items = value;
    //     this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
	// 	console.log(this.cartItems, this.totalOutput, this.totalAmount);
    // }

    addCartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
		console.log(this.cartItems, this.totalOutput, this.totalAmount);
    }
	
    get totalAmount() {
        const sum = this.items.reduce(
            (prevValue, curItem) => prevValue + curItem.price,
            0
        );
        return sum;
    }
	
	constructor(renderHookId) {
		console.log(renderHookId);
		super(renderHookId);
	}

	addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.addCartItems(updatedItems);
	}

	render() {
		const cartEl = this.createRootElement('section', 'cart')
		cartEl.innerHTML = `
			<h2>Total: \$${0}</h2>
			<button>Order Now!</button>
		`;
		this.totalOutput = cartEl.querySelector('h2');
		return cartEl;
	}
}

class ProductItem {
	product;

	constructor(product) {
		this.product = product;
	}

	addToCart() {
		App.addProductToCart(this.product);
	}

	render() {
		const prodEl = document.createElement('li');
		prodEl.className = 'product-item';
		prodEl.innerHTML = `
			<div>
				<img src="${this.product.imageURL}" alt="${this.product.title}">
				<div class="product-item__content">
					<h2>${this.product.title}</h2>
					<h3>${this.product.price}\₩</h3>
					<p>${this.product.description}</p>
					<button>Add to Cart</button>
				</div>
			</div>
		`;
        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this));
        return prodEl;
	}
}

class ProductList {
	products = [
		new Product(
			'A Pillow',
			"https://woodique.co.kr/web/product/big/202201/8fd8ced872f1868c5a5d7074bf2c12cd.jpg",
			'A soft pillow!',
			2700
		),
		new Product(
			'A Carpet', 
			'https://i.namu.wiki/i/n5Z93n_WApTDRRj1Z_NtfrJTYpRQXp36mc2qOfVaeTiCAFlOV2mGI33ZZSjrq8oFORn1WApV84Tse36Ep4noWg.jpg', 
			'A Carpet which you might like - or not!',
			50000
		),
	];

	constructor() {}

    render() {
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const productItem = new ProductItem(prod);
            const prodEl = productItem.render();
            prodList.append(prodEl);
        }
        return prodList;
    }
}

class Shop {
    render() {
        const renderHook = document.getElementById('app');

        this.cart = new ShoppingCart('app');
        this.cart.render();
        const productList = new ProductList();
        const prodListEl = productList.render();

        renderHook.append(prodListEl);
    }
}

class App {
    static cart;

    static init() {
        const shop = new Shop();
        shop.render();
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();
