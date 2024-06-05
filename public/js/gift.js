// Function to handle the item purchased action
async function itemPurchased(giftId) {
    try {
        const response = await fetch(`/api/gifts/${giftId}/purchase`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ giftId })
        });

        if (response.ok) {
            alert('Item marked as purchased.');
            location.reload();
        } else {
            alert('Failed to mark item as purchased.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to mark item as purchased.');
    }
}

// Function to add an item to the cart
async function addToCart(eventId, giftId) {
    try {
        const response = await fetch(`/api/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId, giftId })
        });

        if (response.ok) {
            alert('Item added to cart.');
        } else {
            alert('Failed to add item to cart.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add item to cart.');
    }
}

// Event listeners for the buttons
document.querySelectorAll('.item-purchased-button').forEach(button => {
    button.addEventListener('click', event => {
        const eventId = event.target.getAttribute('data-event-id');
        itemPurchased(eventId);
    });
});

document.querySelectorAll('.add-cart-button').forEach(button => {
    button.addEventListener('click', event => {
        const eventId = event.target.getAttribute('data-event-id');
        const giftId = event.target.getAttribute('data-gift-id');
        addToCart(eventId, giftId);
    });
});
