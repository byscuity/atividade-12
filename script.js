// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona todos os links do menu
    const menuLinks = document.querySelectorAll('.menu a');
    
    // Adiciona efeito de clique com som
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Remove o comportamento padrão para demonstração
            
            // Obtém o texto do item clicado
            const itemText = this.textContent.trim();
            
            // Cria um efeito visual de feedback
            showClickFeedback(this, itemText);
            
            // Exibe no console qual item foi clicado
            console.log(`Item clicado: ${itemText}`);
        });
    });
    
    // Função para mostrar feedback visual do clique
    function showClickFeedback(element, text) {
        // Cria um elemento de feedback temporário
        const feedback = document.createElement('div');
        feedback.textContent = `✅ ${text} clicado!`;
        feedback.style.position = 'fixed';
        feedback.style.bottom = '20px';
        feedback.style.left = '50%';
        feedback.style.transform = 'translateX(-50%)';
        feedback.style.backgroundColor = '#007bff';
        feedback.style.color = 'white';
        feedback.style.padding = '10px 20px';
        feedback.style.borderRadius = '8px';
        feedback.style.fontSize = '14px';
        feedback.style.fontWeight = 'bold';
        feedback.style.zIndex = '1000';
        feedback.style.opacity = '0';
        feedback.style.transition = 'opacity 0.3s ease';
        feedback.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
        
        document.body.appendChild(feedback);
        
        // Animação de fade in
        setTimeout(() => {
            feedback.style.opacity = '1';
        }, 10);
        
        // Remove o feedback após 2 segundos
        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 300);
        }, 2000);
    }
    
    // Efeito de sombra ao passar o mouse (opcional)
    const menuContainer = document.querySelector('.menu-container');
    
    menuContainer.addEventListener('mouseenter', function() {
        this.style.transition = 'box-shadow 0.3s ease';
        this.style.boxShadow = '0 15px 50px rgba(0, 123, 255, 0.2)';
    });
    
    menuContainer.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.5)';
    });
    
    // Adiciona efeito de ripple ao clicar (opcional)
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
    
    function createRipple(event, element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        ripple.style.pointerEvents = 'none';
        ripple.style.transform = 'scale(0)';
        ripple.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        ripple.style.opacity = '1';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.transform = 'scale(1)';
            ripple.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 500);
    }
});

// Adiciona estilos CSS para o efeito ripple via JavaScript
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.5s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
