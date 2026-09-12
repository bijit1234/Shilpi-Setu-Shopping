// Cart utility for managing cart in localStorage (for anonymous users)
// and syncing with database when user logs in
const CART_STORAGE_KEY = 'shilpisetu_anonymous_cart';
/**
 * Get cart items from localStorage
 */
export function getAnonymousCart() {
    if (typeof window === 'undefined')
        return [];
    try {
        const cartJson = localStorage.getItem(CART_STORAGE_KEY);
        return cartJson ? JSON.parse(cartJson) : [];
    }
    catch (error) {
        console.error('Error reading cart from localStorage:', error);
        return [];
    }
}
/**
 * Save cart items to localStorage
 */
export function saveAnonymousCart(items) {
    if (typeof window === 'undefined')
        return;
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
    catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
}
/**
 * Add product to anonymous cart
 */
export function addToAnonymousCart(productId, quantity = 1) {
    const cart = getAnonymousCart();
    const existingItem = cart.find(item => item.product_id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    }
    else {
        cart.push({ product_id: productId, quantity });
    }
    saveAnonymousCart(cart);
}
/**
 * Update product quantity in anonymous cart
 */
export function updateAnonymousCartQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromAnonymousCart(productId);
        return;
    }
    const cart = getAnonymousCart();
    const item = cart.find(item => item.product_id === productId);
    if (item) {
        item.quantity = quantity;
        saveAnonymousCart(cart);
    }
}
/**
 * Remove product from anonymous cart
 */
export function removeFromAnonymousCart(productId) {
    const cart = getAnonymousCart();
    const filteredCart = cart.filter(item => item.product_id !== productId);
    saveAnonymousCart(filteredCart);
}
/**
 * Get total count of items in anonymous cart
 */
export function getAnonymousCartCount() {
    const cart = getAnonymousCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}
/**
 * Clear anonymous cart
 */
export function clearAnonymousCart() {
    if (typeof window === 'undefined')
        return;
    localStorage.removeItem(CART_STORAGE_KEY);
}
