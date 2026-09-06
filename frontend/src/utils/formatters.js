/**
 * Utility functions for VYAPARMITRA formatting
 */

/**
 * Format numeric value to Indian Rupee (INR) currency string
 */
export const formatINR = (amount, compact = false) => {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';

  if (compact) {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakh`;
    }
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}k`;
    }
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format percentage
 */
export const formatPercent = (val) => {
  if (val === null || val === undefined) return '0%';
  return `${Number(val).toFixed(1)}%`;
};

/**
 * Capitalize first letter of words
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
