// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('E-commerce website loaded!');
    
    // Initialize product data
    initializeProducts();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize testimonials
    initializeTestimonials();
    
    // Load cart and wishlist from localStorage
    cart.loadCart();
    wishlist.loadWishlist();
});

// Product data
const products = [
    {
        id: 1,
        name: 'Premium Wireless Headphones',
        category: 'Electronics',
        price: 999,
        originalPrice: 1499,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        rating: 4.8,
        ratingCount: 124,
        isFeatured: true,
        isNew: true,
        onSale: true,
        description: 'Experience premium sound quality with these wireless headphones. Features active noise cancellation and 30-hour battery life.'
    },
    {
        id: 2,
        name: 'Designer Leather Watch',
        category: 'Fashion',
        price: 399,
        originalPrice: 699,
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        rating: 4.6,
        ratingCount: 86,
        isFeatured: true,
        isNew: false,
        onSale: false,
        description: 'Elegant designer watch with genuine leather strap. Water-resistant up to 50 meters and scratch-resistant sapphire glass.'
    },
    {
        id: 3,
        name: 'Smart Home Speaker',
        category: 'Electronics',
        price: 299,
        originalPrice: 499,
        image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        rating: 4.5,
        ratingCount: 203,
        isFeatured: true,
        isNew: false,
        onSale: true,
        description: 'Voice-controlled smart speaker with premium sound quality. Compatible with all major smart home ecosystems.'
    },
    {
        id: 4,
        name: 'Luxury Scented Candle',
        category: 'Home & Decor',
        price: 149,
        originalPrice: 199,
        image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        rating: 4.9,
        ratingCount: 75,
        isFeatured: true,
        isNew: true,
        onSale: false,
        description: 'Hand-poured luxury scented candle made with 100% natural soy wax. Up to 60 hours of burn time.'
    },
    {
        id: 5,
        name: 'Premium Facial Serum',
        category: 'Beauty',
        price: 99,
        originalPrice: 199,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        rating: 4.7,
        ratingCount: 112,
        isFeatured: false,
        isNew: true,
        onSale: true,
        description: 'Advanced anti-aging facial serum with hyaluronic acid and vitamin C. Clinically proven to reduce fine lines and wrinkles.'
    },
    {
        id: 6,
        name: 'Designer Sunglasses',
        category: 'Fashion',
        price: 99,
        originalPrice: 199,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        rating: 4.4,
        ratingCount: 67,
        isFeatured: false,
        isNew: false,
        onSale: true,
        description: 'Polarized designer sunglasses with UV protection. Lightweight frame and premium carrying case included.'
    },
    {
        id: 7,
        name: 'Marble Coffee Table',
        category: 'Home & Decor',
        price: 1999,
        originalPrice: 2999,
        image: 'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        rating: 4.8,
        ratingCount: 42,
        isFeatured: false,
        isNew: true,
        onSale: false,
        description: 'Modern coffee table with genuine marble top and solid wood legs. A statement piece for any living room.'
    },
    {
        id: 8,
        name: 'Wireless Charging Pad',
        category: 'Electronics',
        price: 2999,
        originalPrice: 4999,
        image: 'https://wayona.in/wp-content/uploads/2024/04/3-in-1-Wireless_Black-_Listing-Image-1.jpg',
        rating: 4.3,
        ratingCount: 189,
        isFeatured: false,
        isNew: false,
        onSale: true,
        description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.'
    }
];

