// Sélection des éléments DOM
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.querySelector('.theme-toggle');
const voirPlusBtn = document.querySelector('.voir-plus');
const hiddenProjects = document.querySelector('.hidden-projects');
const voirPlusText = document.querySelector('.voir-plus-text');
const voirMoinsText = document.querySelector('.voir-moins-text');

// Gestion du son
const clickSound = new Audio('sounds/click.mp3');
const hoverSound = new Audio('sounds/hover.mp3');
const switchSound = new Audio('sounds/switch.mp3');

// Musique de fond
const backgroundMusic = new Audio('sounds/background-music.mp3');
backgroundMusic.loop = true; // La musique se répète
backgroundMusic.volume = 0.3; // Volume par défaut à 30%

// Gestion de la musique
const musicToggle = document.querySelector('.music-toggle');
let isMusicPlaying = true; // Musique activée par défaut

// Démarrer la musique au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic.play().catch(error => console.log('Erreur de lecture de la musique:', error));
    musicToggle.classList.add('playing');
});

// Fonction pour jouer/mettre en pause la musique
function toggleMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicToggle.classList.remove('playing');
    } else {
        backgroundMusic.play().catch(error => console.log('Erreur de lecture de la musique:', error));
        musicToggle.classList.add('playing');
    }
    isMusicPlaying = !isMusicPlaying;
}

// Ajout du contrôle du volume
const volumeControl = document.createElement('div');
volumeControl.className = 'volume-control';
volumeControl.innerHTML = `
    <input type="range" class="volume-slider" min="0" max="100" value="30">
`;
musicToggle.parentNode.insertBefore(volumeControl, musicToggle.nextSibling);

// Gestion du volume
const volumeSlider = volumeControl.querySelector('.volume-slider');
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    backgroundMusic.volume = volume;
});

// Événement pour le bouton de musique
musicToggle.addEventListener('click', () => {
    toggleMusic();
    playSound(switchSound);
});

// Fonction pour jouer un son
function playSound(sound) {
    sound.currentTime = 0; // Réinitialise le son
    sound.play().catch(error => console.log('Erreur de lecture du son:', error));
}

// Ajout des sons aux interactions
document.querySelectorAll('.btn, .nav-link, .project-card, .social-link').forEach(element => {
    // Son au survol
    element.addEventListener('mouseenter', () => playSound(hoverSound));
    // Son au clic
    element.addEventListener('click', () => playSound(clickSound));
});

// Son pour le changement de thème
themeToggle.addEventListener('click', () => playSound(switchSound));

// Gestion du thème
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Initialisation du thème
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// Toggle du thème
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Toggle menu mobile
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Gestion de la navigation active au scroll
function setActiveLink() {
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Animation au scroll
function reveal() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 150) {
            section.classList.add('reveal', 'active');
        }
    });
}

// Écouteurs d'événements pour le scroll
window.addEventListener('scroll', () => {
    setActiveLink();
    reveal();
});

// Appel initial pour les éléments visibles au chargement
reveal();
setActiveLink();

// Gestion du bouton "Voir plus"
if (voirPlusBtn && hiddenProjects) {
    voirPlusBtn.addEventListener('click', () => {
        hiddenProjects.classList.toggle('show');
        voirPlusBtn.classList.toggle('active');

        if (hiddenProjects.classList.contains('show')) {
            voirPlusText.style.display = 'none';
            voirMoinsText.style.display = 'inline';
            // Animation smooth scroll vers les nouveaux projets
            setTimeout(() => {
                hiddenProjects.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        } else {
            voirPlusText.style.display = 'inline';
            voirMoinsText.style.display = 'none';
        }
    });
}

// Animation smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Fonction pour animer les éléments au scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .timeline-item, .skill-item, .stat-item, .form-group, .contact-form');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
}

// Observer pour les animations au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            if (entry.target.classList.contains('section')) {
                // Animer les éléments à l'intérieur de la section
                const elements = entry.target.querySelectorAll('.project-card, .timeline-item, .skill-item, .stat-item, .form-group');
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('animate');
                    }, index * 100); // Délai progressif pour chaque élément
                });
            }
        }
    });
}, observerOptions);

