import { DECISION_PROCESSES } from '../data/processes';
import type { DecisionProcess } from '../data/processes';

export function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getProcessBySlug(slug: string): DecisionProcess | undefined {
  return DECISION_PROCESSES.find((p) => slugify(p.name) === slug);
}
