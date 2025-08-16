// Dark Mode Toggle - Perbaikan kecil
const darkModeToggle = document.querySelectorAll('[data-dark-mode-toggle]');

// System preference + local storage check
const applyDarkMode = () => {
  const isDark = localStorage.getItem('darkMode') === 'enabled' || 
                 (!localStorage.getItem('darkMode') && 
                  window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
};

// Initialize on load
applyDarkMode();

// Event delegation for all toggle buttons
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-dark-mode-toggle]');
  if (btn) {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', 
      document.documentElement.classList.contains('dark') ? 'enabled' : 'disabled');
  }
});

// Mobile Menu - Optimized
const mobileMenu = {
  button: document.getElementById('hamburger-button'),
  sidebar: document.getElementById('mobile-menu-sidebar'),
  closeBtn: document.getElementById('close-mobile-menu'),
  overlay: document.getElementById('mobile-menu-overlay'),
  
  init() {
    this.button?.addEventListener('click', this.open.bind(this));
    this.closeBtn?.addEventListener('click', this.close.bind(this));
    this.overlay?.addEventListener('click', this.close.bind(this));
    
    // Close when clicking any nav link
    this.sidebar?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', this.close.bind(this));
    });
  },
  
  open() {
    this.sidebar?.classList.add('open');
    this.overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  },
  
  close() {
    this.sidebar?.classList.remove('open');
    this.overlay.style.display = 'none';
    document.body.style.overflow = '';
  }
};

mobileMenu.init();

// Smooth Scrolling - Enhanced
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId === '#!') return;
    
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const offset = 80; // Sesuaikan dengan tinggi header Anda
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: targetPosition - offset,
        behavior: 'smooth'
      });
      
      // Update URL tanpa trigger reload
      history.pushState(null, null, targetId);
    }
  });
});

// Form Submission - Better UX
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    
    try {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Mengirim...';
      
      // Simulasi pengiriman (ganti dengan fetch/axios nyata)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Feedback visual
      const alertDiv = document.createElement('div');
      alertDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up';
      alertDiv.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Pesan terkirim! Saya akan segera menghubungi Anda.';
      document.body.appendChild(alertDiv);
      
      // Auto-hide alert
      setTimeout(() => {
        alertDiv.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => alertDiv.remove(), 300);
      }, 3000);
      
      this.reset();
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// Intersection Observer - Reusable
const createObserver = (elements, callback, options = { threshold: 0.1 }) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => entry.isIntersecting && callback(entry));
  }, options);
  
  elements.forEach(el => observer.observe(el));
  return observer;
};

// Fade-in elements
createObserver(
  document.querySelectorAll('.fade-in'),
  (entry) => {
    entry.target.style.opacity = '1';
    entry.target.style.transform = 'translateY(0)';
  }
);

// Gemini API - Enhanced
class PortfolioAI {
  constructor() {
    this.button = document.getElementById('ask-ai-button');
    this.input = document.getElementById('ai-question-input');
    this.responseArea = document.getElementById('ai-response-area');
    this.loader = document.getElementById('loading-spinner');
    
    this.init();
  }
  
  init() {
    this.button?.addEventListener('click', this.askAI.bind(this));
    this.input?.addEventListener('keypress', (e) => e.key === 'Enter' && this.askAI());
  }
  
  async askAI() {
    const question = this.input.value.trim();
    if (!question) {
      this.showResponse("Mohon masukkan pertanyaan Anda.", 'text-red-500');
      return;
    }
    
    this.setLoading(true);
    
    try {
      // Customize these based on actual portfolio
      const expertise = "UI/UX Designer dan Frontend Developer";
      const skills = "Figma, Adobe XD, HTML/CSS, JavaScript, React, User Research";
      const projects = "aplikasi e-commerce, dashboard analitik, sistem manajemen konten";
      
      const prompt = `Anda adalah asisten digital untuk seorang ${expertise}. Keahlian utama: ${skills}. Pengalaman proyek: ${projects}. Jawab pertanyaan berikut dengan gaya profesional dan ramah (maksimal 3 paragraf). Pertanyaan: "${question}"`;
      
      // In production, replace with actual API call
      const response = await this.mockAPICall(prompt); 
      
      this.showResponse(response, 'text-gray-700 dark:text-gray-300');
    } catch (error) {
      console.error("AI Error:", error);
      this.showResponse("Maaf, terjadi kesalahan. Silakan coba lagi.", 'text-red-500');
    } finally {
      this.setLoading(false);
    }
  }
  
  async mockAPICall(prompt) {
    // Simulasi delay jaringan
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Simulasi respon AI (ganti dengan API nyata)
    const responses = [
      `Sebagai seorang UI/UX Designer, saya biasanya melakukan riset pengguna terlebih dahulu sebelum memulai proyek ${prompt.includes('aplikasi') ? 'aplikasi' : 'website'}.`,
      `Untuk proyek ${prompt.includes('e-commerce') ? 'e-commerce' : 'serupa'}, saya menerapkan prinsip desain material dengan fokus pada usability.`,
      `Berdasarkan pengalaman saya, solusi terbaik untuk ${prompt.toLowerCase()} adalah dengan pendekatan user-centered design.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  setLoading(isLoading) {
    this.button.disabled = isLoading;
    isLoading ? this.loader.classList.remove('hidden') : this.loader.classList.add('hidden');
    if (isLoading) this.showResponse("Memproses pertanyaan Anda...");
  }
  
  showResponse(message, classes = '') {
    this.responseArea.innerHTML = `<p class="${classes}">${message}</p>`;
  }
}

// Initialize AI when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioAI();
});