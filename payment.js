document.addEventListener('DOMContentLoaded', () => {
    const summary = document.getElementById('summary');
    const nameInput = document.getElementById('name');
    const contactInput = document.getElementById('contact');
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const paymentAmountInput = document.getElementById('paymentAmount');
    const confirmPaymentButton = document.getElementById('confirmPayment');

    const messageBox = document.getElementById('messageBox');

    function displayMessage(message, color = 'red') {
        messageBox.textContent = message;
        messageBox.style.color = color;
    }

    function updateSummary() {
        const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
        const totalPrice = localStorage.getItem('totalPrice');
        summary.innerHTML = 'Selected Options:<br>' + selectedOptions.join('<br>') + '<br><br>Total Price: ' + totalPrice + '₱';
    }

    updateSummary();

    nameInput.addEventListener('input', function() {
        this.value = this.value.replace(/[0-9]/g, '');
    });

    contactInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validDomains = ['@gmail.com', '@yahoo.com', '@sjp2cd.edu.ph'];
        const isEmailValid = emailRegex.test(this.value) && validDomains.some(domain => this.value.endsWith(domain));

        if (!isEmailValid && this.value !== '') {
            displayMessage('Please enter a valid email address.');
            this.value = ''; 
        }
    });

    confirmPaymentButton.addEventListener('click', function() {
        if (!nameInput.value || !contactInput.value) {
            displayMessage('Please enter your contact information first.');
            return;
        }
        if (!paymentMethodSelect.value) {
            displayMessage('Pick a payment method.');
            return;
        }
        const enteredAmount = parseInt(paymentAmountInput.value, 10);
        const storedTotalPrice = parseInt(localStorage.getItem('totalPrice'), 10);
        if (enteredAmount !== storedTotalPrice) {
            displayMessage('The entered amount is insufficient or not the exact amount, please try again.');
            return;
        }
        displayMessage('Payment confirmed!', 'green');


        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });

        const receipt = `Receipt\n\nPayment Successful\nTotal Paid: ${localStorage.getItem('totalPrice')}₱\nDate: ${formattedDate}\n\nMembers:\n- Emanuel Rain Cereño\n- Christian Usod\n- Anthony Realiza\n- Mikko Geverola\n- Mac-Mac Del Norte\n- Ranger Jalop\n- Juan Carlo Agua\n\nThank you for your purchase! Happy Pitik`;
        const blob = new Blob([receipt], { type: 'text/plain' });
        const receiptUrl = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = receiptUrl;
        downloadLink.download = 'Receipt.txt';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        setTimeout(() => {
            window.location.href = 'index.html'; 
        }, 3000);
    });

    document.getElementById('backButton').addEventListener('click', () => {
        window.location.href = 'index.html'; 
    });
});
