document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !message) return;

  const webhookURL = "your webhook url";

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const timeString = currentDate.toLocaleTimeString('ar-EG', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const payload = {
    embeds: [
      {
        title: "📨 شكاوي تايلند كود",
        color: 11141375,
        fields: [
          {
            name: "👤 الاسم داخل الديسكورد",
            value: name,
            inline: false
          },
          {
            name: "📝 تفاصيل الشكوى",
            value: message,
            inline: false
          },
          {
            name: "📅 تاريخ الإرسال",
            value: `${dateString} - ${timeString}`,
            inline: false
          }
        ],
        footer: {
          text: "تم ارسال هذي الشكوة عبر موقع تايلند كود",
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(() => {
    showToast("✅ تم إرسال شكواك بنجاح!", "success");
    document.querySelector('.contact-form').reset();
  }).catch(() => {
    showToast("❌ حدث خطأ أثناء الإرسال، حاول لاحقًا.", "error");
  });
});

function showToast(message, type = "success") {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerText = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 5000);
}