// Observer les sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Écouteur d'événement pour le scroll
window.addEventListener('scroll', () => {
    animateOnScroll();
});

// Animation initiale au chargement
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

// Animation du texte typé
const roles = [
    "Étudiant en Informatique",
    "Développeur Full Stack",
    "Dev backend Laravel",
    "Dev frontend Angular",
    "Développeur Mobile (Flutter)",
];


const typedTextSpan = document.getElementById("typed-text");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function typeText() {
    const currentRole = roles[roleIndex];
    const shouldDelete = isDeleting && charIndex > 0;
    const shouldWrite = !isDeleting && charIndex < currentRole.length;

    if (shouldDelete) {
        // Effacer le texte
        typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else if (shouldWrite) {
        // Écrire le texte
        typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    } else if (isDeleting && charIndex === 0) {
        // Passer au rôle suivant
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        isPaused = false;
    } else if (!isDeleting && charIndex === currentRole.length) {
        // Commencer à effacer après une pause
        isPaused = true;
        setTimeout(() => {
            isDeleting = true;
            isPaused = false;
        }, 1000);
    }

    // Vitesse de frappe
    const writeSpeed = 80;
    const deleteSpeed = 50;
    const nextTick = isPaused ? 1000 :
        isDeleting ? deleteSpeed : writeSpeed;

    setTimeout(typeText, nextTick);
}

// Démarrer l'animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 500);
});

