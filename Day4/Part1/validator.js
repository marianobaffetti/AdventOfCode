function isNumeric(iyr) {
  return parseInt(iyr) !== NaN;
}

const issueYearIsValid = (iyr) => {
  return isNumeric(iyr) && iyr.length == 4 && (iyr > 2010 && iyr < 2020);
}

const birthYearIsValid = (byr) => {
  return isNumeric(byr) && byr.length == 4 && (byr > 1920 && byr < 2002);
}

const passportIsValid = (passport) => {
  if (!passport.byr)
    return false;
  if (!passport.iyr)
    return false;
  if (!passport.eyr)
    return false;
  if (!passport.hgt)
    return false;
  if (!passport.hcl)
    return false;
  if (!passport.ecl)
    return false;
  if (!passport.pid)
    return false;
  return true;
}

const parsePassport = (passportAsString) => {
  const pasportAsArray = passportAsString.replace(/\n/g, ' ').split(' ');

  return pasportAsArray.reduce((acum, current) => {
    let keyValue = current.split(':');
    acum[keyValue[0]] = keyValue[1];
    return acum;
  }, {})
}

const getValidPassports = (input) => {
  return getPassportsAsString(input).reduce((acum, current) => {
    passportIsValid(parsePassport(current)) && acum++;
    return acum;
  }, 0);
}

const getPassportsAsString = (passports) => {
  return passports.split('\n\n');
}

module.exports = {
  getPassportsAsString,
  passportIsValid,
  parsePassport,
  getValidPassports,
  birthYearIsValid,
  issueYearIsValid
}