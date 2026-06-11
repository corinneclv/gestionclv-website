# Mon Amie Comptable - Site web de Gestion CLV

Site une page de Corinne Claveau, CPA. La comptabilité, expliquée simplement.

- **Site en ligne** : https://corinneclv.github.io/gestionclv-website/
- **Hébergement** : GitHub Pages (gratuit, inclus avec ce repo)
- **Technologie** : HTML, CSS et JavaScript purs. Aucune installation, aucune base de données, aucun abonnement à payer.

---

## La règle d'or

> **Tout changement poussé sur la branche `main` est automatiquement publié en ligne en 1 à 2 minutes.**

Il n'y a rien d'autre à faire. Pas de bouton « publier », pas de serveur à gérer. Tu modifies un fichier, tu enregistres (commit), et le site se met à jour tout seul. Tu peux suivre la publication dans l'onglet **Actions** du repo (une coche verte = c'est en ligne).

---

## Option 1 : modifier directement sur GitHub.com (le plus simple)

Idéal pour changer un texte, un prix, une question de FAQ.

1. Va sur https://github.com/corinneclv/gestionclv-website
2. Clique sur le fichier à modifier (presque tout le contenu est dans `index.html`)
3. Clique sur le **crayon** (Edit) en haut à droite du fichier
4. Fais ta modification
5. Clique sur **Commit changes**, écris une courte description (ex. « Met à jour le prix de l'accompagnement »), confirme
6. Attends 1 à 2 minutes, rafraîchis le site : c'est en ligne

**Astuce** : pour trouver un texte dans `index.html`, utilise Ctrl+F (Cmd+F sur Mac) dans l'éditeur GitHub.

## Option 2 : travailler sur ton ordinateur (recommandé pour du vrai développement)

### Installation (une seule fois)

1. **GitHub Desktop** (gratuit) : https://desktop.github.com - connecte-toi avec ton compte `corinneclv`
2. **Visual Studio Code** (gratuit) : https://code.visualstudio.com
3. Dans GitHub Desktop : **File → Clone repository** → choisis `corinneclv/gestionclv-website` → Clone

### Travailler au quotidien

1. Ouvre le dossier du site dans VS Code (depuis GitHub Desktop : **Repository → Open in Visual Studio Code**)
2. Modifie les fichiers
3. **Pour prévisualiser** : double-clique simplement sur `index.html` dans le Finder/Explorateur, il s'ouvre dans ton navigateur. Encore mieux : installe l'extension « Live Server » dans VS Code (clic droit sur index.html → Open with Live Server) pour voir tes changements en direct
4. Quand t'es contente du résultat, retourne dans GitHub Desktop :
   - Écris un résumé du changement en bas à gauche
   - Clique **Commit to main**
   - Clique **Push origin** en haut
5. 1 à 2 minutes plus tard, c'est en ligne

### Option 3 : Claude Code (l'assistant IA)

C'est l'outil avec lequel le site a été développé jusqu'ici. Tu décris en français ce que tu veux (« change la photo du hero », « ajoute une question à la FAQ ») et il fait les modifications, les vérifie et les publie pour toi.

- Installation : https://claude.com/claude-code (application de bureau, connecte-la à ton compte GitHub)
- Ouvre le dossier du site cloné, puis demande ce que tu veux en langage naturel

---

## Structure du projet

| Fichier | Rôle |
|---|---|
| `index.html` | **Tout le contenu du site** : textes, sections, FAQ, services, contact |
| `css/style.css` | Tout le design : couleurs, polices, espacements, responsive |
| `js/main.js` | Les interactions : menu mobile, animations, accordéon FAQ, formulaires |
| `images/` | Les 3 photos du site |
| `404.html` | La page « page introuvable » |
| `sitemap.xml`, `robots.txt` | Référencement Google (à mettre à jour si le domaine change) |
| `.github/workflows/deploy.yml` | La publication automatique (ne pas toucher) |

## Recettes courantes

### Changer un texte
Tout est dans `index.html`. Cherche le texte actuel (Ctrl+F / Cmd+F), remplace-le. Les accents y sont parfois encodés (ex. `&eacute;` = é, `&agrave;` = à, `&rsquo;` = apostrophe) : tu peux écrire les accents normalement dans tes nouveaux textes, les deux fonctionnent.

### Modifier la FAQ
Chaque question est un bloc `<div class="faq__item">` dans `index.html`. Copie-colle un bloc complet pour ajouter une question.
**Important** : la FAQ existe à deux endroits. Mets aussi à jour le bloc `"@type": "FAQPage"` dans le `<head>` (tout en haut du fichier) : c'est la version que Google lit pour le référencement. Les deux doivent dire la même chose.

### Modifier les services ou les prix
Cherche `service-card` dans `index.html`. Chaque carte a un titre, un prix (`service-card__price`) et un texte.

### Changer une photo
1. Prépare ta photo en **format portrait, environ 683 x 1024 pixels**
2. Compresse-la sur https://squoosh.app (vise moins de 200 Ko)
3. Remplace le fichier dans `images/` **en gardant exactement le même nom** (`corinne-hero.jpg`, `corinne-travail-1.jpg` ou `corinne-travail-2.jpg`)

- `corinne-hero.jpg` : grand portrait en haut du site
- `corinne-travail-2.jpg` : photo de la section « À propos »
- `corinne-travail-1.jpg` : photo de fond de la section citation

### Changer les couleurs ou les polices
Tout en haut de `css/style.css`, le bloc `:root` contient la palette complète (forêt, sauge, crème, sable...). Change une valeur hexadécimale là et elle s'applique partout sur le site.

## Les services externes branchés

| Service | Rôle | Où le gérer |
|---|---|---|
| **Formspree** | Reçoit les messages du formulaire de contact ET les inscriptions à l'infolettre, et te les envoie par courriel | https://formspree.io (formulaire `xwvarlwq`). Le plan gratuit accepte 50 soumissions/mois |
| **Calendly** | Le calendrier de prise de rendez-vous intégré dans la section Contact | Ton compte Calendly (`c-claveau-gestionclv/30min`) |
| **Google Fonts** | Les polices Fraunces et Inter | Rien à gérer |

## À faire (état au 11 juin 2026)

1. **Brancher monamiecomptable.ca (domaine principal) et rediriger gestionclv.ca.** Le code (CNAME + URLs canoniques/SEO) est déjà sur `monamiecomptable.ca`. Il reste à inverser le DNS chez GoDaddy, car les 4 enregistrements A de GitHub ont été mis sur gestionclv.ca par erreur. Tout se passe chez GoDaddy + GitHub :
   - **GoDaddy → monamiecomptable.ca → DNS** : enlève la redirection/parking actuelle, puis ajoute 4 enregistrements **A** : `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. Ajoute aussi un CNAME `www` → `corinneclv.github.io`.
   - **GitHub → Settings → Pages → Custom domain** : entre `monamiecomptable.ca`, attends la coche verte (jusqu'à 1 h de propagation), puis coche **Enforce HTTPS**.
   - **GoDaddy → gestionclv.ca → DNS** : supprime les 4 enregistrements **A** qui pointent vers GitHub (`185.199.x.153`), puis crée une **redirection (Forwarding)** du domaine vers `https://monamiecomptable.ca`, type **301 permanent**, mode « Forward only » (pas de masquage).
   - **ATTENTION COURRIEL** : sur gestionclv.ca, ne supprime JAMAIS les enregistrements **MX** ni **TXT**, sinon ton adresse c.claveau@gestionclv.ca arrête de fonctionner. Touche uniquement aux enregistrements **A**.
2. **Créer les 3 ressources téléchargeables.** Les boutons « Télécharger » (guide du travailleur autonome, template budget, checklist fiscale) renvoient pour l'instant vers le formulaire de contact, car les PDF n'existent pas encore.
3. **Valider les témoignages.** Les 3 témoignages actuels sont des exemples fictifs. À remplacer par de vrais témoignages clients (avec leur accord) ou à retirer, en gardant en tête les règles de publicité de l'Ordre des CPA.

## En cas de pépin

- **Le site est cassé après un changement** : sur GitHub, va dans l'historique des commits (`Code` → horloge en haut à droite), ouvre le dernier commit qui fonctionnait, et utilise « Revert » sur le commit fautif. Ou demande à Claude Code de le faire.
- **La publication ne part pas** : onglet **Actions** du repo, regarde si le dernier workflow est en erreur (croix rouge) et relance-le (Re-run jobs).
- **Jamais** de `git push --force` ni de réécriture de l'historique : en cas de doute, on avance avec un nouveau commit qui corrige.