// Testimonial data
const testimonials = [
    {
        id: 1,
        name: 'Emily Johnson',
        role: 'Regular Customer',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        quote: 'LuxeMarket has completely transformed my shopping experience. The quality of products and attention to detail is unmatched. I\'ve been a loyal customer for over two years now!'
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Design Professional',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        quote: 'As a designer, I appreciate the curated collection and premium quality of everything LuxeMarket offers. Their home decor items have elevated my living space.'
    },
    {
        id: 3,
        name: 'Sophia Rodriguez',
        role: 'Fashion Blogger',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        quote: 'The fashion collection at LuxeMarket is absolutely stunning. Each piece I\'ve purchased has been a conversation starter and the quality is exceptional!'
    }
];
// Cart functionality
const cart = {
    items: [],
    
    addItem: function(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            console.error('Product not found!');
            return;
        }
        
        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        this.updateCartUI();
        this.saveCart();
        
        // Show notification
        showNotification('Product added to cart!');
    },
    
    removeItem: function(productId) {
        const index = this.items.findIndex(item => item.id === productId);
        
        if (index !== -1) {
            this.items.splice(index, 1);
            this.updateCartUI();
            this.saveCart();
        }
    },
    
    updateQuantity: function(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.updateCartUI();
                this.saveCart();
            }
        }
    },
    
    clearCart: function() {
        this.items = [];
        this.updateCartUI();
        this.saveCart();
    },
    
    getTotal: function() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    getItemCount: function() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    },
    
    updateCartUI: function() {
        // Update cart count in header
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = this.getItemCount();
        
        // Update cart sidebar items
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';
        
        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
        } else {
            this.items.forEach(item => {
                const cartItemHTML = `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h4 class="cart-item-name">${item.name}</h4>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                            <div class="cart-item-actions">
                                <div class="quantity-control">
                                    <button class="quantity-btn decrease">-</button>
                                    <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                                    <button class="quantity-btn increase">+</button>
                                </div>
                                <button class="remove-item">Remove</button>
                            </div>
                        </div>
                    </div>
                `;
                
                cartItemsContainer.innerHTML += cartItemHTML;
            });
        }
        
        // Update total price
        const cartTotalPrice = document.getElementById('cart-total-price');
        cartTotalPrice.textContent = `$${this.getTotal().toFixed(2)}`;
        
        // Add event listeners to new cart items
        this.attachCartItemEvents();
    },
    
    attachCartItemEvents: function() {
        // Add event listeners to quantity buttons
        document.querySelectorAll('.cart-item .increase').forEach(btn => {
            btn.addEventListener('click', e => {
                const cartItem = e.target.closest('.cart-item');
                const productId = parseInt(cartItem.dataset.id);
                const currentItem = this.items.find(item => item.id === productId);
                if (currentItem) {
                    this.updateQuantity(productId, currentItem.quantity + 1);
                }
            });
        });
        
        document.querySelectorAll('.cart-item .decrease').forEach(btn => {
            btn.addEventListener('click', e => {
                const cartItem = e.target.closest('.cart-item');
                const productId = parseInt(cartItem.dataset.id);
                const currentItem = this.items.find(item => item.id === productId);
                if (currentItem) {
                    this.updateQuantity(productId, currentItem.quantity - 1);
                }
            });
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.cart-item .remove-item').forEach(btn => {
            btn.addEventListener('click', e => {
                const cartItem = e.target.closest('.cart-item');
                const productId = parseInt(cartItem.dataset.id);
                this.removeItem(productId);
            });
        });
    },
    
    saveCart: function() {
        localStorage.setItem('luxemarket-cart', JSON.stringify(this.items));
    },
    
    loadCart: function() {
        const savedCart = localStorage.getItem('luxemarket-cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
            this.updateCartUI();
        }
    }
};

// Wishlist functionality
const wishlist = {
    items: [],
    
    toggleItem: function(productId) {
        const index = this.items.indexOf(productId);
        
        if (index !== -1) {
            // Remove from wishlist
            this.items.splice(index, 1);
        } else {
            // Add to wishlist
            this.items.push(productId);
            
            // Show notification
            showNotification('Product added to wishlist!');
        }
        
        this.updateWishlistUI();
        this.saveWishlist();
    },
    
    isInWishlist: function(productId) {
        return this.items.includes(productId);
    },
    
    updateWishlistUI: function() {
        // Update wishlist count in header
        const wishlistCount = document.querySelector('.wishlist-count');
        wishlistCount.textContent = this.items.length;
        
        // Update wishlist button state in product cards
        document.querySelectorAll('.product-card').forEach(card => {
            const productId = parseInt(card.dataset.id);
            const wishlistBtn = card.querySelector('.wishlist-btn');
            
            if (wishlistBtn) {
                if (this.isInWishlist(productId)) {
                    wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
                    wishlistBtn.classList.add('in-wishlist');
                } else {
                    wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
                    wishlistBtn.classList.remove('in-wishlist');
                }
            }
        });
    },
    
    saveWishlist: function() {
        localStorage.setItem('luxemarket-wishlist', JSON.stringify(this.items));
    },
    
    loadWishlist: function() {
        const savedWishlist = localStorage.getItem('luxemarket-wishlist');
        if (savedWishlist) {
            this.items = JSON.parse(savedWishlist);
            this.updateWishlistUI();
        }
    }
};
// Initialize products
function initializeProducts() {
    renderFeaturedProducts();
    renderAllProducts();
}

// Render featured products
function renderFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    
    const featuredProducts = products.filter(product => product.isFeatured);
    
    featuredContainer.innerHTML = '';
    
    featuredProducts.forEach(product => {
        featuredContainer.innerHTML += createProductCard(product);
    });
    
    // Add event listeners to product cards
    attachProductCardEvents(featuredContainer);
}

// Render all products
function renderAllProducts(filteredProducts = null) {
    const productsContainer = document.getElementById('all-products');
    if (!productsContainer) return;
    
    const productsToRender = filteredProducts || products;
    
    productsContainer.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productsContainer.innerHTML = '<div class="no-products">No products found matching your criteria</div>';
        return;
    }
    
    productsToRender.forEach(product => {
        productsContainer.innerHTML += createProductCard(product);
    });
    
    // Add event listeners to product cards
    attachProductCardEvents(productsContainer);
}

