document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.five img');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            if (i === index) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
    }

    function startSlideshow() {
        showImage(currentIndex);
        currentIndex = (currentIndex + 1) % images.length;
        setTimeout(startSlideshow, 4000); 
    }

    startSlideshow();
});

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.links a');

    links.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offset = targetElement.offsetTop;
            window.scrollTo({
                top: offset,
                behavior: 'smooth' 
            });
        }
    }
});

const slider = document.getElementById('hourSlider');
const hourValue = document.getElementById('hourValue');
const pricePerHour = document.getElementById('pricePerHour');

slider.oninput = function() {
    hourValue.innerHTML = this.value;
    pricePerHour.innerHTML = '₱' + (this.value * 1000).toLocaleString();
};

const serviceCheckboxes = document.querySelectorAll('.serviceCheckbox');

serviceCheckboxes.forEach(function(checkbox) {
    checkbox.onchange = function() {
        let serviceCost = 0;
        serviceCheckboxes.forEach(function(box) {
            if (box.checked) {
                serviceCost += 5000; 
            }
        });
        pricePerHour.innerHTML = '₱' + ((parseInt(hourValue.innerHTML) * 1000) + serviceCost).toLocaleString();
    };
});

document.getElementById('proceedButton').addEventListener('click', () => {

    const selectedHour = document.getElementById('hourValue').textContent;
    const selectedServices = Array.from(document.querySelectorAll('.serviceCheckbox'))
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.nextElementSibling.textContent);


    const totalPrice = parseInt(pricePerHour.textContent.replace('₱', '').replace(/,/g, ''), 10);


    localStorage.setItem('selectedOptions', JSON.stringify([...selectedServices, `Hours: ${selectedHour}`]));
    localStorage.setItem('totalPrice', totalPrice);

 
    window.location.href = 'payment.html';
});