// Animation du curseur personnalisé
const cursor = document.querySelector('.custom-cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let speed = 0.2; // Vitesse de suivi du second point

// Mise à jour de la position principale du curseur
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Position du curseur principal
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Animation fluide du point qui suit
function animateTrailingDot() {
    // Calcul de la nouvelle position avec effet de lissage
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    // Application de la position au point qui suit
    cursor.style.setProperty('--trail-x', (cursorX - mouseX) + 'px');
    cursor.style.setProperty('--trail-y', (cursorY - mouseY) + 'px');

    requestAnimationFrame(animateTrailingDot);
}

animateTrailingDot();

// Effet au clic
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Cache le curseur quand la souris quitte la fenêtre
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

// Modal functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTechStack = document.getElementById('modalTechStack');
const closeModal = document.querySelector('.close-modal');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const currentImageNum = document.getElementById('currentImageNum');
const totalImages = document.getElementById('totalImages');

// Images du projet SAAT
const saatImages = [
    {
        src: 'images/projects/saat/saatDashboard.png',
        alt: 'Dashboard SAAT',
        description: 'Tableau de bord principal avec vue d\'ensemble du système'
    },
    {
        src: 'images/projects/saat/saatLogin.png',
        alt: 'Interface de connexion SAAT',
        description: 'Page de connexion sécurisée'
    },
    {
        src: 'images/projects/saat/saatProfil.png',
        alt: 'Profil utilisateur',
        description: 'Gestion du profil et des informations personnelles'
    },
    {
        src: 'images/projects/saat/saatDepense.png',
        alt: 'Gestion des dépenses',
        description: 'Interface de suivi et gestion des dépenses de la flotte'
    },
    {
        src: 'images/projects/saat/saatUser.png',
        alt: 'Gestion des employés',
        description: 'Gestion des utilisateurs avec leurs rôles avec possibilité d\'activer ou de désactiver un compte'
    },
    {
        src: 'images/projects/saat/saatTracteur.png',
        alt: 'Gestion des tracteurs',
        description: 'Suivi et gestion des tracteurs de la flotte'
    },
    {
        src: 'images/projects/saat/saatRemorque.png',
        alt: 'Gestion des remorques',
        description: 'Suivi et gestion des remorques de la flotte'
    },
    {
        src: 'images/projects/saat/saatPaiement.png',
        alt: 'Gestion des paiements',
        description: 'Suivi et gestion des paiements et transactions'
    },
    {
        src: 'images/projects/saat/saatMission.png',
        alt: 'Gestion des missions',
        description: 'Planification et suivi des missions de transport'
    },
    {
        src: 'images/projects/saat/saatMaintenance.png',
        alt: 'Maintenance des véhicules',
        description: 'Suivi et planification de la maintenance des véhicules'
    }
];

// Configuration des images pour le projet Jaapalante
const jaapalanteImages = [
    {
        src: 'images/projects/jaapalante/jaapalanteHome.png',
        alt: 'Page d\'accueil Jaapalante',
        description: 'Page d\'accueil de l\'application Jaapalante montrant une filtre des services disponibles '
    },
    {
        src: 'images/projects/jaapalante/jaapalanteProfil.png',
        alt: 'Page de profil Jaapalante',
        description: 'Interface de profil utilisateur avec les informations personnelles'
    },
    {
        src: 'images/projects/jaapalante/jaapalanteNotification.png',
        alt: 'Notifications Jaapalante',
        description: 'Système de notifications pour suivre les activités et demandes'
    },
    {
        src: 'images/projects/jaapalante/jaapalanteService.png',
        alt: 'Services Jaapalante',
        description: 'Interface de gestion des services proposés'
    },
    {
        src: 'images/projects/jaapalante/jaapalanteAjout.png',
        alt: 'Ajout de service Jaapalante',
        description: 'Interface d\'ajout de nouveau service'
    },
    {
        src: 'images/projects/jaapalante/jaapalanteLogin.png',
        alt: 'Page de connexion Jaapalante',
        description: 'Interface de connexion sécurisée'
    },
    {
        src: 'images/projects/jaapalante/jaapalanteAccepteService.png',
        alt: 'Acceptation de service Jaapalante',
        description: 'Interface d\'acceptation et de gestion des services'
    }
];

// Configuration des images pour le projet TurboSearch
const turboSearchImages = [
    {
        src: 'images/projects/turboSearch/turboSearchHome.png',
        alt: 'Accueil TurboSearch',
        description: 'Page d\'accueil de l\'application avec l\'interface principale'
    },
    {
        src: 'images/projects/turboSearch/turboSearchInsertion.png',
        alt: 'Insertion de véhicule',
        description: 'Interface d\'ajout de nouveau véhicule dans le système'
    },
    {
        src: 'images/projects/turboSearch/turboSearchSuppretion.png',
        alt: 'Suppression de véhicule',
        description: 'Interface de suppression de véhicule du parc automobile'
    },
    {
        src: 'images/projects/turboSearch/turboSearchDatabase.png',
        alt: 'Base de données',
        description: 'Vue de la base de données des véhicules'
    },
    {
        src: 'images/projects/turboSearch/turboSearchRecherche.png',
        alt: 'Recherche de véhicule',
        description: 'Interface de recherche rapide avec système de hachage'
    },
    {
        src: 'images/projects/turboSearch/turboSearchComparaison.png',
        alt: 'Comparaison des fonctions de hachage',
        description: 'Graphique comparatif des performances des différentes fonctions de hachage utilisées'
    }
];

// Configuration des images pour le projet TIC-TAC-TOE
const tictactoeImages = [
    {
        src: 'images/projects/tictactoe/TIC-TAC-TOE_GAME.png',
        alt: 'Interface principale du jeu',
        description: 'Interface principale du jeu avec la grille de morpion interactive'
    },
    {
        src: 'images/projects/tictactoe/tictactoeChoixSymbole.png',
        alt: 'Choix du symbole',
        description: 'Interface de sélection du symbole (X ou O) pour chaque joueur'
    },
    {
        src: 'images/projects/tictactoe/tictactoeResultat.png',
        alt: 'Résultat de la partie',
        description: 'Affichage du résultat avec animation de victoire'
    }
];

// Configuration des images pour le projet Inscription Pédagogique
const inscriptionImages = [
    {
        src: 'images/projects/inscription/login.png',
        alt: 'Page de connexion',
        description: 'Interface de connexion sécurisée pour les étudiants et administrateurs'
    },
    {
        src: 'images/projects/inscription/inscription.png',
        alt: 'Page d\'accueil',
        description: 'Page d\'accueil du système d\'inscription pédagogique'
    },
    {
        src: 'images/projects/inscription/administrationPublieMessagePourEtudiant.png',
        alt: 'Publication de Messages',
        description: 'Interface administrateur pour la publication de messages aux étudiants'
    },
    {
        src: 'images/projects/inscription/informationEtudiant.png',
        alt: 'Informations Étudiant',
        description: 'Vue détaillée des informations de l\'étudiant'
    },
    {
        src: 'images/projects/inscription/inscriptionEtudiant.png',
        alt: 'Inscription Étudiant',
        description: 'Processus d\'inscription pour les étudiants'
    },
    {
        src: 'images/projects/inscription/portailEtudiant.png',
        alt: 'Portail Étudiant',
        description: 'Interface principale du portail étudiant'
    }
];

// Configuration des images pour le projet NAFAR
const nafarImages = [
    {
        src: 'images/projects/nafar/nafarHome.png',
        alt: 'Accueil Nafar',
        description: 'Page d\'accueil de la plateforme de révision'
    },
    {
        src: 'images/projects/nafar/listeVideo.png',
        alt: 'Organisation Vidéo',
        description: 'Organisation structurée des vidéos YouTube pour un parcours d\'apprentissage cohérent'
    },
    {
        src: 'images/projects/nafar/visionnageVideoAvecResume.png',
        alt: 'Visionnage intelligent',
        description: 'Lecteur vidéo intégrant des résumés générés par IA pour une compréhension rapide'
    },
    {
        src: 'images/projects/nafar/priseNoteIntelligent.png',
        alt: 'Prise de notes',
        description: 'Système de prise de notes synchronisé avec les timestamps des vidéos'
    },
    {
        src: 'images/projects/nafar/chatbot.png',
        alt: 'Assistant IA',
        description: 'Dialoguez avec l\'assistant Claude pour obtenir des explications et approfondir les sujets'
    },
    {
        src: 'images/projects/nafar/pomodoroEtSuivieProductivité.png',
        alt: 'Productivité',
        description: 'Mode Focus avec timer Pomodoro et statistiques de progression'
    }
];

// Configuration des images pour le projet NeoScan
const neoscanImages = [
    {
        src: 'images/projects/neoscan/homeNeoScan.jpg',
        alt: 'Accueil NeoScan',
        description: 'Plateforme de diagnostic assistée par IA pour la détection du cancer'
    },
    {
        src: 'images/projects/neoscan/selectionRadioaAnalyser.jpg',
        alt: 'Interface d\'analyse',
        description: 'Interface intuitive pour l\'import et l\'analyse des images médicales'
    },
    {
        src: 'images/projects/neoscan/ResultatAnalyse.jpg',
        alt: 'Résultats de Diagnostic',
        description: 'Affichage détaillé des résultats avec probabilités et zones détectées'
    },
    {
        src: 'images/projects/neoscan/chatBotMariama.jpg',
        alt: 'Mariama - Assistant IA',
        description: 'Chatbot intelligent "Mariama" pour accompagner les patients'
    },
    {
        src: 'images/projects/neoscan/discutionAvecMariama.jpg',
        alt: 'Discussion Chatbot',
        description: 'Interaction fluide avec l\'assistant pour obtenir des informations médicales'
    }
];

// Configuration des images pour le projet Prédiction Énergétique
const energyImages = [
    {
        src: 'images/projects/energy/energyHome.png',
        alt: 'Vue d\'ensemble',
        description: 'Comparaison des données réelles vs prédictions de consommation et visualisation des métriques'
    },
    {
        src: 'images/projects/energy/uploadData.png',
        alt: 'Import des données',
        description: 'Interface d\'importation des données historiques de consommation'
    },
    {
        src: 'images/projects/energy/uploadDataWithConsommationType.png',
        alt: 'Configuration',
        description: 'Sélection du type de consommation et paramétrage des modèles de prédiction'
    }
];

let currentImageIndex = 0;
let currentImages = [];

// Fonction pour fermer le modal
function closeModalFunction() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    currentImages = [];
    currentImageIndex = 0;
}

