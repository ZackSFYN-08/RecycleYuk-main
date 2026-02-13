import { describe, it, expect } from 'vitest';
import { formatRupiah, getStatusColor, calculateRewardPoints } from '@/utils/enhancedHelpers';

describe('enhancedHelpers', () => {
  describe('formatRupiah', () => {
    it('formats numbers as Indonesian Rupiah without decimals', () => {
      expect(formatRupiah(1500)).toBe('Rp 1.500');
      expect(formatRupiah(0)).toBe('Rp 0');
    });
  });

  describe('getStatusColor', () => {
    it('returns green classes for done-like statuses', () => {
      expect(getStatusColor('Done')).toContain('bg-green-100');
      expect(getStatusColor('selesai')).toContain('bg-green-100');
    });

    it('returns yellow classes for pending-like statuses', () => {
      expect(getStatusColor('Pending')).toContain('bg-yellow-100');
    });

    it('falls back to gray for unknown status', () => {
      expect(getStatusColor('unknown-status')).toContain('bg-gray-100');
    });
  });

  describe('calculateRewardPoints', () => {
    it('calculates reward points from total weight', () => {
      const points = calculateRewardPoints(10);
      expect(points).toBeTypeOf('number');
      expect(points).toBeGreaterThan(0);
    });
  });
});

