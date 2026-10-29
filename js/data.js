// ============================================================
//  CONTENU DU SITE : modifie ce fichier pour changer les textes,
//  ajouter un projet ou remplacer une image.
//  Un champ marqué "todo" s'affiche comme emplacement à compléter.
//  Les images sont dans assets/img/ ; les modèles 3D (STEP) dans assets/3d/.
//  fit: "contain" = image affichée en entier (schémas, captures d'écran).
// ============================================================

const IMG = (f) => `assets/img/${f}`;

const projects = {
  // ---------------- BAC PRO ----------------
  "bac-stage": {
    title: "Stage de maintenance d’avions légers",
    kicker: "Bac Pro Aéronautique · Stage de 10 semaines · 2020–2021",
    lead: "Dix semaines en atelier à l’Aéroclub Air France, sur l’aérodrome de Toussus-le-Noble, à travailler sur des avions légers.",
    cover: IMG("bac-moteur.jpg"),
    gallery: [IMG("bac-moteur.jpg"), IMG("bac-avion.jpg"), IMG("bac-relais.jpg")],
    facts: [
      ["Lieu", "Aéroclub Air France · aérodrome de Toussus-le-Noble"],
      ["Durée", "10 semaines"],
      ["Appareils", "Avions légers de type AT-3, Cessna 150 et TB 20"],
      ["Interventions documentées", "Visite des 50 h sur moteur, intervention sur le relais batterie, photos et rapport de stage."],
      ["Ce que j’en retiens", "Un stage très formateur : il m’a appris la rigueur, l’autonomie et le travail soigné."],
    ],
  },

  // ---------------- BTS CPI ----------------
  "bts-poste": {
    title: "Poste d’embouteillage de pots de peinture",
    kicker: "BTS CPI · Projet de fin d’études (U51)",
    lead: "Conception d’une ligne automatisée de remplissage et de conditionnement de pots de peinture, en équipe de 4. J’ai conçu la bouchonneuse et l’étiqueteuse.",
    cover: IMG("bts-poste.jpg"),
    gallery: [IMG("bts-poste.jpg"), IMG("bts-etiqueteuse-cover.jpg")],
    models: [
      { src: "assets/3d/bouchonneuse.stp", label: "Bouchonneuse en 3D" },
      { src: "assets/3d/etiqueteuse.stp", label: "Étiqueteuse en 3D" },
    ],
    anims: [
      { src: IMG("bouchonnage.gif"), label: "Bouchonnage" },
      { src: IMG("etiquetage1.gif"), label: "Étiquetage" },
    ],
    facts: [
      ["Mon rôle", "Conception complète de la bouchonneuse et de l’étiqueteuse (modélisation, mise en plan, choix des composants), puis animation du fonctionnement."],
      ["Outils", "CATIA V5 · mises en plan et nomenclatures · composants FESTO (vérins)"],
      ["Contraintes", "Cadence de 1 000 pièces / heure · environnement ATEX zone 2"],
    ],
  },
  "streetcarver": {
    title: "Street Carver : support et moule de fonderie",
    kicker: "BTS CPI · Projet collaboratif (U62) · 2023",
    lead: "Industrialiser le support aluminium d’un skateboard-snowboard : concevoir le moule de fonderie qui permet d’obtenir son brut en série.",
    cover: IMG("streetcarver-moule.jpg"),
    gallery: [IMG("streetcarver-moule.jpg"), IMG("streetcarver-effort.jpg"), IMG("streetcarver-skate.jpg")],
    facts: [
      ["Le sujet", "Le support relie la planche, les bras oscillants et les biellettes. Il doit être produit en série à partir d’un brut moulé."],
      ["Mon rôle", "Travail en binôme avec un étudiant CPRP : il a pris en charge la fabrication (simulation du parcours d’outil, gamme d’outillage…) et moi la conception : empreinte du moule, mise en plan, cotation fonctionnelle."],
      ["Résultat", "Un moule de fonderie respectant les règles de conception de fonderie : noyaux en sable, dépouilles, épaisseur constante, masselotte."],
      ["Outils", "CATIA V5 · analyse d’efforts"],
    ],
  },
  "safran": {
    title: "Stage au bureau d’études Safran",
    kicker: "BTS CPI · Stage de 10 semaines · 2022",
    lead: "Première expérience en bureau d’études dans l’aéronautique, à Villaroche (77).",
    cover: null,
    coverLabel: "Photo ou capture CATIA à ajouter (hors confidentiel)",
    gallery: [],
    facts: [
      ["Mes missions", "Conception de raccords de pompe-moteur sous CATIA V5, chaîne de cotes complexe et cotation GPS, présentation de l’étude en réunion."],
      ["Outils", "CATIA V5 · cotation GPS · chaînes de cotes"],
    ],
  },

  // ---------------- CYCLE INGÉNIEUR ----------------
  "lightspeed": {
    title: "Lightspeed : vélo concept en contreplaqué",
    kicker: "Cycle ingénieur · Projet créativité · 2024",
    lead: "Un projet mené de la créativité à la conception, puis à la fabrication : un vélo de concept inspiré de l’univers de Tron Legacy, en contreplaqué.",
    cover: IMG("lightspeed-affiche.jpg"),
    gallery: [IMG("lightspeed-affiche.jpg"), IMG("lightspeed-fab-1.jpg"), IMG("lightspeed-3d-1.jpg"), IMG("lightspeed-3d-2.jpg")],
    model: { src: "assets/3d/lightspeed-velo.stp", label: "Voir le vélo en 3D" },
    facts: [
      ["Équipe", "3 étudiants · présentation finale le 19 décembre 2024"],
      ["Conception", "Modélisation sous CATIA avec un squelette paramétré, pour adapter le vélo à toutes les morphologies."],
      ["Fabrication", "Découpe en Stratoconception au CIRTES."],
      ["Outils", "CATIA V5 (squelette paramétré) · Stratoconception"],
    ],
  },
  "dinoraft": {
    title: "Éco-conception d’un radeau d’attraction",
    kicker: "Cycle ingénieur · Éco-conception · Analyse de cycle de vie",
    lead: "Réduire l’impact environnemental d’un radeau de parc d’attractions en repensant les matériaux, la fabrication et le transport.",
    cover: IMG("eco-askor-saisie.jpg"),
    fit: "contain",
    gallery: [IMG("eco-askor-saisie.jpg"), IMG("eco-askor-resultats.jpg"), IMG("eco-askor-iteration2.jpg")],
    facts: [
      ["Résultat", "De 1 600 kg à 400 kg CO₂ eq : −75 % grâce à la reconception puis à l’optimisation des procédés."],
      ["Méthode", "Modélisation de l’analyse de cycle de vie, analyse critique des composants et des sites de production, recherche de solutions, puis deux itérations de reconception."],
      ["Outils", "ASKOR (ACV) · Granta EduPack"],
    ],
  },
  "glaneuse": {
    title: "La Glaneuse : triporteur cargo modulaire",
    kicker: "Cycle ingénieur · Gestion de projet",
    lead: "Un triporteur cargo conçu autour d’une caisse modulable, pensé pour les professionnels et les acteurs locaux de Saint-Dié-des-Vosges.",
    cover: IMG("glaneuse.jpg"),
    gallery: [IMG("glaneuse.jpg"), IMG("glaneuse-concept.jpg")],
    facts: [
      ["Équipe", "8 étudiants"],
      ["Mon rôle", "Le chiffrage du projet, grâce aux compétences acquises en entreprise chez VIP Industries."],
      ["Le projet", "Caisse reconfigurable (transport de colis, de charges utilitaires, usage événementiel ou communication mobile)."],
      ["Chiffres", "229 k€ d’investissement · rentabilité atteinte en 2 ans · lancement prévu à l’été 2027"],
    ],
  },
  "analyse-valeur": {
    title: "Robot lanceur-ramasseur de balles de tennis",
    kicker: "Cycle ingénieur · Analyse de la valeur · 2025–2026",
    lead: "Analyse du besoin et du cycle de vie d’un robot autonome qui ramasse et relance les balles sur un court de tennis.",
    cover: IMG("av-apte.jpg"),
    fit: "contain",
    gallery: [IMG("av-apte.jpg"), IMG("av-bete-a-cornes.jpg"), IMG("av-apte-fabrication.jpg"), IMG("av-tri-croise.jpg")],
    facts: [
      ["Équipe", "7 étudiants · module CP111"],
      ["Mon travail", "Analyse du besoin (bête à cornes) et du cycle de vie (méthode APTE), identification et validation d’une trentaine de fonctions de service, hiérarchisation par tri croisé, cahier des charges fonctionnel (critères, niveaux, flexibilité)."],
      ["Livrable", "Cahier des charges fonctionnel complet"],
    ],
  },
  "holofest": {
    title: "HoloFest : festival de concerts en hologrammes",
    kicker: "Cycle ingénieur · Marketing et chiffrage",
    lead: "Étude marketing, modèle économique et planning sur trois ans d’un festival où les artistes montent sur scène en hologramme.",
    cover: IMG("holofest-bmc.jpg"),
    fit: "contain",
    gallery: [IMG("holofest-bmc.jpg"), IMG("holofest-planning.jpg")],
    facts: [
      ["Équipe", "3 étudiants : nous avons travaillé à trois sur chaque partie du projet."],
      ["Le projet", "Business Model Canvas, analyse du marché, planning prévisionnel sur trois ans (2025–2028) et chiffrage."],
    ],
  },
  "optitopo": {
    title: "Optimisation topologique d’un deck de trottinette",
    kicker: "Cycle ingénieur · CP301 · 2026",
    lead: "Alléger un deck de trottinette en laissant le calcul décider où la matière est vraiment utile, sous des cas de charge d’utilisation réels.",
    cover: null,
    coverLabel: "Capture HyperWorks de la pièce optimisée à ajouter",
    gallery: [],
    facts: [
      ["Équipe", "Binôme avec Théo Laurent"],
      ["Méthode", "Définition des cas d’utilisation, de la charge verticale, des conditions limites et de l’objectif, puis optimisation topologique et reconstruction de la pièce."],
      ["Outils", "HyperMesh · OptiStruct (HyperWorks) · CATIA V5"],
      ["Résultat", "Gain de masse, contraintes, comparaison avant / après.", "todo"],
    ],
  },
  // Projet en cours : à réactiver dans la liste des projets de l'étape "ingenieur" quand il sera terminé.
  "moule": {
    title: "Conception d’un moule d’injection plastique",
    kicker: "Cycle ingénieur · 2026–2027 · en cours",
    lead: "Reconcevoir une pièce scannée en 3D, puis concevoir son moule d’injection de bout en bout.",
    cover: null,
    coverLabel: "Rendu CATIA ou simulation Cadmould à ajouter",
    gallery: [],
    facts: [
      ["Équipe", "Duo avec un collègue de promotion"],
      ["Étapes", "Pièce scannée en 3D (maillage), optimisation topologique, cahier des charges, choix des matériaux, simulation d’injection."],
      ["Outils", "CATIA V5 · HyperWorks · Cadmould"],
    ],
  },

  // ---------------- ALTERNANCE ----------------
  "vip": {
    title: "Apprenti ingénieur au bureau d’études, VIP Industries",
    kicker: "Alternance · 2024–2027 · Fraize (88)",
    lead: "Pilotage de projets de moules d’injection plastique, de la consultation du client à la mise en production.",
    cover: IMG("vip-presse.jpg"),
    fit: "contain",
    gallery: [IMG("vip-presse.jpg")],
    facts: [
      ["Missions", "Piloter les projets de moules d’injection, établir chiffrages et plannings (Gantt), consulter les fournisseurs, suivre jalons et coûts, intégrer les contraintes DFM, packaging et tampographie."],
      ["Outils", "CATIA V5 · SolidWorks · Excel VBA · injection plastique"],
      ["Confidentialité", "Contenu à valider avec VIP Industries avant publication.", "todo"],
    ],
  },
  "mp2": {
    title: "MP2 : base Excel d’aide au chiffrage",
    kicker: "Alternance · Projet en entreprise · 2026–2027",
    lead: "Accélérer le chiffrage en automatisant l’affectation machine et l’estimation du temps de cycle.",
    cover: IMG("mp2-interface.jpg"),
    fit: "contain",
    gallery: [IMG("mp2-interface.jpg")],
    facts: [
      ["Ce que j’ai construit", "Une base de données Excel qui automatise l’affectation machine et centralise l’estimation du temps de cycle. Capture : la page d’interface utilisateur, où l’on saisit la pièce, la matière et le moule."],
      ["Outils", "Excel · VBA"],
      ["Résultat", "Temps de chiffrage gagné, nombre de devis concernés.", "todo"],
    ],
  },
};

