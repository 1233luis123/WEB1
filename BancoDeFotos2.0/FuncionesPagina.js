
// Sistema de almacenamiento temporal de mascotas
let mascotasData = {
    perdidas: [
        {
            id: 1,
            nombre: "Max",
            especie: "Perro",
            raza: "Golden Retriever",
            color: "Dorado",
            sexo: "Macho",
            edad: "3 años",
            fechaPerdida: "2024-09-20",
            ubicacion: "Miraflores, Lima",
            descripcion: "Perro muy amigable, lleva collar azul con placa.",
            imagen: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            contacto: "María García - 987654321",
            estado: "perdido",
            recompensa: "S/ 500"
        },
        {
            id: 2,
            nombre: "Luna",
            especie: "Perro",
            raza: "Labrador",
            color: "Negro",
            sexo: "Hembra",
            edad: "2 años",
            fechaPerdida: "2024-09-22",
            ubicacion: "San Borja, Lima",
            descripcion: "Perra juguetona, respondía al nombre Luna.",
            imagen: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            contacto: "Carlos Mendoza - 965478321",
            estado: "perdido",
            recompensa: "S/ 300"
        },
        {
            id: 3,
            nombre: "Rocky",
            especie: "Perro",
            raza: "Mestizo",
            color: "Café y blanco",
            sexo: "Macho",
            edad: "5 años",
            fechaPerdida: "2024-09-18",
            ubicacion: "Surco, Lima",
            descripcion: "Perro grande, tiene una cicatriz en la oreja izquierda.",
            imagen: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            contacto: "Ana Torres - 912345678",
            estado: "perdido",
            recompensa: "S/ 400"
        }
    ],
    encontradas: [
        {
            id: 4,
            nombre: "Desconocido",
            especie: "Perro",
            raza: "Chihuahua",
            color: "Café",
            sexo: "Hembra",
            edad: "Adulto",
            fechaEncuentro: "2024-09-23",
            ubicacion: "La Molina, Lima",
            descripcion: "Pequeña perra encontrada en el parque, muy asustada.",
            imagen: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            contacto: "Refugio Esperanza - 945123789",
            estado: "encontrado"
        }
    ],
    adopcion: [
        {
            id: 5,
            nombre: "Bella",
            especie: "Perro",
            raza: "Mestizo",
            color: "Blanco y marrón",
            sexo: "Hembra",
            edad: "1 año",
            ubicacion: "Refugio Vida Animal",
            descripcion: "Bella es una perrita muy cariñosa, esterilizada y con vacunas al día.",
            imagen: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            contacto: "Refugio Vida Animal - 987456123",
            estado: "adopcion",
            requisitos: "Casa con jardín, experiencia previa con perros"
        },
        {
            id: 6,
            nombre: "Thor",
            especie: "Perro",
            raza: "Pastor Alemán",
            color: "Negro y marrón",
            sexo: "Macho",
            edad: "4 años",
            ubicacion: "Refugio Esperanza",
            descripcion: "Thor es un perro guardián muy leal, necesita una familia experimentada.",
            imagen: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            contacto: "Refugio Esperanza - 945123789",
            estado: "adopcion",
            requisitos: "Casa grande, experiencia con perros grandes"
        }
    ]
};

// Funciones de utilidad
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function calculateDaysAgo(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Función para animar contadores
function animateCounters() {
    const counters = document.querySelectorAll('#mascotas-reportadas, #mascotas-encontradas, #comunidades, #voluntarios');
    
    counters.forEach(counter => {
        const target = parseInt(counter.innerText);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            counter.innerText = Math.floor(current);
            
            if (current >= target) {
                counter.innerText = target;
                clearInterval(timer);
            }
        }, 20);
    });
}

