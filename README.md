# Portfolio Personnel

Un portfolio professionnel et responsive créé en HTML, CSS et JavaScript pur pour mettre en valeur vos compétences et projets.

## 🎯 Caractéristiques

- Design moderne et responsive
- Animations fluides au scroll
- Navigation smooth scroll
- Menu mobile adaptatif
- Formulaire de contact fonctionnel
- Sections organisées et personnalisables
- Aucune dépendance externe

## 🚀 Pour commencer

1. Clonez ce repository
2. Ouvrez `index.html` dans votre navigateur
3. Personnalisez le contenu selon vos besoins

## 📝 Personnalisation

### Modifier le contenu

1. Ouvrez `index.html` et modifiez :
   - Votre nom et titre dans la section "Accueil"
   - Votre présentation dans la section "À propos"
   - Vos projets dans la section "Projets"
   - Vos compétences dans la section "Compétences"

### Modifier le style

1. Les couleurs principales sont définies dans les variables CSS au début du fichier `style.css` :
   ```css
   :root {
       --primary-color: #2563eb;
       --secondary-color: #1e40af;
       --text-color: #1f2937;
       /* ... autres variables ... */
   }
   ```

2. Modifiez ces variables pour changer la palette de couleurs

### Ajouter des projets

1. Dans `index.html`, dupliquez un bloc `.project-card` existant
2. Modifiez le contenu selon votre projet
3. Ajoutez les technologies utilisées dans `.tech-stack`

### Modifier les liens sociaux

1. Dans la section contact, modifiez les liens des réseaux sociaux :
   ```html
   <div class="social-links">
       <a href="votre-lien-github" target="_blank">
           <i class="fab fa-github"></i>
       </a>
       <a href="votre-lien-linkedin" target="_blank">
           <i class="fab fa-linkedin"></i>
       </a>
   </div>
   ```

## 📱 Responsive

Le portfolio est entièrement responsive et s'adapte à tous les écrans :
- Desktop (> 768px)
- Tablette (768px)
- Mobile (< 768px)

## 🛠 Fonctionnalités techniques

- Animations au scroll avec Intersection Observer
- Menu mobile avec animation
- Formulaire de contact avec validation
- Smooth scroll pour la navigation
- Classes CSS réutilisables
- Structure de code modulaire et commentée

## 📝 Personnalisation du formulaire de contact

Pour rendre le formulaire de contact fonctionnel :

1. Ouvrez `script.js`
2. Localisez la section de gestion du formulaire
3. Remplacez la simulation d'envoi par votre logique d'envoi réelle (API, service d'emails, etc.)

## 🎨 Bonnes pratiques

- Code HTML sémantique
- CSS avec BEM (Block Element Modifier)
- JavaScript modulaire
- Performances optimisées
- Accessibilité prise en compte

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser et de le modifier selon vos besoins.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commit vos changements
4. Push sur votre branche
5. Ouvrir une Pull Request 