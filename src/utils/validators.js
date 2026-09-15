/**
 * Comprehensive input validation utilities for ballots, authentication, and admin forms.
 */

export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function isValidPin(pin) {
  if (!pin || typeof pin !== 'string') return false;
  return /^\d{4,6}$/.test(pin.trim());
}

export function isValidVoterId(id) {
  if (!id || typeof id !== 'string') return false;
  // Format: XX-123456-2026 or similar alphanumeric pattern
  return /^[A-Z]{2,4}-\d{4,8}-\d{4}$/.test(id.trim());
}

export function validateElectionForm(data) {
  const errors = {};

  if (!data.title || data.title.trim().length < 5) {
    errors.title = 'Title must be at least 5 characters long';
  }
  if (!data.category) {
    errors.category = 'Election category is required';
  }
  if (!data.startDate) {
    errors.startDate = 'Start date is required';
  }
  if (!data.endDate) {
    errors.endDate = 'End date is required';
  } else if (data.startDate && new Date(data.endDate) <= new Date(data.startDate)) {
    errors.endDate = 'End date must be strictly after the start date';
  }
  if (!data.description || data.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters';
  }
  if (!data.eligibleVoters || Number(data.eligibleVoters) <= 0) {
    errors.eligibleVoters = 'Eligible voters count must be greater than 0';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateCandidateForm(data) {
  const errors = {};

  if (!data.name || data.name.trim().length < 3) {
    errors.name = 'Full name must be at least 3 characters';
  }
  if (!data.party || data.party.trim().length < 2) {
    errors.party = 'Party / affiliation is required';
  }
  if (!data.position || data.position.trim().length < 3) {
    errors.position = 'Target office or position is required';
  }
  if (!data.bio || data.bio.trim().length < 25) {
    errors.bio = 'Biography must be at least 25 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateContactForm(data) {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please provide your full name';
  }
  if (!isValidEmail(data.email)) {
    errors.email = 'Please provide a valid email address';
  }
  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = 'Subject line is required';
  }
  if (!data.message || data.message.trim().length < 15) {
    errors.message = 'Message must be at least 15 characters long';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
