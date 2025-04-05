// Toggle product quantity field when checkbox is clicked
function toggleQuantity(checkbox) {
  const quantityInput = checkbox.parentElement.querySelector('input[type="number"]');
  quantityInput.disabled = !checkbox.checked;
}

// Order form submission logic
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");
  const successMsg = document.getElementById("order-success");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const selectedItems = [];
      document.querySelectorAll('input[name="products"]:checked').forEach((checkbox) => {
        const product = checkbox.value;
        const quantity = checkbox.parentElement.querySelector('input[type="number"]').value;
        selectedItems.push({ product, quantity });
      });

      const name = form.name.value;
      const email = form.email.value;
      const address = form.address.value;

      console.log("Order Details:", {
        name,
        email,
        address,
        order: selectedItems
      });

      successMsg.style.display = "block";
      form.reset();
      document.querySelectorAll('input[type="number"]').forEach(input => input.disabled = true);
    });
  }

  // Newsletter form
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("newsletter-email").value;

      if (email) {
        document.getElementById("subscribe-message").style.display = "block";
        document.getElementById("newsletter-email").value = "";
      }
    });
  }

  // Mobile navbar toggle
  const toggleButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Fade-in animations
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, {
    threshold: 0.1
  });

  fadeEls.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });

  // Testimonials carousel
  const testimonials = document.querySelectorAll(".testimonial");
  let current = 0;

  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.classList.remove("active");
      if (i === index) testimonial.classList.add("active");
    });
  }

  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  if (prev && next) {
    prev.addEventListener("click", () => {
      current = (current - 1 + testimonials.length) % testimonials.length;
      showTestimonial(current);
    });

    next.addEventListener("click", () => {
      current = (current + 1) % testimonials.length;
      showTestimonial(current);
    });

    // Auto-rotate
    setInterval(() => {
      current = (current + 1) % testimonials.length;
      showTestimonial(current);
    }, 5000);
  }
});
