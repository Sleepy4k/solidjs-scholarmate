
type IWord = string | number;

const convertToTitleCase = (text: string) => {
  const splitText = text.split('_');
  const titleCaseText = splitText.map(word => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();

    return firstLetter + restOfWord;
  }).join(' ');
  
  return titleCaseText;
};

const convertStringToNumber = (word: IWord) => {
  const number = Number(word);

  return number;
};

const convertNumberToString = (word: IWord) => {
  const string = String(word);

  return string;
};

const convertErrorResponseData = (error: any) => {
  let errorObject = [];
  const splitError = error.split('\n');

  splitError.map((errorMessage: string) => {
    const colonIndex = errorMessage.indexOf(':');
    const message = errorMessage.substring(colonIndex + 2);

    errorObject.push(message);
  });

  return errorObject;
};

export {
  convertToTitleCase,
  convertStringToNumber,
  convertNumberToString,
  convertErrorResponseData
};