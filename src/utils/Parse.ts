const convertToTitleCase = (text: string) => {
  const splitText = text.split('_');
  const titleCaseText = splitText.map(word => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  }).join(' ');
  
  return titleCaseText;
};

export default convertToTitleCase;