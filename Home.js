var typed = new Typed(".text", {
    strings: ["Restaurant"], 
    typeSpeed: 100,  
    backSpeed: 100,  
    backDelay: 1000, 
    loop: true
});
document.addEventListener("DOMContentLoaded", () => {
    let orderList = document.getElementById("order-list");
    let totalAmount = document.getElementById("total-amount");
    let total = 0;

    // Function to add an item to the order list
    function addToOrder(name, price) {
        // If "No items added yet." exists, remove it
        if (orderList.querySelector("h3")) {
            orderList.innerHTML = "";
        }

        // Create order item
        let orderItem = document.createElement("div");
        orderItem.classList.add("order-item");
        orderItem.innerHTML = `
            <span class="item-name">${name}</span>
            <span class="item-price">₹${price.toFixed(2)}</span>
            <button class="remove-btn">Remove</button>
        `;

        // Remove item event
        orderItem.querySelector(".remove-btn").addEventListener("click", () => {
            total -= price;
            totalAmount.textContent = total.toFixed(2);
            orderItem.remove();
            if (orderList.children.length === 0) {
                orderList.innerHTML = "<h3>No items added yet.</h3>";
            }
        });

        // Add to list and update total
        orderList.appendChild(orderItem);
        total += price;
        totalAmount.textContent = total.toFixed(2);
    }

    // Attach event listeners to each "Order Now" button
    document.querySelectorAll(".order-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default anchor behavior

            let item = button.closest(".menu-item"); // Find the parent menu item
            if (!item) return;

            let name = item.querySelector("h3").textContent;
            let priceText = item.querySelector(".price").textContent.replace("₹", "").replace(",", "").trim();
            let price = parseFloat(priceText);

            if (!isNaN(price)) {
                addToOrder(name, price);
            } else {
                console.error("Invalid price for", name);
            }
        });
    });
});

function showQRCode() {
    let qrContainer = document.getElementById("qr-container");
    let totalAmount = document.getElementById("total-amount").textContent; // Get total amount

    if (parseFloat(totalAmount) === 0) {
        alert("No items in the cart! Please add items before paying.");
        return;
    }

    // UPI payment URL
    let upiLink = `upi://pay?pa=suryagopi104@oksbi&pn=SuryaGopi&am=${totalAmount}&cu=INR`;

    // Generate QR code using API
    qrContainer.innerHTML = `
        <h3>Scan to Pay</h3>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}" alt="QR Code">
        <p><strong>Total Amount: ₹${totalAmount}</strong></p>
        <p id="payment-status"></p>
    `;

    qrContainer.style.display = "block";
}
document.getElementById("booking-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from actually submitting

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let guests = document.getElementById("guests").value;

    alert(`Booking Confirmed!\nName: ${name}\nEmail: ${email}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}`);
});
document.getElementById("booking-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let tableNumber = document.getElementById("table-number").value;

    if (tableNumber === "") {
        alert("⚠️ Please select a table number!");
        return;
    }

    let bookingMessage = `✅ Booking Confirmed!\nName: ${name}\nDate: ${date}\nTime: ${time}\nTable: ${tableNumber}`;
    
    // Display alert message
    alert(bookingMessage);
    
    // Optionally, update the booking status on the page
    document.getElementById("booking-status").innerText = "🎉 Your booking has been confirmed!";
});
