const getPassportsAsString = (passports) => {
  return passports.split('\n\n');
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
  
const parsePassport = (passportAsString) =>{
  const pasportAsArray = passportAsString.replace(/\n/g,' ').split(' ');
  
  return pasportAsArray.reduce((acum, current)=> {
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
  
describe('getValidPassports', () => {
  test('Returns the amount of valid passports', () => {
  const passports = 
  `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`

  expect(getValidPassports(passports)).toEqual(2);
  });
})

describe('parsePassport', () => {
  test('Parse a single passport with two lines', () => {
    let passportAsString = 
    `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm`

    let passport = parsePassport(passportAsString);
    expect(passport.ecl).toBe('gry');
    expect(passport.pid).toBe('860033327');
    expect(passport.eyr).toBe('2020');
    expect(passport.hcl).toEqual('#fffffd');
    expect(passport.byr).toBe('1937');
    expect(passport.iyr).toBe('2017');
    expect(passport.cid).toBe('147');
    expect(passport.hgt).toBe('183cm');
  });
  
  test('Parse a single passport with multiple lines', () => {
    let passportAsString = 
    `ecl:gry pid:860033327 
eyr:2020 
hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm`

    let passport = parsePassport(passportAsString);
    expect(passport.ecl).toBe('gry');
    expect(passport.pid).toBe('860033327');
    expect(passport.eyr).toBe('2020');
    expect(passport.hcl).toEqual('#fffffd');
    expect(passport.byr).toBe('1937');
    expect(passport.iyr).toBe('2017');
    expect(passport.cid).toBe('147');
    expect(passport.hgt).toBe('183cm');
  });
})

describe('validatePassport', () => {
  test('True when passport is valid', () => {
    validPassport = {
      ecl: "gry",
      eyr: "2020",
      hcl: "#fffffd",
      byr: "1937",
      pid: "860033327",
      ecl: "gry",
      eyr: "2020",
      hgt: "183cm",
      iyr: "2017"
    }

    expect(passportIsValid(validPassport)).toBe(true);
  });
  test('False when passport is invalid', () => {
    invalidPassport = {
      ecl: "gry",
      pid: "860033327",
      eyr: "2020",
      byr: "1937",
      cid: "147",
      ecl: "gry",
      eyr: "2020",
      hgt: "183cm",
      iyr: "2017"
    }

    expect(passportIsValid(invalidPassport)).toBe(false);
  });
})


describe('getPassportsAsString', () => {
  test('Returns an array with the right amount of elements', () => {
    const passports = 
    `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`

    expect(getPassportsAsString(passports).length).toEqual(4);
  });
})