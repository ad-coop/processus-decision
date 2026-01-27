export interface ProcessDetails {
  steps?: string[]; // Only for individual processes
  advantages: string[];
  suitedFor: string[];
  risks: string[];
  notRecommendedFor: string[];
  keyPoints?: string[];
}

export const PROCESS_DETAILS_MAP: Record<string, ProcessDetails> = {
  // Process Families
  'Votes à choix multiples': {
    advantages: [
      'Maîtrise du temps',
      'Forte intelligence collective',
      'Équité',
      'Met les participants dans une posture constructive',
      'Simple pour les participants',
    ],
    suitedFor: [
      'Décision demandant de la créativité',
      'Trancher les sujets conflictuels',
      'Quand les votants maîtrisent le sujet',
    ],
    risks: [
      'Étape de propositions délicate à faciliter (risque de se perdre dans toutes les possibilités)',
      'Énergivore',
    ],
    notRecommendedFor: [],
    keyPoints: [
      'Nécessite un facilitateur compétent',
      'Les étapes peuvent être réparties sur plusieurs réunions',
      'Le tour de propositions peut être préférable en sous-groupe',
    ],
  },

  'Processus consultatifs': {
    advantages: ['Assez économe en énergie', 'Grande créativité', 'Possible sans être réunis'],
    suitedFor: ["Décision demandant peu d'actions des autres"],
    risks: ['Individualisme et conflits', 'Écarts de pouvoir', 'Décision qui passe outre les avis'],
    notRecommendedFor: ['Les sujets conflictuels'],
    keyPoints: [
      "Requiert un décideur avec une bonne capacité d'écoute et de synthèse et qui ose décider",
      'Demande un bon niveau de confiance dans le groupe et vis à vis du décideur',
      'Savoir identifier si une décision nécessite de consulter et qui consulter',
    ],
  },

  'Processus horizontaux - égalitaires': {
    advantages: [
      'Grande adhésion',
      'Forte intelligence collective',
      'Respect de chacun·e',
      'Nourrit le lien',
    ],
    suitedFor: [
      "S'il y a un objectif commun",
      "S'il y a une posture de coopération de tous les participants",
    ],
    risks: [
      'Inertie, paralysie',
      'Épuisement',
      'Décision « molle »',
      'Pressions sur les individus pour être au niveau',
    ],
    notRecommendedFor: ['Les sujets urgents', 'Quand des avis irréconciliables coexistent'],
  },

  'Mode de décisions libertaires': {
    advantages: [
      'Extrêmement économe en énergie, quasi instantané',
      'Créativité individuelle',
      "Connexion de l'individu à son enthousiasme",
      'Possible sans être réunis',
    ],
    suitedFor: [
      'Décision urgente sans besoin de coordination',
      "Sujet du ressort de l'individu",
      'Enjeux faibles',
    ],
    risks: [
      'Individualisme et conflits',
      'Confusion, chaos',
      "Pas d'intelligence collective",
      'Prise en compte des autres faible ou aléatoire',
    ],
    notRecommendedFor: [],
  },

  'Suivre un signe': {
    advantages: [
      'Souvent rapide',
      'Économe en énergie (intuitif plutôt que mental)',
      'Se sentir guidé ou connecté à source de sagesse supérieure',
    ],
    suitedFor: ['Uniquement aux groupes avec croyances communes', 'Quand le mental est dépassé'],
    risks: [
      'Prise de pouvoir de la personne qui interprète',
      'Déresponsabilisation',
      "Pas ou peu d'intelligence collective",
    ],
    notRecommendedFor: [],
  },

  Hasard: {
    advantages: ['Impartialité totale', 'Possible à distance', 'Très économe en énergie'],
    suitedFor: [
      'Quand les possibilités sont bien identifiées et équivalentes',
      'Quand le mental est dépassé',
      "Pour départager en cas d'égalité",
      'Pour attribuer des rôles avec une excellente représentativité',
    ],
    risks: ['Déresponsabilisation', 'Peu de réflexion', 'Créativité limitée'],
    notRecommendedFor: [],
    keyPoints: ['Le véritable pouvoir est celui de déterminer les différentes options'],
  },

  'Tradition, habitudes': {
    advantages: [
      'Extrêmement rapide, voir instantané',
      "Gain d'énergie énorme",
      "Contribue à un sens de l'identité",
    ],
    suitedFor: [
      'Aux décisions répétitives dont les conditions sont stables dans le temps',
      "Quand le temps ou l'envie manque pour formaliser",
      "Dans l'urgence quand rien n'est prévu",
    ],
    risks: [
      'Immobilisme',
      'Absence de créativité',
      'Ne prend pas en compte les besoins individuels',
    ],
    notRecommendedFor: [],
    keyPoints: ['Nécessite que le groupe partage une culture commune'],
  },

  'Non-choix': {
    advantages: ["Économie d'énergie", 'Prendre le temps'],
    suitedFor: [],
    risks: ['Frustrations', 'Inertie'],
    notRecommendedFor: [],
  },

  'Déléguer la décision à un rôle': {
    advantages: [
      'Clarté',
      'Responsabilité',
      'Créativité individuelle',
      "Qualités et expertise de la personne l'exerçant",
    ],
    suitedFor: [],
    risks: [
      "Manque d'intelligence collective",
      'Faible adhésion aux décisions',
      'Personnalise le pouvoir',
      'Abus de pouvoir',
      'Conflits, confusion quand les limites du périmètre ne sont pas claires',
      "Défauts et limites de la personne l'exerçant",
      'Épuisement de cette personne',
    ],
    notRecommendedFor: [],
    keyPoints: ['Clarifier le périmètre du rôle est crucial'],
  },

  // Individual Processes
  'Vote à la majorité': {
    steps: [
      "Une proposition est mise à l'ordre du jour (à préciser qui a le droit ou la manière)",
      'Clarification de la proposition, partage des faits',
      'Chacun·e vote « pour » ou « contre » la proposition',
      'La proposition est validée, au dessus de 50% de « pour » à la majorité simple, à 66%, 75%, etc. à la majorité qualifiée',
    ],
    advantages: ['Plutôt rapide', 'Équité dans le vote', 'Possible à distance'],
    suitedFor: ['Sujet binaire'],
    risks: [
      'Clivant',
      'Faible intelligence collective',
      'Pas de prise en compte de la minorité',
      'Non application de la décision par la minorité',
    ],
    notRecommendedFor: ['Les sujets complexes'],
    keyPoints: [
      'La personne qui formule la proposition a un pouvoir énorme, risque de manipulation',
    ],
  },

  "Partage d'intention": {
    steps: [
      "La personne qui veut prendre une décision l'annonce en réunion, sur un tableau ou sur informatique : « J'ai l'intention de ... d'ici ... »",
      "Les gens que cela questionne ont le devoir de le dire à la personne qui propose pour qu'elle puisse réévaluer sa décision",
      "Le principe est « qui ne dit mot consent », en l'absence de retour, elle la met en œuvre",
      'En cas de désaccord persistant, le sujet doit être tranché autrement',
    ],
    advantages: ['Très économe en énergie', 'Possible sans être réunis'],
    suitedFor: ['Décisions réversibles'],
    risks: ['Conflits, particulièrement avec les absents'],
    notRecommendedFor: ['Les sujets conflictuels', "Besoin d'intelligence collective"],
    keyPoints: [
      'Requiert un temps ou un espace pour partager son intention',
      "Bien formuler « J'ai l'intention de ... » plutôt que « J'ai décidé de... »",
      "Demande de l'ouverture de la part du décideur et du courage de la part des timides",
    ],
  },

  "Sollicitation d'avis": {
    steps: [
      "Une personne (le décideur) est souveraine pour décider d'un sujet",
      "Elle a l'obligation de consulter toutes les personnes concernées ou compétentes, à l'oral ou à l'écrit",
      'Une fois les consultations finies, elle décide seule et annonce sa décision au groupe',
    ],
    advantages: ['Économe en énergie', 'Grande créativité', 'Possible sans être réunis'],
    suitedFor: ["Décision demandant peu d'actions des autres"],
    risks: ['Individualisme et conflits', 'Écarts de pouvoir'],
    notRecommendedFor: ['Les sujets conflictuels'],
    keyPoints: [
      "Requiert d'assumer de décider",
      'Demande un bon niveau de confiance dans le groupe et vis à vis du décideur',
      "Dépendant de la capacité d'écoute et de synthèse du décideur",
    ],
  },

  'Consultation collective': {
    steps: [
      "Une personne, le décideur, a la responsabilité d'une décision",
      "Lors d'une réunion : échange d'informations, clarification du sujet ou de la proposition",
      'Tour de parole',
      'Le décideur prend seul la décision (plutôt après la réunion) puis annonce sa décision',
    ],
    advantages: [
      'Bonne créativité',
      'Forte intelligence collective',
      "Tour de parole détendu, sans l'enjeu de converger",
      'Nourrit la cohésion',
    ],
    suitedFor: [],
    risks: ['Écarts de pouvoir (souvent les mêmes décideurs)', "Nécessite d'être réunis"],
    notRecommendedFor: ["Si le décideur n'est pas neutre pour un sujet conflictuel"],
    keyPoints: [
      "Requiert d'assumer de décider",
      'Demande un bon niveau de confiance dans le groupe et vis à vis du décideur',
      "Dépendant de la capacité d'écoute et de synthèse du décideur",
    ],
  },

  Consentement: {
    steps: [
      'Tour de clarification du sujet, partage des faits',
      "Écoute du centre pour faire émerger les besoins et l'intelligence collective",
      'Une personne / sous-groupe fait une proposition',
      'Tour de clarification de la proposition',
      'Tour de ressenti sur la proposition',
      'Amendement : Le proposeur peut modifier ou retirer sa proposition',
      "Tour d'objection",
      'Test des objections',
      'Tour de bonifications des objections',
      "La proposition est validée en l'absence d'objection",
    ],
    advantages: [
      'Bonne adhésion',
      'Forte intelligence collective',
      'Respect de chacun·e',
      'Nourrit le lien',
    ],
    suitedFor: ['Sujet irréversible'],
    risks: [
      'Inertie, paralysie',
      'Épuisement',
      'Décision « molle »',
      'Pressions sur les individus pour être au niveau',
    ],
    notRecommendedFor: ['Les sujets urgents', 'Quand des avis irréconciliables coexistent'],
    keyPoints: [
      'Nécessite formation et posture coopérative des participants',
      'Nécessite un objectif commun, un excellent facilitateur',
    ],
  },

  'Consensus (formel)': {
    steps: [
      'Tour de clarification du sujet, partage des faits',
      "Tour de parole pour faire émerger les besoins et l'intelligence collective",
      'Une personne / un sous-groupe fait une proposition',
      'Tour de ressenti sur la proposition',
      'Le proposeur peut modifier sa proposition',
      "Tour de positionnement : soutenir, s'opposer ou s'abstenir",
      "La proposition est validée s'il n'y a pas d'opposition et moins de x% d'abstention",
    ],
    advantages: [
      'Grande adhésion',
      'Forte intelligence collective',
      'Respect de chacun·e',
      'Nourrit le lien',
    ],
    suitedFor: ['Sujet irréversible'],
    risks: [
      'Inertie, paralysie',
      'Épuisement',
      'Décision « molle »',
      'Pressions sur les individus pour avoir la bonne posture',
    ],
    notRecommendedFor: ['Les sujets urgents', 'Quand des avis irréconciliables coexistent'],
    keyPoints: [
      'Nécessite une posture coopérative des participants',
      'Nécessite un objectif commun, un bon facilitateur',
    ],
  },

  'Consensus informel': {
    steps: [],
    advantages: ['Forte intelligence collective', 'Respect de chacun·e', 'Nourrit le lien'],
    suitedFor: ['Sujet irréversible', 'Facile de converger'],
    risks: ['Inertie, paralysie', 'Épuisement', 'Décision « molle »', 'Autocensures'],
    notRecommendedFor: ['Les sujets urgents', 'Quand des avis irréconciliables coexistent'],
    keyPoints: [
      'Nécessite une posture coopérative des participants',
      'Nécessite un objectif commun, un facilitateur',
    ],
  },

  'Décisions algorithmiques': {
    steps: [
      'Échanger sur le sujet',
      'Créer un « algorithme » pertinent (une formule)',
      'Chacun·e donne sa réponse',
      "Les réponses sont compilées grâce à l'algorithme, cela donne la décision",
    ],
    advantages: [
      'Équitable, impartial',
      'Possible à distance',
      "Extrêmement rapide une fois l'algorithme validé",
      'Facile de remodifier la décision',
    ],
    suitedFor: ['Limité à des critères mesurables et objectifs'],
    risks: [
      "Très rationnel et froid : pas de place pour l'émotionnel, la créativité, le lien, les cas particuliers",
      'Peut être sensible aux manipulations',
    ],
    notRecommendedFor: [],
    keyPoints: ["Le pouvoir le plus important se situe dans le choix de l'algorithme"],
  },

  'Vote par approbation': {
    steps: [
      'Tour de clarification du sujet, partage des faits',
      "Tour de parole pour faire émerger les besoins et l'intelligence collective",
      'Tour de propositions (4-5 max)',
      "Chacun·e vote pour toutes les propositions qu'il soutient",
      'La proposition avec la plus haute adhésion est retenue',
    ],
    advantages: [
      'Maîtrise du temps',
      'Forte intelligence collective',
      'Équité',
      'Met les participants dans une posture constructive',
    ],
    suitedFor: [
      'Décision demandant de la créativité',
      'Trancher les sujets conflictuels',
      'Les votants maîtrisent le sujet',
    ],
    risks: [
      'Tour de proposition délicat à faciliter (risque de se perdre dans toutes les possibilités)',
      'Énergivore',
    ],
    notRecommendedFor: [],
    keyPoints: [
      'Nécessite un facilitateur compétent',
      'Les étapes peuvent être réparties sur plusieurs réunions',
      'Le tour de proposition est déconseillé à plus que 8 personnes',
    ],
  },

  'Règle de trois': {
    steps: [
      'Un membre a une proposition',
      "Il en parle à 2 personnes qu'il juge légitime pour la valider",
      'Les 2 personnes passent, ou se positionnent : « Oui » « Non » « Peut-être »',
      "Un « Non » met fin au processus, l'idée devra être soumise à une instance compétente",
      'Au bout de 2 « Oui », la proposition est adoptée',
      'Au bout de 2 « peut-être » il faut réunir les personnes pour en discuter',
    ],
    advantages: [
      "Stimule l'esprit d'initiative",
      'Permet un niveau minimal de cohérence de la décision',
      'Économe en énergie',
      'Permet de la créativité',
      'Possible sans être réuni',
    ],
    suitedFor: [],
    risks: [
      'Conflits',
      'Décision hâtives, mal appliquées',
      'Écart de pouvoirs entre les timides et gens affirmés',
    ],
    notRecommendedFor: ['Sujets conflictuels'],
    keyPoints: [
      'Il faut consulter des personnes susceptibles de se positionner honnêtement et pas uniquement à ses proches',
    ],
  },
};