// Fonction pour ouvrir le modal
function openModal(projectCard) {
    const img = projectCard.querySelector('img');
    const projectTitle = projectCard.querySelector('h3').textContent;
    const description = projectCard.querySelector('.project-details p').textContent;
    const techStack = projectCard.querySelector('.tech-stack').innerHTML;

    // Déterminer quel projet est ouvert
    if (img.src.includes('jaapalante')) {
        currentImages = jaapalanteImages;
        currentImageIndex = 0;
    } else if (img.src.includes('saat')) {
        currentImages = saatImages;
        currentImageIndex = 0;
    } else if (img.src.includes('turboSearch')) {
        currentImages = turboSearchImages;
        currentImageIndex = 0;
    } else if (img.src.includes('tictactoe')) {
        currentImages = tictactoeImages;
        currentImageIndex = 0;
    } else if (img.src.includes('inscription')) {
        currentImages = inscriptionImages;
        currentImageIndex = 0;
    } else if (img.src.includes('nafar')) {
        currentImages = nafarImages;
        currentImageIndex = 0;
    } else if (img.src.includes('neoscan')) {
        currentImages = neoscanImages;
        currentImageIndex = 0;
    } else if (img.src.includes('energy')) {
        currentImages = energyImages;
        currentImageIndex = 0;
    } else {
        currentImages = [];
    }

    // Afficher/masquer les contrôles de navigation
    const hasMultipleImages = currentImages.length > 0;
    document.querySelector('.modal-navigation').style.display = hasMultipleImages ? 'flex' : 'none';
    document.querySelector('.modal-pagination').style.display = hasMultipleImages ? 'block' : 'none';

    if (hasMultipleImages) {
        updateModalImage();
    } else {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalDescription.textContent = description;
    }

    modalTitle.textContent = projectTitle;
    modalTechStack.innerHTML = techStack;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    updatePagination();
}

