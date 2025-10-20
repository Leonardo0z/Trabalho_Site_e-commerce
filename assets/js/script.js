//Carrossel

class Carrossel {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.carrossel-slide');
        this.btnsPrev = container.querySelector('.carrossel-btn.prev');
        this.btnsNext = container.querySelector('.carrossel-btn.next');
        this.currentIndex = 0;
        this.intervalId = null;
        this.autoPlayDelay = 5000; // 5 segundos
        
        this.init();
    }
    
    init() {
       
        
        // Event listeners para botões
        this.btnsPrev.addEventListener('click', () => this.prevSlide());
        this.btnsNext.addEventListener('click', () => this.nextSlide());
        
        // Iniciar autoplay
        this.startAutoPlay();
        
        // Pausar autoplay quando o mouse estiver sobre o carrossel
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    goToSlide(index) {
        this.slides[this.currentIndex].classList.remove('active');
        
        this.currentIndex = index;
        
        this.slides[this.currentIndex].classList.add('active');
        
        
    }
    
    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.intervalId = setInterval(() => this.nextSlide(), this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}


//Tema:


class ThemeSwitcher {
    constructor() {
        this.toggleBtn = document.getElementById('themeToggle');
        this.themeIcon = this.toggleBtn.querySelector('.theme-icon');
        this.themeText = this.toggleBtn.querySelector('.theme-text');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        this.init();
    }
    
    init() {
        // Aplicar tema salvo
        this.applyTheme(this.currentTheme);
        
        // Event listener para o botão
        this.toggleBtn.addEventListener('click', () => this.toggleTheme());
        
        // Atualizar ícone e texto
        this.updateButton();
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        this.updateButton();
        this.saveTheme();
    }
    
    applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
    }
    
    updateButton() {
        if (this.currentTheme === 'dark') {
            this.themeIcon.textContent = '☀️';
            this.themeText.textContent = 'Claro';
        } else {
            this.themeIcon.textContent = '🌙';
            this.themeText.textContent = 'Escuro';
        }
    }
    
    saveTheme() {
        localStorage.setItem('theme', this.currentTheme);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrossel
    const carrosselContainer = document.querySelector('.carrossel');
    if (carrosselContainer) {
        new Carrossel(carrosselContainer);
    }
    
    // Inicializar theme switcher
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        new ThemeSwitcher();
    }
});