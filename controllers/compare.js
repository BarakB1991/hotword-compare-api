const { softSkills, hardSkills } = require('../utils/arraysData');
const { NotFoundError } = require('../utils/errorHandler');

const postSkillCompare = async (req, res, next) => {
  const [text1 = resume, text2 = jobDescription] = req.body;

  try {
    const resultSoftSkillsFound = [];
    const resultHardSkillsFound = [];

    // Function to count the occurrence of a keyword in a text
    const countKeyword = (text, keyword) => {
      let count = 0;
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      count = (text.match(regex) || []).length;
      return count;
    };

    // Loop through the soft skills array and compare it with the texts
    softSkills.forEach((skill) => {
      const lowerCaseSkill = skill.toLowerCase();
      const countText1 = countKeyword(text1.toLowerCase(), lowerCaseSkill);
      const countText2 = countKeyword(text2.toLowerCase(), lowerCaseSkill);
      if (countText1 || countText2) {
        resultSoftSkillsFound.push({
          [skill]: {
            resume: countText1,
            jobPost: countText2,
          },
        });
      }
    });

    // Loop through the hard skills array and compare it with the texts
    hardSkills.forEach((skill) => {
      const lowerCaseSkill = skill.toLowerCase();
      const countText1 = countKeyword(text1.toLowerCase(), lowerCaseSkill);
      const countText2 = countKeyword(text2.toLowerCase(), lowerCaseSkill);
      if (countText1 || countText2) {
        resultHardSkillsFound.push({
          [skill]: {
            resume: countText1,
            jobPost: countText2,
          },
        });
      }
    });

    // Send results to client
    if (resultHardSkillsFound.length > 0 || resultSoftSkillsFound.length > 0) {
      return res.send({ resultSoftSkillsFound, resultHardSkillsFound });
    }

    // No results error
    throw new NotFoundError(
      'Sorry. There was no keywords found in any of the texts',
    );
  } catch (e) {
    next(e);
  }
};

module.exports = postSkillCompare;
