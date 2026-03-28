# 🧪 GUIDE DE TEST - FootTracker v2

## 📋 Checklist Complète

### 1️⃣ CAROUSEL INFINI (Priorité Maximale)

#### Desktop
- [ ] Ouvrir `SITE/equipe-v2.html` dans le navigateur
- [ ] Observer le carousel pendant 30 secondes
- [ ] ✅ CRITÈRE : Aucune coupure visible au reset
- [ ] Passer la souris sur une carte
- [ ] ✅ CRITÈRE : Le carousel se met en pause smoothement
- [ ] Retirer la souris
- [ ] ✅ CRITÈRE : Le carousel reprend en douceur
- [ ] Observer les cartes
- [ ] ✅ CRITÈRE : Toutes ont exactement la même hauteur

#### Mobile/Tablet
- [ ] Ouvrir `equipe-v2.html` sur mobile
- [ ] Toucher une carte avec le doigt
- [ ] ✅ CRITÈRE : Le carousel se met en pause
- [ ] Relâcher
- [ ] ✅ CRITÈRE : Le carousel reprend

#### Console Debug
- [ ] Ouvrir F12 → Console
- [ ] Vérifier les logs :
  ```
  ✅ GSAP chargé - Animations activées
  ✅ ScrollTrigger enregistré
  🎨 Animations FootTracker initialisées
  ```
- [ ] ✅ CRITÈRE : Aucune erreur rouge

---

### 2️⃣ PAGE ACCUEIL

#### Sections Visuelles
- [ ] Ouvrir `SITE/index-v2.html`
- [ ] Vérifier le hero avec badge "EN DIRECT" qui pulse
- [ ] Scroller doucement vers le bas
- [ ] ✅ CRITÈRE : Les KPI cards sont **lisibles** (pas de flou)
- [ ] Continuer à scroller
- [ ] ✅ CRITÈRE : Les sections apparaissent avec animations au défilement
- [ ] Observer les éléments avec data-scroll-parallax
- [ ] ✅ CRITÈRE : Ils bougent plus lentement que le scroll (effet profondeur)

#### Responsive
- [ ] Réduire la largeur de la fenêtre (< 768px)
- [ ] ✅ CRITÈRE : La grille KPI passe en 2 colonnes
- [ ] Réduire encore (< 576px)
- [ ] ✅ CRITÈRE : La grille KPI passe en 1 colonne
- [ ] Cliquer sur le burger menu (3 barres)
- [ ] ✅ CRITÈRE : Le menu s'ouvre depuis la droite
- [ ] ✅ CRITÈRE : Les barres se transforment en X

---

### 3️⃣ ANIMATIONS GSAP

#### Scroll-Triggered
- [ ] Ouvrir `index-v2.html`
- [ ] Scroller jusqu'aux features
- [ ] ✅ CRITÈRE : Les 3 cartes apparaissent une par une (stagger)
- [ ] Scroller jusqu'à "Performance Individuelle"
- [ ] ✅ CRITÈRE : La section fait un fade-in
- [ ] Continuer jusqu'à "Intelligence Artificielle"
- [ ] ✅ CRITÈRE : Idem, fade-in smooth

#### Hover Effects
- [ ] Passer la souris sur un bouton "Voir l'Équipe"
- [ ] ✅ CRITÈRE : Le bouton grossit légèrement avec élasticité
- [ ] Passer la souris sur une KPI card
- [ ] ✅ CRITÈRE : La carte monte de quelques pixels
- [ ] Passer la souris sur une feature card
- [ ] ✅ CRITÈRE : Border devient verte + glow néon

---

### 4️⃣ DONNÉES SANITY

#### Chargement
- [ ] Ouvrir `equipe-v2.html`
- [ ] Attendre le chargement (max 2-3 secondes)
- [ ] ✅ CRITÈRE : Les cartes joueurs s'affichent avec photos
- [ ] ✅ CRITÈRE : Les noms sont visibles
- [ ] ✅ CRITÈRE : Le nombre d'avis est affiché

#### Navigation
- [ ] Cliquer sur une carte joueur
- [ ] ✅ CRITÈRE : Redirection vers `membre-detail.html?slug=...`
- [ ] Sur la page détail :
  - [ ] ✅ Photo profil ronde (300x300)
  - [ ] ✅ Nom en énorme typographie
  - [ ] ✅ 4 stats (âge, taille, poids, pointure)
  - [ ] ✅ Galerie Bento (images asymétriques)
  - [ ] ✅ Commentaires en bas

---

### 5️⃣ PERFORMANCE