// Función para cargar reportes recientes en la página principal
function loadRecentReports() {
    const container = document.getElementById('recent-reports');
    if (!container) return;
    
    const recentPets = [...mascotasData.perdidas, ...mascotasData.encontradas]
        .sort((a, b) => new Date(b.fechaPerdida || b.fechaEncuentro) - new Date(a.fechaPerdida || a.fechaEncuentro))
        .slice(0, 3);
    
    container.innerHTML = recentPets.map(pet => `
        <div class="col-md-4">
            <div class="card pet-card">
                <div class="position-relative">
                    <img src="${pet.imagen}" class="pet-card-img" alt="${pet.nombre}">
                    <span class="pet-status status-${pet.estado}">${pet.estado.toUpperCase()}</span>
                </div>
                <div class="pet-card-body">
                    <h5 class="card-title">${pet.nombre}</h5>
                    <p class="text-muted mb-2">
                        <i class="fas fa-map-marker-alt"></i> ${pet.ubicacion}
                    </p>
                    <p class="text-muted mb-2">
                        <i class="fas fa-calendar"></i> 
                        ${formatDate(pet.fechaPerdida || pet.fechaEncuentro)}
                        (${calculateDaysAgo(pet.fechaPerdida || pet.fechaEncuentro)} días)
                    </p>
                    <p class="card-text">${pet.descripcion}</p>
                    ${pet.recompensa ? `<p class="text-success fw-bold">Recompensa: ${pet.recompensa}</p>` : ''}
                    <button class="btn btn-primary btn-sm" onclick="showPetDetails(${pet.id})">
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Función para mostrar detalles de una mascota
function showPetDetails(id) {
    const pet = [...mascotasData.perdidas, ...mascotasData.encontradas, ...mascotasData.adopcion]
        .find(p => p.id === id);
    
    if (!pet) return;
    
    const modalHTML = `
        <div class="modal fade" id="petModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${pet.nombre} - ${pet.estado.toUpperCase()}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="${pet.imagen}" class="img-fluid rounded" alt="${pet.nombre}">
                            </div>
                            <div class="col-md-6">
                                <h4>${pet.nombre}</h4>
                                <p><strong>Especie:</strong> ${pet.especie}</p>
                                <p><strong>Raza:</strong> ${pet.raza}</p>
                                <p><strong>Color:</strong> ${pet.color}</p>
                                <p><strong>Sexo:</strong> ${pet.sexo}</p>
                                <p><strong>Edad:</strong> ${pet.edad}</p>
                                <p><strong>Ubicación:</strong> ${pet.ubicacion}</p>
                                <p><strong>Fecha:</strong> ${formatDate(pet.fechaPerdida || pet.fechaEncuentro || '2024-09-01')}</p>
                                ${pet.recompensa ? `<p><strong>Recompensa:</strong> ${pet.recompensa}</p>` : ''}
                                ${pet.requisitos ? `<p><strong>Requisitos:</strong> ${pet.requisitos}</p>` : ''}
                                <p><strong>Descripción:</strong> ${pet.descripcion}</p>
                                <p><strong>Contacto:</strong> ${pet.contacto}</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" onclick="contactOwner('${pet.contacto}')">
                            <i class="fas fa-phone"></i> Contactar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = new bootstrap.Modal(document.getElementById('petModal'));
    modal.show();
    
    document.getElementById('petModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

// Función para contactar al dueño
function contactOwner(contactInfo) {
    const phone = contactInfo.split(' - ')[1];
    if (phone) {
        window.open(`https://wa.me/51${phone}`, '_blank');
    } else {
        alert(`Información de contacto: ${contactInfo}`);
    }
}

// Función para manejar el formulario de reporte
function handleReportForm() {
    const form = document.getElementById('reportForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const newPet = {
            id: Date.now(),
            nombre: formData.get('nombre'),
            especie: formData.get('especie'),
            raza: formData.get('raza'),
            color: formData.get('color'),
            sexo: formData.get('sexo'),
            edad: formData.get('edad'),
            fechaPerdida: formData.get('fechaPerdida'),
            ubicacion: formData.get('ubicacion'),
            descripcion: formData.get('descripcion'),
            contacto: `${formData.get('contactoNombre')} - ${formData.get('contactoTelefono')}`,
            recompensa: formData.get('recompensa'),
            imagen: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            estado: "perdido"
        };
        
        mascotasData.perdidas.push(newPet);
        
        showSuccessMessage('¡Reporte enviado exitosamente! Tu mascota ha sido registrada en nuestro sistema.');
        form.reset();
        
        setTimeout(() => {
            window.location.href = 'galeria.html';
        }, 2000);
    });
}

// Función para mostrar mensajes de éxito
function showSuccessMessage(message) {
    const alertHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="fas fa-check-circle"></i> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertAdjacentHTML('afterbegin', alertHTML);
    }
}

