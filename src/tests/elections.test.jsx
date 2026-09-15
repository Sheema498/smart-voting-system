import { describe, it, expect } from 'vitest';
import { mockElections } from '../data/mockElections';
import { mockCandidates } from '../data/mockCandidates';

describe('Elections & Candidates Data Model Test Suite', () => {
  it('contains diverse election catalog with required properties', () => {
    expect(mockElections.length).toBeGreaterThanOrEqual(10);
    mockElections.forEach((el) => {
      expect(el.id).toBeDefined();
      expect(el.title).toBeDefined();
      expect(el.category).toBeDefined();
      expect(el.status).toBeDefined();
      expect(el.eligibleVoters).toBeGreaterThan(0);
    });
  });

  it('contains candidates assigned to valid election IDs', () => {
    expect(mockCandidates.length).toBeGreaterThanOrEqual(20);
    const electionIds = new Set(mockElections.map((e) => e.id));

    mockCandidates.forEach((cand) => {
      expect(cand.id).toBeDefined();
      expect(cand.name).toBeDefined();
      expect(cand.party).toBeDefined();
      expect(cand.position).toBeDefined();
      expect(electionIds.has(cand.electionId)).toBe(true);
    });
  });

  it('filters elections by category and status', () => {
    const active = mockElections.filter((e) => e.status.toLowerCase() === 'active');
    expect(active.length).toBeGreaterThan(0);

    const campusOrCivic = mockElections.filter((e) =>
      e.category.toLowerCase().includes('academic') || e.category.toLowerCase().includes('civic')
    );
    expect(campusOrCivic.length).toBeGreaterThan(0);
  });
});
