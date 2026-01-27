# Improve labelling

## Context

The process attribute labels are based on number values.
This causes unpleasant to read labels. Eg: "~4 personnes à 4 à 20 personnes".

## Goal

Use crafted labelling by displaying the exact labels from the source data file.

## Rules

Parse [the data provided for spec 0003](../0003-choose-process/processus-decision.md) and use the exact labelling of each criterion from that data file. Don't rebuild labels from numeric criteria values.

## Data Structure

Update `src/data/processes.ts` to store labels alongside numeric values:

```typescript
export interface CriterionValue {
  value: number | [number, number] | '*';
  label: string;
}

export interface DecisionProcess {
  name: string;
  criteria: Record<CriterionId, CriterionValue>;
}
```

## Label Mapping

Extract all labels from `processus-decision.md` for each process. The exact labels must be used as-is:

### Votes à choix multiples

| Criterion         | Label                   |
| ----------------- | ----------------------- |
| temps-disponible  | Heures                  |
| niveau-enjeu      | Moyen à Fort            |
| simplicite        | Moyen à Complexe        |
| taille-groupe     | 4 à 50+ personnes       |
| niveau-adhesion   | Moyen à Fort            |
| besoin-creativite | Fort                    |
| sujet-conflictuel | Adapté                  |
| asynchrone        | Non (nécessite réunion) |

### Processus consultatifs

| Criterion         | Label             |
| ----------------- | ----------------- |
| temps-disponible  | Heures à Jours    |
| niveau-enjeu      | Faible à Moyen    |
| simplicite        | Simple à Moyen    |
| taille-groupe     | 4 à 50+ personnes |
| niveau-adhesion   | Faible à Moyen    |
| besoin-creativite | Fort              |
| sujet-conflictuel | Déconseillé       |
| asynchrone        | Possible          |

### Processus horizontaux - égalitaires

| Criterion         | Label                                      |
| ----------------- | ------------------------------------------ |
| temps-disponible  | Heures à Semaines (+ délai pour se réunir) |
| niveau-enjeu      | Fort à Très fort                           |
| simplicite        | Complexe (nécessite formation et posture)  |
| taille-groupe     | 4 à 20 personnes                           |
| niveau-adhesion   | Fort (Application active)                  |
| besoin-creativite | Fort                                       |
| sujet-conflictuel | Déconseillé si avis irréconciliables       |
| asynchrone        | Difficile                                  |

### Mode de décisions libertaires

| Criterion         | Label                          |
| ----------------- | ------------------------------ |
| temps-disponible  | Instantané à Minutes           |
| niveau-enjeu      | Faible                         |
| simplicite        | Simple                         |
| taille-groupe     | 4 à des milliers               |
| niveau-adhesion   | Faible                         |
| besoin-creativite | Fort (créativité individuelle) |
| sujet-conflictuel | Non adapté                     |
| asynchrone        | Oui (facile)                   |

### Suivre un signe

| Criterion         | Label            |
| ----------------- | ---------------- |
| temps-disponible  | Minutes à Heures |
| niveau-enjeu      | Faible à Moyen   |
| simplicite        | Moyen            |
| taille-groupe     | Petits groupes   |
| niveau-adhesion   | Moyen            |
| besoin-creativite | Faible           |
| sujet-conflictuel | Variable         |
| asynchrone        | Variable         |

### Hasard

| Criterion         | Label                   |
| ----------------- | ----------------------- |
| temps-disponible  | Minutes                 |
| niveau-enjeu      | Faible                  |
| simplicite        | Simple                  |
| taille-groupe     | 4 à des milliers        |
| niveau-adhesion   | Faible (Acceptation)    |
| besoin-creativite | Faible                  |
| sujet-conflictuel | Peut aider à départager |
| asynchrone        | Oui (facile)            |

### Tradition, habitudes

| Criterion         | Label            |
| ----------------- | ---------------- |
| temps-disponible  | Instantané       |
| niveau-enjeu      | Faible à Fort    |
| simplicite        | Simple           |
| taille-groupe     | 4 à des milliers |
| niveau-adhesion   | Faible           |
| besoin-creativite | Aucun            |
| sujet-conflictuel | Non adapté       |
| asynchrone        | Oui              |

### Non-choix

| Criterion         | Label                      |
| ----------------- | -------------------------- |
| temps-disponible  | Variable                   |
| niveau-enjeu      | Variable                   |
| simplicite        | Simple                     |
| taille-groupe     | Toutes tailles             |
| niveau-adhesion   | Faible                     |
| besoin-creativite | Aucun                      |
| sujet-conflictuel | Parfois utilisé par défaut |
| asynchrone        | Oui                        |

### Déléguer la décision à un rôle

| Criterion         | Label                        |
| ----------------- | ---------------------------- |
| temps-disponible  | Heures                       |
| niveau-enjeu      | Faible à Fort                |
| simplicite        | Simple à Moyen               |
| taille-groupe     | 4 à des milliers             |
| niveau-adhesion   | Faible à Moyen               |
| besoin-creativite | Fort (individuel)            |
| sujet-conflictuel | Attention aux limites floues |
| asynchrone        | Oui (facile)                 |

### Vote à la majorité

| Criterion         | Label                     |
| ----------------- | ------------------------- |
| temps-disponible  | Heures                    |
| niveau-enjeu      | Moyen à Fort              |
| simplicite        | Simple                    |
| taille-groupe     | 8 à des millions          |
| niveau-adhesion   | Moyen (Acceptation)       |
| besoin-creativite | Faible                    |
| sujet-conflictuel | Risqué (clivant)          |
| asynchrone        | Oui (possible à distance) |