// Función para manejar la búsqueda
function handleSearch() {
    const searchForm = document.getElementById('searchForm');
    if (!searchForm) return;
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(searchForm);
        const searchParams = {
            especie: formData.get('especie'),
            raza: formData.get('raza'),
            color: formData.get('color'),
            ubicacion: formData.get('ubicacion'),
            fechaDesde: formData.get('fechaDesde'),
            fechaHasta: formData.get('fechaHasta')
        };
        
        const results = filterPets(searchParams);
        displaySearchResults(results);
    });
}

// Función para filtrar mascotas
function filterPets(params) {
    const allPets = [...mascotasData.perdidas, ...mascotasData.encontradas];
    
    return allPets.filter(pet => {
        if (params.especie && pet.especie.toLowerCase() !== params.especie.toLowerCase()) return false;
        if (params.raza && !pet.raza.toLowerCase().includes(params.raza.toLowerCase())) return false;
        if (params.color && !pet.color.toLowerCase().includes(params.color.toLowerCase())) return false;
        if (params.ubicacion && !pet.ubicacion.toLowerCase().includes(params.ubicacion.toLowerCase())) return false;
        
        const petDate = new Date(pet.fechaPerdida || pet.fechaEncuentro);
        if (params.fechaDesde && petDate < new Date(params.fechaDesde)) return false;
        if (params.fechaHasta && petDate > new Date(params.fechaHasta)) return false;
        
        return true;
    });
}

