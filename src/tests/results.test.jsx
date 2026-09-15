import { describe, it, expect } from 'vitest';
import { formatPercent, formatNumber, maskVoterId } from '../utils/formatters';
import { getTimeRemaining, getElectionStatus } from '../utils/dateUtils';
import { sha256, generateReceiptId, generateVoterId } from '../utils/cryptoHash';

describe('Results & Cryptographic Math Test Suite', () => {
  describe('formatPercent and formatNumber', () => {
    it('calculates vote share percentage accurately', () => {
      expect(formatPercent(500, 1000)).toBe('50.0%');
      expect(formatPercent(333, 1000, 2)).toBe('33.30%');
      expect(formatPercent(0, 1000)).toBe('0.0%');
      expect(formatPercent(10, 0)).toBe('0.0%');
    });

    it('formats large voter counts with commas', () => {
      expect(formatNumber(125000)).toBe('125,000');
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(1500)).toBe('1,500');
    });

    it('masks voter ID for anonymous receipts', () => {
      expect(maskVoterId('VS-984210-2026')).toBe('VS-••••••-2026');
    });
  });

  describe('Election Date Status & Timetable', () => {
    it('correctly calculates status from date windows', () => {
      const pastStart = '2026-01-01';
      const futureEnd = '2026-12-31';
      expect(getElectionStatus(pastStart, futureEnd)).toBe('active');

      const futureStart = '2027-01-01';
      const futureEnd2 = '2027-01-15';
      expect(getElectionStatus(futureStart, futureEnd2)).toBe('upcoming');

      const pastStart2 = '2025-01-01';
      const pastEnd = '2025-02-01';
      expect(getElectionStatus(pastStart2, pastEnd)).toBe('closed');
    });
  });

  describe('Cryptographic Hashes & Receipt Identifiers', () => {
    it('produces valid 64-character SHA-256 hashes', async () => {
      const hash1 = await sha256('democratic_ballot_test_payload');
      expect(hash1).toBeDefined();
      expect(hash1.length).toBe(64);

      // Determinism check
      const hash2 = await sha256('democratic_ballot_test_payload');
      expect(hash1).toBe(hash2);
    });

    it('generates properly formatted receipt and voter IDs', () => {
      const receipt = generateReceiptId();
      expect(receipt).toMatch(/^VOTE-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);

      const voterId = generateVoterId();
      expect(voterId).toMatch(/^VS-\d{6}-\d{4}$/);
    });
  });
});
