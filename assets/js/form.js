document.addEventListener('DOMContentLoaded', function () {
  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const msg = document.getElementById('msg').value.trim();

      if (!name || !email || !msg) {
        showStatus('Please fill in all contact fields.', 'danger', contactForm);
        return;
      }

      if (!validateEmail(email)) {
        showStatus('Please enter a valid email address.', 'danger', contactForm);
        return;
      }

      showStatus('Your message has been sent successfully!', 'success', contactForm);
      contactForm.reset();
    });
  }

  // ========== CHECKOUT FORM ==========
  function renderOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderList = document.getElementById("order-summary-list");
    orderList.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
      orderList.innerHTML = `<li class="list-group-item text-center">Your cart is empty.</li>`;
      return;
    }

    cart.forEach(item => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        <span>${item.name}</span>
        <span>x${item.quantity}</span>
        <span>₹${(item.price * item.quantity).toFixed(2)}</span>
      `;
      total += item.price * item.quantity;
      orderList.appendChild(li);
    });

    const totalLi = document.createElement("li");
    totalLi.className = "list-group-item d-flex justify-content-between align-items-center border-top pt-3";
    totalLi.innerHTML = `
      <div>
        <strong>Total amount</strong>
        <p class="mb-0 small">(including VAT)</p>
      </div>
      <span><strong>₹${total.toFixed(2)}</strong></span>
    `;
    orderList.appendChild(totalLi);
  }

  // Form validation
  function validateForm() {
    const requiredFields = [
      "firstName", "lastName", "form18", "form19", "form14", "form16", "form17"
    ];
    for (let id of requiredFields) {
      const value = document.getElementById(id).value.trim();
      if (value === "") {
        alert("Please fill all required fields before proceeding.");
        return false;
      }
    }

    const country = document.querySelector("select.custom-select").value;
    if (!country) {
      alert("Please select your country.");
      return false;
    }

    // All validations passed
    return true;
  }

  // On DOM Load
  document.addEventListener("DOMContentLoaded", () => {
    renderOrderSummary();

    const purchaseBtn = document.querySelector(".btn-primary");
    purchaseBtn.addEventListener("click", (e) => {
      if (!validateForm()) {
        e.preventDefault(); // Prevent redirect
      } else {
        localStorage.removeItem("cart"); // Clear cart on successful purchase
      }
    });
  });

  // ========== COMMON FUNCTIONS ==========
  function showStatus(message, type, formElement) {
    let statusDiv = formElement.querySelector('#formStatus');
    if (!statusDiv) {
      statusDiv = document.createElement('div');
      statusDiv.id = 'formStatus';
      formElement.appendChild(statusDiv);
    }
    statusDiv.innerHTML = `<div class="alert alert-${type} mt-3">${message}</div>`;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
});
