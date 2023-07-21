const socket = io("http://localhost:3001/");

let selectedProductId = null;

// Function to join a chat room based on productId
function joinChatRoom(productId) {
	socket.emit("joinRoom", productId);
}

function leaveChatRoom(productId) {
	socket.emit("leaveRoom", productId);
}

function sendMessage(sender, receiver, productId, content) {
	const messageData = { sender, receiver, productId, content };
	socket.emit("sendMessage", messageData);
}

function displayMessage(message) {
	const chatArea = document.getElementById("chatArea");
	const messageElement = document.createElement("div");
	messageElement.textContent = `${message.sender}: ${message.content}`;
	chatArea.appendChild(messageElement);
}

socket.on("connect", () => {
	console.log("Connected to the server.");
	// Join the default chat room for a specific product (you can modify this based on your application's logic)
	const productId = "64ba6742547d854ed9079da3";
	joinChatRoom(productId);
});

socket.on("newMessage", (message) => {
	displayMessage(message);
});

socket.on("disconnect", () => {
	console.log("Disconnected from the server.");
});

// Handle product selection
const productList = document.querySelectorAll("#productList li");
productList.forEach((productItem) => {
	productItem.addEventListener("click", () => {
		// Remove 'selected' class from all product items
		productList.forEach((item) => {
			item.classList.remove("selected");
		});

		// Add 'selected' class to the clicked product item
		productItem.classList.add("selected");

		// Get the productId from the clicked product item
		selectedProductId = productItem.getAttribute("data-product-id");

		leaveChatRoom(); // Leave the current chat room (if any)
		joinChatRoom(selectedProductId); // Join the chat room for the selected product
	});
});

// Handle form submission to send a new message
const chatForm = document.getElementById("chatForm");
chatForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const messageInput = document.getElementById("messageInput");
	const content = messageInput.value.trim();
	if (content !== "" && selectedProductId) {
		// Use the selected productId when sending the new message
		const sender = "64b8d988656c66a4ac21fd71"; //seller Id
		const receiver = "64ba6c9b2c4f9cf722e10ab3";
		const productId = selectedProductId;
		sendMessage(sender, receiver, productId, content);
		messageInput.value = ""; // Clear the input field after sending
	}
});
