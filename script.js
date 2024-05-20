// function getVisibleName(maliciousName) {
//   console.log("maliciousName:", maliciousName)
//   // find the position of the right to left override character (RTLO)
//   let rightToLeftPos = maliciousName.indexOf('\u202E');
//   // split filename into two parts -> split at RTLO
//   let left = maliciousName.slice(0, rightToLeftPos);
//   let right = maliciousName.slice(rightToLeftPos + 1);
//   // reverse the right
//   let reverseRight = right.split('').reverse().join('');
//   // remove exe. from the reverseRight
//   let removeExe = reverseRight.replace("exe.", "");
  
//   let obfuscatedName = left + removeExe;
//   console.log('obfuscated name: ', obfuscatedName);
//   return obfuscatedName;
// }

// the above does not pass all cases

function getVisibleName(maliciousName) {
  // find the position of the right to left override character (RTLO)
  let rightToLeftPos = maliciousName.indexOf('\u202E');
  // split filename into two parts -> split at RTLO
  let left = maliciousName.slice(0, rightToLeftPos);
  let right = maliciousName.slice(rightToLeftPos + 1);
  // reverse the right
  let reverseRight = right.split('').reverse().join('');
  
  let dotSplit = reverseRight.split('.')
  dotSplit = dotSplit.slice(1)
  console.log("dotSplit", dotSplit);
  
  if(dotSplit[0] === '') right = '';
  if(dotSplit.length === 1 && left[left.length - 1] !== '.') right = '.' + dotSplit[0];
  if(dotSplit.length === 1 && left[left.length - 1] === '.') right = dotSplit[0];
  
  if(dotSplit.length > 1) {
    right = dotSplit[0]
    for(let i = 1; i < dotSplit.length; i++) {
      right = right + '.' + dotSplit[i];
    }
  }
  
  if(dotSplit.length === 1 && dotSplit[0] !== 'jpg') right = dotSplit[0];
  console.log("right", right);
  
  let obfuscatedName = left + right;
  console.log('obfuscated name: ', obfuscatedName);
  return obfuscatedName;
}


//// a solution i liked
function getVisibleName(maliciousName) {
  const [unmodifiedPart, obfuscatedPart] = maliciousName.split('\u202E');
  const truePart = [...obfuscatedPart].reverse().join('');
  const pointIndex = truePart.indexOf('.');
  return unmodifiedPart + truePart.slice(pointIndex + 1);
}