// Create product card HTML
function createProductCard(product) {
    const isInWishlist = wishlist.isInWishlist(product.id);
    const wishlistIcon = isInWishlist ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    const wishlistClass = isInWishlist ? 'in-wishlist' : '';
    
    let badgeHTML = '';
    if (product.isNew) {
        badgeHTML = '<div class="product-badge">New</div>';
    } else if (product.onSale) {
        badgeHTML = '<div class="product-badge">Sale</div>';
    }
    
    let originalPriceHTML = '';
    if (product.originalPrice) {
        originalPriceHTML = `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>`;
    }
    
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                ${badgeHTML}
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button class="product-action-btn quick-view-btn" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="product-action-btn wishlist-btn ${wishlistClass}" title="Add to Wishlist">
                        ${wishlistIcon}
                    </button>
                    <button class="product-action-btn add-to-cart-btn" title="Add to Cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name"><a href="#">${product.name}</a></h3>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    ${originalPriceHTML}
                </div>
                <div class="product-rating">
                    ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                    ${product.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                    <span class="rating-count">(${product.ratingCount})</span>
                </div>
            </div>
        </div>
    `;
}

// Attach event listeners to product cards
function attachProductCardEvents(container) {
    // Quick view buttons
    container.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.dataset.id);
            openQuickView(productId);
        });
    });
    
    // Wishlist buttons
    container.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.dataset.id);
            wishlist.toggleItem(productId);
        });
    });
    
    // Add to cart buttons
    container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.dataset.id);
            cart.addItem(productId);
        });
    });
}

// Filter products based on criteria
function filterProducts() {
    const sortBy = document.getElementById('sort-by').value;
    const filterCategory = document.getElementById('filter-category').value;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (filterCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category.toLowerCase() === filterCategory
        );
    }
    
    // Sort products
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => (b.isNew === a.isNew) ? 0 : b.isNew ? 1 : -1);
            break;
        default:
            // Default sorting (keep original order)
            break;
    }
    
    // Render the filtered products
    renderAllProducts(filteredProducts);
}
// Open quick view modal
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const modal = document.getElementById('quick-view-modal');
    const modalContent = document.getElementById('quick-view-content');
    const modalOverlay = document.getElementById('modal-overlay');
    
    if (!modal || !modalContent || !modalOverlay) {
        console.error('Quick view modal elements not found');
        return;
    }
    
    const isInWishlist = wishlist.isInWishlist(product.id);
    const wishlistIcon = isInWishlist ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    const wishlistClass = isInWishlist ? 'in-wishlist' : '';
    
    let originalPriceHTML = '';
    if (product.originalPrice) {
        originalPriceHTML = `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>`;
    }
    
    modalContent.innerHTML = `
        <div class="product-quick-view">
            <div class="quick-view-gallery">
                <div class="quick-view-main-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="quick-view-thumbnails">
                    <div class="quick-view-thumbnail active">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <!-- More thumbnails would go here in a real product -->
                </div>
            </div>
            <div class="quick-view-info">
                <div class="quick-view-category">${product.category}</div>
                <h2 class="quick-view-title">${product.name}</h2>
                <div class="quick-view-price">
                    $${product.price.toFixed(2)}
                    ${originalPriceHTML}
                </div>
                <div class="quick-view-rating">
                    ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                    ${product.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                    <span>(${product.ratingCount} reviews)</span>
                </div>
                <div class="quick-view-description">
                    <p>${product.description}</p>
                </div>
                <div class="product-variants">
                    <div class="variant-label">Color:</div>
                    <div class="color-options">
                        <div class="color-option active" style="background-color: #2c3e50;"></div>
                        <div class="color-option" style="background-color: #e74c3c;"></div>
                        <div class="color-option" style="background-color: #3498db;"></div>
                    </div>
                    
                    <div class="variant-label">Size:</div>
                    <div class="size-options">
                        <div class="size-option">S</div>
                        <div class="size-option active">M</div>
                        <div class="size-option">L</div>
                        <div class="size-option">XL</div>
                    </div>
                </div>
                <div class="product-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn decrease">-</button>
                        <input type="text" class="quantity-input" value="1" readonly>
                        <button class="quantity-btn increase">+</button>
                    </div>
                    <button class="btn primary-btn add-to-cart-btn">Add to Cart</button>
                </div>
                <div class="product-meta">
                    <p><span>SKU:</span> ${product.id.toString().padStart(6, '0')}</p>
                    <p><span>Categories:</span> ${product.category}</p>
                    <p>
                        <span>Share:</span>
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-pinterest-p"></i></a>
                    </p>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    const quickViewQuantityInput = modalContent.querySelector('.quantity-input');
    
    modalContent.querySelector('.decrease').addEventListener('click', () => {
        let quantity = parseInt(quickViewQuantityInput.value);
        if (quantity > 1) {
            quickViewQuantityInput.value = quantity - 1;
        }
    });
    
    modalContent.querySelector('.increase').addEventListener('click', () => {
        let quantity = parseInt(quickViewQuantityInput.value);
        quickViewQuantityInput.value = quantity + 1;
    });
    
    modalContent.querySelector('.add-to-cart-btn').addEventListener('click', () => {
        const quantity = parseInt(quickViewQuantityInput.value);
        cart.addItem(product.id, quantity);
        closeQuickView();
    });
    
    // Color options
    modalContent.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', () => {
            modalContent.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
            option.classList.add('active');
        });
    });
    
    // Size options
    modalContent.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', () => {
            modalContent.querySelectorAll('.size-option').forEach(o => o.classList.remove('active'));
            option.classList.add('active');
        });
    });
    
    // Open modal
    modal.classList.add('open');
    modalOverlay.classList.add('open');
}

