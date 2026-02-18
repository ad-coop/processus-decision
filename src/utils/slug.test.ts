import { describe, it, expect } from 'vitest';
import { slugify, getProcessBySlug } from './slug';

describe('slugify', () => {
  it('slugify_ofSimpleName_returnsLowercase', () => {
    const result = slugify('Consentement');

    expect(result).toBe('consentement');
  });

  it('slugify_withAccents_removesAccents', () => {
    const result = slugify('Vote à la majorité');

    expect(result).toBe('vote-a-la-majorite');
  });

  it('slugify_withApostrophe_replacesWithDash', () => {
    const result = slugify("Partage d'intention");

    expect(result).toBe('partage-d-intention');
  });

  it('slugify_withMultipleSpecialChars_collapsesDashes', () => {
    const result = slugify('Foo  --  Bar');

    expect(result).toBe('foo-bar');
  });
});

describe('getProcessBySlug', () => {
  it('getProcessBySlug_ofKnownSlug_returnsProcess', () => {
    const result = getProcessBySlug('consentement');

    expect(result).toBeDefined();
    expect(result!.name).toBe('Consentement');
  });

  it('getProcessBySlug_ofUnknownSlug_returnsUndefined', () => {
    const result = getProcessBySlug('not-a-real-process');

    expect(result).toBeUndefined();
  });
});
