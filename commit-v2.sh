#!/bin/bash
# Script Git pour commit FootTracker v2

echo "🎨 FootTracker v2 - Commit des améliorations UI/UX"
echo "=================================================="
echo ""

# Vérifier le statut
echo "📋 Statut actuel :"
git status --short
echo ""

# Ajouter tous les fichiers
echo "➕ Ajout des fichiers..."
git add -A
echo "✅ Fichiers ajoutés"
echo ""

# Commit avec message détaillé
echo "💾 Création du commit..."
git commit -m "feat(ui): carousel infini parfait + UX améliorée v2

Modifications majeures :
- Carousel infini sans coupure visible (technique onRepeat)
- Cartes joueurs hauteur fixe (420px) pour uniformité
- KPI/Features cards lisibles (suppression backdrop-filter flou)
- 2 nouvelles sections page accueil (Performance + IA)
- Animations scroll GSAP complètement documentées
- Design system v2 épuré (noir pur #000)
- Parallax effects sur éléments visuels

Fichiers créés :
- css/design-system-v2.css (22KB - corrections flou/hauteurs)
- js/equipe-infinite.js (carousel seamless documenté)
- js/animations-v2.js (7 sections animations GSAP)
- index-v2.html (2 sections + animations data-attr)
- equipe-v2.html (template optimisé)
- js/membre-detail-new.js (compat design-system-v2)
- js/ScrollTrigger.min.js (mock développement)
- DOCUMENTATION-V2.md (guide complet technique)

Technique carousel :
- Duplication x3 des cartes (seamless loop)
- gsap.to avec onRepeat (reset imperceptible)
- Pause hover avec timeScale smooth
- Vitesse 50px/s ajustable

Animations :
- data-scroll-animation (fade-up, fade-in, fade-scale, slides)
- data-scroll-parallax (effets profondeur)
- Hover micro-interactions documentées
- Mobile nav avec burger animé

Sanity intact :
- Aucune modification logique fetch
- IDs préservés (photo-profil, nom, stat-*, gallery)
- PROJECT_ID k7909trb inchangé

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

echo "✅ Commit créé"
echo ""

# Push
echo "🚀 Push vers origin..."
git push origin HEAD

echo ""
echo "✨ Terminé ! Modifications en ligne."