// Close quick view modal
function closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    
    if (modal) modal.classList.remove('open');
    if (modalOverlay) modalOverlay.classList.remove('open');
}

// Initialize testimonials
function initializeTestimonials() {
    const sliderContainer = document.getElementById('testimonial-slider');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    if (!sliderContainer || !dotsContainer) return;
    
    // Create testimonial slides
    testimonials.forEach((testimonial, index) => {
        // Create testimonial slide
        const slide = document.createElement('div');
        slide.className = `testimonial-slide${index === 0 ? ' active' : ''}`;
        slide.innerHTML = `
            <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-avatar">
            <div class="testimonial-quote">${testimonial.quote}</div>
            <div class="testimonial-author">${testimonial.name}</div>
            <div class="testimonial-role">${testimonial.role}</div>
        `;
        sliderContainer.appendChild(slide);
        
        // Create dot for this testimonial
        const dot = document.createElement('div');
        dot.className = `testimonial-dot${index === 0 ? ' active' : ''}`;
        dot.dataset.index = index;
        dot.addEventListener('click', () => {
            changeTestimonial(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    // Auto rotate testimonials
    let currentTestimonial = 0;
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        changeTestimonial(currentTestimonial);
    }, 5000);
}

// Change active testimonial
function changeTestimonial(index) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Show selected slide
    slides[index].classList.add('active');
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// Show notification
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    // Set message and show notification
    notification.textContent = message;
    notification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Setup all event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
        });
    }
    
    // Cart toggle
    const cartToggle = document.getElementById('cart-toggle');
    const closeCart = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartToggle && cartSidebar) {
        cartToggle.addEventListener('click', () => {
            cartSidebar.classList.add('open');
            if (cartOverlay) cartOverlay.classList.add('open');
        });
        
        if (closeCart) {
            closeCart.addEventListener('click', () => {
                cartSidebar.classList.remove('open');
                if (cartOverlay) cartOverlay.classList.remove('open');
            });
        }
        
        if (cartOverlay) {
            cartOverlay.addEventListener('click', () => {
                cartSidebar.classList.remove('open');
                cartOverlay.classList.remove('open');
            });
        }
    }
    
    // Quick view close
    const closeQuickViewBtn = document.getElementById('close-quick-view');
    
    if (closeQuickViewBtn) {
        closeQuickViewBtn.addEventListener('click', closeQuickView);
    }
    
    // Modal overlay click to close
    const modalOverlay = document.getElementById('modal-overlay');
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeQuickView);
    }
    
    // Product filter
    const sortBy = document.getElementById('sort-by');
    const filterCategory = document.getElementById('filter-category');
    
    if (sortBy) {
        sortBy.addEventListener('change', filterProducts);
    }
    
    if (filterCategory) {
        filterCategory.addEventListener('change', filterProducts);
    }
    
    // View options
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const productGrid = document.getElementById('all-products');
    
    if (gridViewBtn && listViewBtn && productGrid) {
        gridViewBtn.addEventListener('click', () => {
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            productGrid.classList.remove('list-view');
        });
        
        listViewBtn.addEventListener('click', () => {
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            productGrid.classList.add('list-view');
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', e => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                showNotification('Thanks for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Search form
    const searchForm = document.querySelector('.search-bar');
    
    if (searchForm) {
        searchForm.addEventListener('submit', e => {
            e.preventDefault();
            const searchInput = searchForm.querySelector('input[type="search"]');
            if (searchInput && searchInput.value) {
                showNotification(`Search results for "${searchInput.value}" would display here.`);
                searchInput.value = '';
            }
        });
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', e => {
            e.preventDefault();
            showNotification('Checkout functionality would be implemented here.');
        });
    }
}
