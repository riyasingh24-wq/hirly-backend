import { calculateSimilarity } from '../../src/utils/calculateSimilarity.js';

describe("calculateSimilarity()", () => {
      it("should return 100 for identical inputs", () => {
      const result = calculateSimilarity(['JS', 'React'], ['JS', 'React']);
      expect(result).toBeCloseTo(100.00, 1);
      });

      it("should return 0 for completely different inputs", () => {
      const result = calculateSimilarity(['Python'], ['Java']);
      expect(result).toBeCloseTo(0.00, 1);
      });

      it("should return 50 for partial match", () => {
      const result = calculateSimilarity(['JS'], ['JS', 'React']);
      expect(result).toBeCloseTo(50.00, 1);
      });
});