### Partage d'intention

| Criterion         | Label                           |
| ----------------- | ------------------------------- |
| temps-disponible  | Jours                           |
| niveau-enjeu      | Faible                          |
| simplicite        | Simple                          |
| taille-groupe     | 4 à 20 personnes                |
| niveau-adhesion   | Moyen                           |
| besoin-creativite | Faible                          |
| sujet-conflictuel | Déconseillé                     |
| asynchrone        | Oui (possible sans être réunis) |

### Sollicitation d'avis

| Criterion         | Label                           |
| ----------------- | ------------------------------- |
| temps-disponible  | Jours                           |
| niveau-enjeu      | Moyen                           |
| simplicite        | Moyen                           |
| taille-groupe     | 4 à 50+ personnes               |
| niveau-adhesion   | Moyen                           |
| besoin-creativite | Fort                            |
| sujet-conflictuel | Déconseillé                     |
| asynchrone        | Oui (possible sans être réunis) |

### Consultation collective

| Criterion         | Label                            |
| ----------------- | -------------------------------- |
| temps-disponible  | Heures (+ délai pour se réunir)  |
| niveau-enjeu      | Moyen à Fort                     |
| simplicite        | Moyen                            |
| taille-groupe     | 4 à 20 personnes                 |
| niveau-adhesion   | Moyen à Fort                     |
| besoin-creativite | Fort                             |
| sujet-conflictuel | Attention si décideur non neutre |
| asynchrone        | Non (nécessite d'être réunis)    |

### Consentement

| Criterion         | Label                                |
| ----------------- | ------------------------------------ |
| temps-disponible  | Heures (+ délai pour se réunir)      |
| niveau-enjeu      | Fort                                 |
| simplicite        | Complexe                             |
| taille-groupe     | 4 à 20 personnes                     |
| niveau-adhesion   | Fort (Application active)            |
| besoin-creativite | Fort                                 |
| sujet-conflictuel | Déconseillé si avis irréconciliables |
| asynchrone        | Difficile                            |

### Consensus (formel)

| Criterion         | Label                                      |
| ----------------- | ------------------------------------------ |
| temps-disponible  | Heures à Semaines (+ délai pour se réunir) |
| niveau-enjeu      | Fort                                       |
| simplicite        | Complexe                                   |
| taille-groupe     | 4 à 20 personnes                           |
| niveau-adhesion   | Fort (Application active)                  |
| besoin-creativite | Fort                                       |
| sujet-conflictuel | Déconseillé si avis irréconciliables       |
| asynchrone        | Difficile                                  |

### Consensus informel

| Criterion         | Label                                |
| ----------------- | ------------------------------------ |
| temps-disponible  | Heures (+ délai pour se réunir)      |
| niveau-enjeu      | Fort                                 |
| simplicite        | Moyen à Complexe                     |
| taille-groupe     | 4 à 20 personnes                     |
| niveau-adhesion   | Fort (Application active)            |
| besoin-creativite | Fort                                 |
| sujet-conflictuel | Déconseillé si avis irréconciliables |
| asynchrone        | Difficile                            |

### Décisions algorithmiques

| Criterion         | Label                                |
| ----------------- | ------------------------------------ |
| temps-disponible  | Minutes à Heures                     |
| niveau-enjeu      | Faible à Moyen                       |
| simplicite        | Moyen                                |
| taille-groupe     | 8 à des millions                     |
| niveau-adhesion   | Moyen (Acceptation)                  |
| besoin-creativite | Faible                               |
| sujet-conflictuel | Peut être sensible aux manipulations |
| asynchrone        | Oui (possible à distance)            |

### Vote par approbation

| Criterion         | Label                           |
| ----------------- | ------------------------------- |
| temps-disponible  | Heures (+ délai pour se réunir) |
| niveau-enjeu      | Moyen à Fort                    |
| simplicite        | Moyen à Complexe                |
| taille-groupe     | 8 à 50+ personnes               |
| niveau-adhesion   | Fort                            |
| besoin-creativite | Fort                            |
| sujet-conflictuel | Adapté                          |
| asynchrone        | Non (nécessite réunion)         |

### Règle de trois

| Criterion         | Label                           |
| ----------------- | ------------------------------- |
| temps-disponible  | Heures (+ délai pour se réunir) |
| niveau-enjeu      | Moyen                           |
| simplicite        | Simple                          |
| taille-groupe     | 8 à 50+ personnes               |
| niveau-adhesion   | Moyen                           |
| besoin-creativite | Fort                            |
| sujet-conflictuel | Déconseillé                     |
| asynchrone        | Oui (possible sans être réuni)  |

## Implementation Notes

1. **Remove formatting functions**: Delete `formatSingleValue()` and `formatRange()` functions from the display logic
2. **Direct label display**: Display `process.criteria[criterionId].label` directly in the UI
3. **Keep numeric values**: The `value` field remains unchanged and is used for the scoring algorithm
4. **No string interpolation**: Labels should never be generated programmatically — always use the stored label

## Example Data Update

Before:

```typescript
{
  name: 'Votes à choix multiples',
  criteria: {
    'temps-disponible': 3,
    'niveau-enjeu': [3, 4],
    // ...
  },
}
```

After:

```typescript
{
  name: 'Votes à choix multiples',
  criteria: {
    'temps-disponible': { value: 3, label: 'Heures (+ délai pour se réunir)' },
    'niveau-enjeu': { value: [3, 4], label: 'Moyen à Fort' },
    // ...
  },
}
```