// Función para mostrar resultados de búsqueda
function displaySearchResults(results) {
    const container = document.getElementById('searchResults');
    if (!container) return;
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center">
                    <i class="fas fa-search"></i>
                    <h4>No se encontraron resultados</h4>
                    <p>Intenta modificar los criterios de búsqueda o <a href="reportar.html">reporta una nueva mascota</a>.</p>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = results.map(pet => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card pet-card h-100">
                <div class="position-relative">
                    <img src="${pet.imagen}" class="pet-card-img" alt="${pet.nombre}">
                    <span class="pet-status status-${pet.estado}">${pet.estado.toUpperCase()}</span>
                </div>
                <div class="pet-card-body">
                    <h5 class="card-title">${pet.nombre}</h5>
                    <p class="text-muted mb-2">
                        <i class="fas fa-map-marker-alt"></i> ${pet.ubicacion}
                    </p>
                    <p class="text-muted mb-2">
                        <i class="fas fa-calendar"></i> 
                        ${formatDate(pet.fechaPerdida || pet.fechaEncuentro)}
                    </p>
                    <p class="card-text">${pet.descripcion}</p>
                    ${pet.recompensa ? `<p class="text-success fw-bold">Recompensa: ${pet.recompensa}</p>` : ''}
                    <div class="mt-auto">
                        <button class="btn btn-primary btn-sm w-100" onclick="showPetDetails(${pet.id})">
                            Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Función para cargar la galería
function loadGallery() {
    const container = document.getElementById('galleryContainer');
    if (!container) return;
    
    const allPets = [...mascotasData.perdidas, ...mascotasData.encontradas, ...mascotasData.adopcion];
    
    container.innerHTML = allPets.map(pet => `
        <div class="col-md-6 col-lg-4 mb-4 pet-item" data-category="${pet.estado}">
            <div class="card pet-card h-100">
                <div class="position-relative">
                    <img src="${pet.imagen}" class="pet-card-img" alt="${pet.nombre}">
                    <span class="pet-status status-${pet.estado}">${pet.estado.toUpperCase()}</span>
                </div>
                <div class="pet-card-body">
                    <h5 class="card-title">${pet.nombre}</h5>
                    <p class="text-muted mb-2">
                        <i class="fas fa-map-marker-alt"></i> ${pet.ubicacion}
                    </p>
                    <p class="text-muted mb-2">
                        <i class="fas fa-calendar"></i> 
                        ${formatDate(pet.fechaPerdida || pet.fechaEncuentro || '2024-09-01')}
                    </p>
                    <p class="card-text">${pet.descripcion}</p>
                    ${pet.recompensa ? `<p class="text-success fw-bold">Recompensa: ${pet.recompensa}</p>` : ''}
                    <div class="mt-auto">
                        <button class="btn btn-primary btn-sm w-100" onclick="showPetDetails(${pet.id})">
                            Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Función para filtrar galería
function filterGallery(category) {
    const items = document.querySelectorAll('.pet-item');
    const buttons = document.querySelectorAll('.filter-chip');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="filterGallery('${category}')"]`).classList.add('active');
    
    items.forEach(item => {
        if (category === 'todos' || item.dataset.category === category) {
            item.style.display = 'block';
            item.classList.add('fade-in-up');
        } else {
            item.style.display = 'none';
        }
    });
}

// Función para cargar mascotas en adopción
function loadAdoptionPets() {
    const container = document.getElementById('adoptionContainer');
    if (!container) return;
    
    container.innerHTML = mascotasData.adopcion.map(pet => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card pet-card h-100">
                <img src="${pet.imagen}" class="pet-card-img" alt="${pet.nombre}">
                <div class="pet-card-body">
                    <h5 class="card-title">${pet.nombre}</h5>
                    <p class="text-muted mb-2">
                        <i class="fas fa-venus-mars"></i> ${pet.sexo} • ${pet.edad}
                    </p>
                    <p class="text-muted mb-2">
                        <i class="fas fa-map-marker-alt"></i> ${pet.ubicacion}
                    </p>
                    <p class="card-text">${pet.descripcion}</p>
                    <p class="text-info"><strong>Requisitos:</strong> ${pet.requisitos}</p>
                    <div class="mt-auto">
                        <button class="btn btn-success w-100" onclick="showPetDetails(${pet.id})">
                            <i class="fas fa-heart"></i> Adoptar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Función para manejar el formulario de contacto
function handleContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        showSuccessMessage('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.');
        form.reset();
    });
}

// Función para manejar carga de archivos
function handleFileUpload() {
    const fileInput = document.getElementById('petImages');
    const uploadArea = document.querySelector('.file-upload');
    const previewContainer = document.getElementById('imagePreview');
    
    if (!fileInput || !uploadArea) return;
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        handleFiles(files);
    });
    
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
    
    function handleFiles(files) {
        if (!previewContainer) return;
        
        previewContainer.innerHTML = '';
        
        Array.from(files).slice(0, 5).forEach((file, index) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const previewHTML = `
                        <div class="preview-item">
                            <img src="${e.target.result}" alt="Preview ${index + 1}">
                            <button type="button" class="preview-remove" onclick="removePreview(this)">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `;
                    previewContainer.insertAdjacentHTML('beforeend', previewHTML);
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Función para remover preview de imagen
function removePreview(button) {
    button.parentElement.remove();
}

// Función para scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-animation').forEach(el => {
        observer.observe(el);
    });
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Funciones generales
    loadRecentReports();
    handleReportForm();
    handleSearch();
    loadGallery();
    loadAdoptionPets();
    handleContactForm();
    handleFileUpload();
    initScrollAnimations();
    
    // Animar contadores si están presentes
    setTimeout(animateCounters, 500);
    
    // Configurar fecha máxima para inputs de fecha (hoy)
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        if (input.name === 'fechaPerdida' || input.name === 'fechaHasta') {
            input.max = today;
        }
    });
});

// Función para el botón "Volver arriba"
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}