// Projets à la une dans le bandeau d'accueil (dans l'ordre d'affichage)
const featured = [
  { id: "lightspeed", tag: "Vélo concept", sub: "De la créativité à la fabrication, conçu sur CATIA" },
  { id: "bts-poste", tag: "Ligne automatisée", sub: "Bouchonneuse et étiqueteuse, 1 000 pièces/h" },
  { id: "glaneuse", tag: "Gestion de projet", sub: "Triporteur cargo, lancement 2027" },
  // Cartes qui renvoient vers la section « Hors école »
  { perso: "bde", tag: "Engagement", title: "Président du BDE", sub: "Gala, week-end d’intégration, budgets de plusieurs dizaines de k€", cover: IMG("gala-discours.jpg") },
  { perso: "trail", tag: "Endurance", title: "Ultra-trail", sub: "113 km, 6 500 m de D+ · objectif UTMB 2028", cover: IMG("trail-finisher.jpg") },
  // dinoraft et holofest : retirés du bandeau (toujours dans le parcours)
  // { id: "optitopo", tag: "Simulation", sub: "Optimisation topologique d’un deck" },  // à réactiver avec la capture de la pièce optimisée
];

const stages = [
  {
    id: "bac",
    period: "2019 — 2021",
    title: "Bac Pro Aéronautique",
    place: "Lycée Alexandre Denis · Cerny",
    blurb: "Maintenance d’avions légers, mention Bien. C’est là que j’ai pris le goût de la mécanique concrète et du travail soigné.",
    projects: ["bac-stage"],
  },
  {
    id: "bts",
    period: "2021 — 2023",
    title: "BTS Conception de Produits Industriels",
    place: "Lycée Robert Doisneau · Corbeil-Essonnes",
    blurb: "Major de promotion, 2ᵉ de l’académie en conception. En parallèle des études : CDI de préparateur de commandes (22 mois) et stage au bureau d’études Safran.",
    projects: ["bts-poste", "streetcarver", "safran"],
  },
  {
    id: "ats",
    period: "2023 — 2024",
    title: "CPGE ATS",
    place: "Lycée Robert Doisneau · Corbeil-Essonnes",
    blurb: "Classe préparatoire aux grandes écoles pour techniciens supérieurs : mathématiques, physique et sciences de l’ingénieur pour viser l’école d’ingénieurs.",
    projects: [],
  },
  {
    id: "ingenieur",
    period: "2024 — 2027",
    title: "Cycle ingénieur · Conception mécanique",
    place: "Mines Nancy – InSIC · Saint-Dié-des-Vosges",
    blurb: "École d’ingénieurs par apprentissage. Des projets d’équipe qui vont de la créativité à l’éco-conception, de la simulation au pilotage de projet.",
    projects: ["lightspeed", "dinoraft", "glaneuse", "analyse-valeur", "holofest", "optitopo"],
  },
  {
    id: "alternance",
    period: "2024 — 2027",
    title: "Alternance · Bureau d’études",
    place: "VIP Industries · Fraize (88)",
    blurb: "Trois ans en bureau d’études dans la plasturgie : des projets de moules d’injection pilotés de la consultation à la mise en production.",
    projects: ["vip", "mp2"],
  },
];