#### Temps de Chargement
- [ ] Ouvrir F12 → Network
- [ ] Rafraîchir `index-v2.html`
- [ ] ✅ CRITÈRE : Page chargée en < 2 secondes
- [ ] Vérifier la taille :
  - [ ] design-system-v2.css : ~22KB
  - [ ] animations-v2.js : ~10KB
  - [ ] equipe-infinite.js : ~6.5KB

#### Console
- [ ] F12 → Console
- [ ] ✅ CRITÈRE : Aucune erreur 404
- [ ] ✅ CRITÈRE : Pas d'avertissement CORS
- [ ] ✅ CRITÈRE : Images Sanity chargées (200 OK)

---

### 6️⃣ MOBILE (CRITIQUE)

#### Tactile
- [ ] Ouvrir sur smartphone (ou DevTools mobile)
- [ ] ✅ CRITÈRE : Menu burger visible
- [ ] Taper sur le burger
- [ ] ✅ CRITÈRE : Menu s'ouvre smooth
- [ ] Scroller la page
- [ ] ✅ CRITÈRE : Animations se déclenchent
- [ ] Aller sur `equipe-v2.html`
- [ ] Toucher le carousel
- [ ] ✅ CRITÈRE : Pause au touch
- [ ] Taper sur une carte
- [ ] ✅ CRITÈRE : Navigation vers détail fonctionne

---

### 7️⃣ CROSS-BROWSER

#### Chrome/Edge
- [ ] Tester sur Chrome
- [ ] ✅ CRITÈRE : Tout fonctionne

#### Firefox
- [ ] Tester sur Firefox
- [ ] ✅ CRITÈRE : Animations GSAP OK
- [ ] ✅ CRITÈRE : Carousel smooth

#### Safari (si dispo)
- [ ] Tester sur Safari
- [ ] ✅ CRITÈRE : backdrop-filter fonctionne (navbar)
- [ ] ✅ CRITÈRE : Gradient text visible (hero title)

---

## 🐛 Résolution de Problèmes

### Carousel se coupe encore
**Cause probable :** Gap CSS incorrect
**Solution :**
1. Ouvrir `equipe-infinite.js`
2. Ligne 126 : Vérifier `const gap = 24;`
3. Comparer avec `design-system-v2.css` ligne 883 → `gap: var(--space-6);` (doit être 24px)

### KPI cards floues
**Cause probable :** Mauvais fichier CSS chargé
**Solution :**
1. Vérifier `index-v2.html` ligne 6
2. Doit charger : `css/design-system-v2.css` (pas design-system.css)

### Animations scroll ne marchent pas
**Cause probable :** ScrollTrigger non chargé
**Solution :**
1. Vérifier `index-v2.html` ligne 145-146
2. Doit avoir :
   ```html
   <script src="js/gsap.min.js"></script>
   <script src="js/ScrollTrigger.min.js"></script>
   ```

### Cartes joueurs hauteurs différentes
**Cause probable :** Mauvais fichier CSS
**Solution :**
1. Utiliser `design-system-v2.css`
2. Vérifier ligne 872 : `.player-card { height: 420px; }`

### Erreur Sanity 404
**Cause probable :** sanity.js incorrect
**Solution :**
1. Vérifier `js/sanity.js` ligne 1-3
2. PROJECT_ID doit être : `k7909trb`
3. DATASET doit être : `infinite-scroll-dataset-1`

---

## ✅ Validation Finale

Une fois tous les tests passés :

```bash
# Consulter GIT-COMMANDS.txt pour commit
# Ou exécuter :
git add -A && git commit -m "feat(ui): carousel infini parfait + UX v2" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>" && git push origin HEAD
```

---

## 📊 Comparaison Visuelle Attendue

### Avant (v1)
- Carousel : Coupure visible au reset
- Cartes : Hauteurs variables
- KPI : Texte flou
- Sections : 3 basiques
- Animations : Simples

### Après (v2)
- Carousel : Loop seamless parfait ✨
- Cartes : 420px uniformes ✨
- KPI : Texte net et clair ✨
- Sections : 5 avec contenu riche ✨
- Animations : 5 types + parallax ✨

---

## 🎓 Pour Aller Plus Loin

### Customisations Faciles

**Ralentir le carousel :**
```javascript
// equipe-infinite.js ligne 129
const speed = 30; // Au lieu de 50
```

**Changer la couleur néon :**
```css
/* design-system-v2.css ligne 24 */
--neon-green: #00ffcc; /* Au lieu de #00ff7f */
```

**Ajouter une animation :**
```html
<!-- Dans index-v2.html -->
<div data-scroll-animation="fade-up" data-scroll-delay="300">
  Nouveau contenu avec animation
</div>
```

---

✨ **Tout devrait être fluide, pro et moderne !**
🎨 Si un test échoue, consulte DOCUMENTATION-V2.md
💬 Les logs console te guident en cas de souci
