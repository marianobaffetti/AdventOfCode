const getValidPassports = (input) => {
  return 0;
}

const parsePassport = (passportAsString) =>{
  const pasportAsArray = passportAsString.replace(/\n/g,' ').split(' ');

  return pasportAsArray.reduce((acum, current)=> {
      let keyValue = current.split(':');
      acum[keyValue[0]] = keyValue[1];
      return acum;
    }, {})
}

describe('parsePassport', () => {
  test('xxxxxxxxxxxx', () => {
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
}
)

describe('getValidPassports', () => {
  test('Single invalid record', () => {
    let input = 'ecl:gry'
    expect(getValidPassports(input)).toBe(0);
  });
})

// ----------------------------------------------------

// test('One valid record, one invalid record', () => {
//   let input = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
//   byr:1937 iyr:2017 cid:147 hgt:183cm
  
//   iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
//   hcl:#cfa07d byr:1929`

//   expect(getValidPassports(input)).toBe(1);
// });

// ----------------------------------------------------

// ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
// byr:1937 iyr:2017 cid:147 hgt:183cm

// iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
// hcl:#cfa07d byr:1929

// hcl:#ae17e1 iyr:2013
// eyr:2024
// ecl:brn pid:760753108 byr:1931
// hgt:179cm

// hcl:#cfa07d eyr:2025 pid:166559648
// iyr:2011 ecl:brn hgt:59in