const perso = [
  {
    id: "bde",
    title: "Président du BDE INDYGO",
    kicker: "Vie associative",
    text: "J’organise avec mon équipe les événements qui font vivre le campus de l’InSIC : repas de Noël, week-end d’intégration, 24 h de Stan à Nancy et Gala de remise des diplômes de la promo 2026. Budget, logistique, partenariats et délais le jour J.",
    stats: [["72", "participants au WEI"], ["≈ 25 000 €", "budget du plus gros événement"], ["≈ 40 000 €", "d’événements sur 3 ans"]],
    tall: true,
    media: [
      { type: "img", src: IMG("wei.jpg"), alt: "Photo de groupe du week-end d’intégration" },
      { type: "img", src: IMG("gala-discours.jpg"), alt: "Mon discours au gala" },
      { type: "img", src: IMG("gala-scene.jpg"), alt: "Sur scène lors du gala" },
      { type: "img", src: IMG("gala-ambiance.jpg"), alt: "Ambiance de la soirée de gala" },
    ],
  },
  {
    id: "trail",
    title: "Ultra-trail : Wild 110 by UTMB",
    kicker: "Sport d’endurance",
    text: "Mon premier ultra, le 11 septembre 2026 : 113 km et 6 500 m de dénivelé positif en Suisse, avec un départ de nuit. Préparé pendant plus de quatre mois : environ 150 h d’entraînement, 750 km de course et 1 200 km de vélo. Prochain objectif : l’UTMB 2028.",
    stats: [["113,7 km", "Wildstrubel by UTMB"], ["6 493 m", "de dénivelé positif"], ["≈ 150 h", "de préparation"]],
    tall: true,
    media: [
      { type: "img", src: IMG("trail-finisher.jpg"), alt: "Finisher de la Wild 110 à Crans-Montana" },
      { type: "video", src: "assets/video/trail-arrivee.mp4", poster: "assets/video/trail-arrivee.jpg", alt: "Arrivée sous l’arche à Crans-Montana" },
      { type: "video", src: "assets/video/trail-aube.mp4", poster: "assets/video/trail-aube.jpg", alt: "Lever du jour en montagne" },
    ],
  },
  {
    id: "velo",
    title: "Vélo et trekking",
    kicker: "Dehors",
    text: "Routes des Vosges et d’Alsace à vélo, avec le Cap Nord comme projet. Tour du Mont-Blanc en 2025, et la Grande Traversée des Alpes en ligne de mire.",
    stats: [],
    tall: true,
    media: [
      { type: "img", src: IMG("trek-tente-ciel.jpg"), alt: "Bivouac en montagne, tente face aux sommets" },
      { type: "img", src: IMG("velo-lac-blanc.jpg"), alt: "Sortie à vélo de route devant un lac de montagne" },
      { type: "img", src: IMG("trek-tente-soir.jpg"), alt: "Bivouac au soir, lumière sur la vallée" },
      { type: "img", src: IMG("velo-bmc-lac.jpg"), alt: "Pause à vélo au-dessus d’un lac turquoise" },
    ],
  },
  {
    id: "voyages",
    title: "Voyages",
    kicker: "Ailleurs",
    text: "Huit pays visités, dont les États-Unis, l’Angleterre et la Tchéquie. Anglais niveau B2, IELTS prévu en janvier 2027.",
    stats: [["8", "pays"]],
    img: IMG("voyage-prague.jpg"),
    imgAlt: "En voyage à Prague, devant un tramway",
  },
];

window.SITE = { projects, featured, stages, perso };
