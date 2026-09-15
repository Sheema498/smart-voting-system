import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isValidPin,
  isValidVoterId,
  validateElectionForm,
  validateCandidateForm,
  validateContactForm
} from '../utils/validators';

describe('Validators Unit Test Suite', () => {
  describe('isValidEmail', () => {
    it('accepts valid email formats', () => {
      expect(isValidEmail('voter@votesphere.gov')).toBe(true);
      expect(isValidEmail('test.user@sub.domain.org')).toBe(true);
      expect(isValidEmail('citizen_123@example.com')).toBe(true);
    });

    it('rejects malformed email formats', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('not-an-email')).toBe(false);
      expect(isValidEmail('@nodomain.com')).toBe(false);
      expect(isValidEmail('spaces in@email.com')).toBe(false);
    });
  });

  describe('isValidPin', () => {
    it('validates 4 to 6 digit numeric PINs', () => {
      expect(isValidPin('1234')).toBe(true);
      expect(isValidPin('9842')).toBe(true);
      expect(isValidPin('123456')).toBe(true);
    });

    it('rejects non-numeric or invalid length PINs', () => {
      expect(isValidPin('123')).toBe(false);
      expect(isValidPin('abcd')).toBe(false);
      expect(isValidPin('12a4')).toBe(false);
      expect(isValidPin('')).toBe(false);
    });
  });

  describe('isValidVoterId', () => {
    it('validates official voter ID formats', () => {
      expect(isValidVoterId('VS-984210-2026')).toBe(true);
      expect(isValidVoterId('CA-12345-2026')).toBe(true);
    });

    it('rejects non-conforming IDs', () => {
      expect(isValidVoterId('')).toBe(false);
      expect(isValidVoterId('12345')).toBe(false);
    });
  });

  describe('validateElectionForm', () => {
    it('validates complete election payload', () => {
      const validForm = {
        title: 'Municipal General Election',
        category: 'Municipal Government',
        startDate: '2026-10-01',
        endDate: '2026-10-15',
        eligibleVoters: 5000,
        description: 'Comprehensive civic referendum on municipal sustainability and public transport.'
      };
      const res = validateElectionForm(validForm);
      expect(res.isValid).toBe(true);
      expect(Object.keys(res.errors).length).toBe(0);
    });

    it('flags missing required fields and chronological conflicts', () => {
      const invalidForm = {
        title: 'Bad',
        category: '',
        startDate: '2026-10-15',
        endDate: '2026-10-01', // Before start date
        eligibleVoters: 0,
        description: 'Too short'
      };
      const res = validateElectionForm(invalidForm);
      expect(res.isValid).toBe(false);
      expect(res.errors.title).toBeDefined();
      expect(res.errors.category).toBeDefined();
      expect(res.errors.endDate).toBeDefined();
      expect(res.errors.description).toBeDefined();
    });
  });

  describe('validateCandidateForm', () => {
    it('passes for verified candidate data', () => {
      const validCandidate = {
        name: 'Elena Rostova',
        party: 'Civic Forward Coalition',
        position: 'District Council Representative',
        bio: 'Dedicated public policy advocate with fifteen years of experience in regional governance and clean energy infrastructure.'
      };
      const res = validateCandidateForm(validCandidate);
      expect(res.isValid).toBe(true);
    });

    it('catches missing candidate fields', () => {
      const invalidCandidate = {
        name: 'E',
        party: '',
        position: '',
        bio: 'Short'
      };
      const res = validateCandidateForm(invalidCandidate);
      expect(res.isValid).toBe(false);
      expect(res.errors.name).toBeDefined();
      expect(res.errors.party).toBeDefined();
    });
  });

  describe('validateContactForm', () => {
    it('validates proper contact submissions', () => {
      const validContact = {
        name: 'Arthur Pendelton',
        email: 'arthur@example.org',
        subject: 'Accessibility Assistance Request',
        message: 'I would like to request high-contrast ballot materials for the upcoming election contest.'
      };
      const res = validateContactForm(validContact);
      expect(res.isValid).toBe(true);
    });
  });
});
