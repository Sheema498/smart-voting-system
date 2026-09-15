/**
 * Text and number formatting utilities.
 */

export function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return '0';
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatPercent(value, total, decimals = 1) {
  if (!total || total === 0) return '0.0%';
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(decimals)}%`;
}

export function maskVoterId(voterId) {
  if (!voterId) return '';
  const parts = voterId.split('-');
  if (parts.length === 3) {
    return `${parts[0]}-••••••-${parts[2]}`;
  }
  if (voterId.length > 6) {
    return voterId.slice(0, 3) + '••••' + voterId.slice(-3);
  }
  return '••••••';
}

export function truncateText(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
