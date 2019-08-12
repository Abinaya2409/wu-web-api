/**
 * Created by paulius on 10/01/17.
 */
exports.capitalizeFirstLetter = string => {
  if(string)
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  else
    return '';
};


exports.substringText = (text, charCount) =>{
  if(text && text.length > charCount){
    var indices = [];
    // for(var i=0; i < charCount; i++) {
    //   if (text[i] === '.') {
    //     indices.push(i);
    //   }
    // }
    if(indices.length > 0){
      return text.substring(0, indices.pop()+1);
    }
    return text.substring(0, (charCount-3))+'...';
  }
  return text;
};

exports.replaceAll = (string, search, replacement) => {
  return string.replace(new RegExp(search, 'g'), replacement);
};

exports.toCurrencyString = int => {
  switch (int){
    case 0:
      return 'GBP';
    case 1:
      return 'EUR';
    case 2:
      return 'USD';
    case 3:
      return 'CNY';
    case 4:
      return 'HKD';
  }
};

exports.getCurrencyCode = currencyHash => {

  switch (currencyHash) {
    case "4ee9728a-7afd-e711-a94f-00224800375d":
      return "GBP";
    case "35d4d0f6-b72c-e911-a8a0-002248005556":
      return "CNY";
    case "a73244aa-b72c-e911-a8a0-002248005556":
      return "VND";
    case "dc874717-bb2c-e911-a8a0-002248005556":
      return "USD";
  }
}

exports.getCountryName = countryHash => {
  switch (countryHash) {
    case "78652973-165c-e911-a8ac-00224800449b":
      return "Isle of Man";
    case "35d4d0f6-b72c-e911-a8a0-002248005556":
      return "Portugal";
    case "a73244aa-b72c-e911-a8a0-002248005556":
      return "Poland";
    case "dc874717-bb2c-e911-a8a0-002248005556":
      return "Romania";
  }
};

exports.toCurrencyInt = string => {
  switch (string.toUpperCase()){
    case 'GBP':
      return 0;
    case 'EUR':
      return 1;
    case 'USD':
      return 2;
    case 'CNY':
      return 3;
    case 'HKD':
      return 4;
  }
};

exports.toTransferStateString = int => {
  switch (int) {
    case 0:
      return 'NEW';
    case 1:
      return 'READY';
    case 2:
      return 'COMPLETE';
    case 3:
      return 'CANCELLED';
    default:
      return 'UNKNOWN';
  }
};

exports.toTransferStateInt = string => {
  switch (string.toUpperCase()){
    case 'NEW':
      return 0;
    case 'COMPLETE':
      return 1;
    case 'CANCELLED':
      return 2;
    case 'READY':
      return 3;
    default:
      return 99;
  }
};
//
// exports.toOdataDate = dateString => {
//   return dateString.replace(' ', 'T') +'Z';
// };