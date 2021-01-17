const Validator = require('./Validator.js');
const PassportValidator = require('./PassportValidator.js');

const validator = new Validator();
const passportValidator = new PassportValidator();

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

  expect(validator.getValidPassports(passports)).toEqual(2);
  });
})

describe('parsePassport', () => {
  test('Parse a single passport with two lines', () => {
    let passportAsString = 
    `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm`

    let passport = validator.parsePassport(passportAsString);
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

    let passport = validator.parsePassport(passportAsString);
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

    expect(passportValidator.invoke(validPassport)).toBe(true);
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

    expect(passportValidator.invoke(invalidPassport)).toBe(false);
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

    expect(validator.getPassportsAsString(passports).length).toEqual(4);
  });
})


describe('validations', () => {
  // (Birth Year) - four digits; at least 1920 and at most 2002.'
  test('(Birth Year) - four digits; at least 1920 and at most 2002.', () => {
    const birthYear = "1925"
    expect(validator.birthYearIsValid(birthYear)).toBe(true);
  });

  test('birthYearIsValid is false if length is not 4', () => {
    const birthYear = "123"
    expect(validator.birthYearIsValid(birthYear)).toBe(false);
  });

  test('birthYearIsValid is false if not is numeric', () => {
    const birthYear = "abc"
    expect(validator.birthYearIsValid(birthYear)).toBe(false);
  });
  
  test('birthYearIsValid is false if not between 1920 and 2002', () => {
    const birthYear = "1919"
    expect(validator.birthYearIsValid(birthYear)).toBe(false);
  });

  // (Issue Year) - four digits; at least 2010 and at most 2020.

  test('(Issue Year) - four digits; at least 2010 and at most 2020.', () => {
    const issueYear = "2011";
    expect(validator.issueYearIsValid(issueYear)).toBe(true);
  });

  test('issueYearIsValid false if length is not four', () => {
    const issueYear = "123";
    expect(validator.issueYearIsValid(issueYear)).toBe(false);
  });

  test('issueYearIsValid is false if not is numeric', () => {
    const issueYear = "abc";
    expect(validator.issueYearIsValid(issueYear)).toBe(false);
  });

  test('issueYearIsValid is false if not between 1920 and 2002', () => {
    const issueYear = "2009";
    expect(validator.issueYearIsValid(issueYear)).toBe(false);
  });
})