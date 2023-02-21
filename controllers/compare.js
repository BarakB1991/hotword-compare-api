const { softSkills, hardSkills } = require('../utils/arraysData');
const { NotFoundError } = require('../utils/errorHandler');

const postSkillCompare = async (req, res, next) => {
  console.log(req.body);
  const [text1 = resume, text2 = jobDescription] = req.body;

  try {
    const resultSoftSkillsFound = [];
    const resultHardSkillsFound = [];

    // Function to count the occurrence of a keyword in a text
    const countKeyword = (text, keyword) => {
      const keys = Object.values(keyword)[0]; // access array of options for keyword
      const values = keys.join('\\w*|');
      let count = 0;
      const regex = new RegExp(`(${values})`, 'gi');
      count = (text.match(regex) || []).length;
      return count;
    };

    const loopAndCompareSkillsWithText = (skillsArray, resultsArray) => {
      skillsArray.forEach((skill) => {
        const countText1 = countKeyword(text1.toLowerCase(), skill);
        const countText2 = countKeyword(text2.toLowerCase(), skill);
        if (countText1 || countText2) {
          resultsArray.push({
            [Object.values(skill)[0][0]]: {
              resume: countText1,
              jobPost: countText2,
            },
          });
        }
      });
    };

    // Loop through the soft and hard skills array and compare it with the texts
    loopAndCompareSkillsWithText(softSkills, resultSoftSkillsFound);
    loopAndCompareSkillsWithText(hardSkills, resultHardSkillsFound);

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