// Fonction pour mettre à jour la pagination
function updatePagination() {
    if (currentImages.length > 0) {
        const paginationElement = document.querySelector('.modal-pagination');
        paginationElement.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
    }
}

// Fonction pour naviguer dans les images
function navigateImages(direction) {
    if (currentImages.length === 0) return;

    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    } else {
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    }

    updateModalImage();
    updatePagination();
}

// Mettre à jour l'image du modal
function updateModalImage() {
    if (currentImages.length > 0) {
        const image = currentImages[currentImageIndex];
        modalImg.src = image.src;
        modalImg.alt = image.alt;
        modalDescription.textContent = image.description;
    }
}

// Event listeners
document.querySelectorAll('.project-image').forEach(image => {
    image.addEventListener('click', () => openModal(image.closest('.project-card')));
});

closeModal.addEventListener('click', closeModalFunction);

// Ajouter les event listeners pour la navigation
document.querySelector('.prev-btn').addEventListener('click', () => navigateImages('prev'));
document.querySelector('.next-btn').addEventListener('click', () => navigateImages('next'));

// Fermer le modal en cliquant en dehors de l'image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunction();
    }
});

// Ajouter la navigation au clavier
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('show')) {
        if (e.key === 'ArrowLeft') {
            navigateImages('prev');
        } else if (e.key === 'ArrowRight') {
            navigateImages('next');
        } else if (e.key === 'Escape') {
            closeModalFunction();
        }
    }
}); 
