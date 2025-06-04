export function calculateSimilarity(candidateSkills, jobSkills) {
      const matches = candidateSkills.filter(skill => jobSkills.includes(skill)).length;
      const matchScore = (matches / jobSkills.length) * 100;
      return parseFloat(matchScore.toFixed(2));
    }
    