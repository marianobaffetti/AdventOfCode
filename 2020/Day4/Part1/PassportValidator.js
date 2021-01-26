class PassportValidator {
  invoke(passport) {
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
}

module.exports = PassportValidator;