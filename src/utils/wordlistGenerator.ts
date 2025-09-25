import { PersonalInfo, SocialMediaInfo, ReconInfo, WordlistOptions, GeneratedWordlist } from '@/types/wordlist';

export class WordlistGenerator {
  private commonPasswords = [
    'password', 'admin', 'user', 'login', 'welcome', 'qwerty', 'asdf',
    'master', 'root', 'guest', 'test', 'secret', 'access', 'security'
  ];

  private years = ['2020', '2021', '2022', '2023', '2024', '2025'];
  private specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '?', '~'];
  private numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '01', '02', '03', '10', '11', '12', '99', '123', '321'];
  
  private seasons = ['spring', 'summer', 'autumn', 'winter', 'fall'];
  private colors = ['red', 'blue', 'green', 'yellow', 'black', 'white', 'purple', 'orange', 'pink', 'brown'];
  private keyboardPatterns = ['qwerty', 'asdf', 'zxcv', '1234', '4321', 'abcd', 'xyz'];

  private leetMap: { [key: string]: string } = {
    'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5', 't': '7', 'l': '1', 'g': '9', 'z': '2'
  };

  generateWordlist(
    personalInfo: PersonalInfo,
    socialMedia: SocialMediaInfo,
    reconInfo: ReconInfo,
    options: WordlistOptions
  ): GeneratedWordlist {
    const baseWords = this.extractBaseWords(personalInfo, socialMedia, reconInfo);
    const passwords = new Set<string>();

    // Generate basic combinations
    this.generateBasicCombinations(baseWords, passwords, options);

    // Generate date combinations
    if (options.includeDates) {
      this.generateDateCombinations(personalInfo, baseWords, passwords, options);
    }

    // Generate leet speak variations
    if (options.includeLeetSpeak) {
      this.generateLeetVariations(Array.from(passwords), passwords, options);
    }

    // Generate reversed words
    if (options.includeReversed) {
      this.generateReversedWords(baseWords, passwords, options);
    }

    // Add common passwords with personal info
    if (options.includeCommonPasswords) {
      this.addCommonPasswordVariations(baseWords, passwords, options);
    }

    // Add keyboard patterns
    if (options.includeKeyboardPatterns) {
      this.addKeyboardPatterns(passwords, options);
    }

    // Add brand names and other common elements
    if (options.includeBrandNames) {
      this.addBrandNameCombinations(baseWords, passwords, options);
    }

    // Filter by length
    const filteredPasswords = Array.from(passwords).filter(
      password => password.length >= options.minLength && password.length <= options.maxLength
    );

    return {
      passwords: filteredPasswords.sort(),
      count: filteredPasswords.length,
      generatedAt: new Date(),
      targetProfile: personalInfo,
      options
    };
  }

  private extractBaseWords(
    personalInfo: PersonalInfo,
    socialMedia: SocialMediaInfo,
    reconInfo: ReconInfo
  ): string[] {
    const words = new Set<string>();

    // Personal information
    this.addIfNotEmpty(words, personalInfo.firstName?.toLowerCase());
    this.addIfNotEmpty(words, personalInfo.lastName?.toLowerCase());
    this.addIfNotEmpty(words, personalInfo.nickname?.toLowerCase());
    this.addIfNotEmpty(words, personalInfo.partnerName?.toLowerCase());
    this.addIfNotEmpty(words, personalInfo.partnerNickname?.toLowerCase());
    this.addIfNotEmpty(words, personalInfo.childName?.toLowerCase());
    this.addIfNotEmpty(words, personalInfo.childNickname?.toLowerCase());
    this.addIfNotEmpty(words, personalInfo.petName?.toLowerCase());
    this.addIfNotEmpty(words, personalInfo.companyName?.toLowerCase());

    // Capitalize versions
    this.addIfNotEmpty(words, this.capitalize(personalInfo.firstName));
    this.addIfNotEmpty(words, this.capitalize(personalInfo.lastName));
    this.addIfNotEmpty(words, this.capitalize(personalInfo.nickname));
    this.addIfNotEmpty(words, this.capitalize(personalInfo.partnerName));
    this.addIfNotEmpty(words, this.capitalize(personalInfo.childName));
    this.addIfNotEmpty(words, this.capitalize(personalInfo.petName));
    this.addIfNotEmpty(words, this.capitalize(personalInfo.companyName));

    // Keywords
    personalInfo.keywords?.forEach(keyword => {
      this.addIfNotEmpty(words, keyword?.toLowerCase());
      this.addIfNotEmpty(words, this.capitalize(keyword));
    });

    // Social media usernames (extract username from URLs)
    Object.values(socialMedia).forEach(profile => {
      if (profile) {
        const username = this.extractUsername(profile);
        this.addIfNotEmpty(words, username?.toLowerCase());
        this.addIfNotEmpty(words, this.capitalize(username));
      }
    });

    // Recon information
    reconInfo.hobbies?.forEach(hobby => {
      this.addIfNotEmpty(words, hobby?.toLowerCase());
      this.addIfNotEmpty(words, this.capitalize(hobby));
    });

    reconInfo.favoriteTeams?.forEach(team => {
      this.addIfNotEmpty(words, team?.toLowerCase());
      this.addIfNotEmpty(words, this.capitalize(team));
    });

    reconInfo.favoriteMovies?.forEach(movie => {
      this.addIfNotEmpty(words, movie?.toLowerCase());
      this.addIfNotEmpty(words, this.capitalize(movie));
    });

    // Add seasons and colors
    this.seasons.forEach(season => words.add(season));
    this.colors.forEach(color => words.add(color));

    return Array.from(words).filter(word => word && word.length > 0);
  }

  private addIfNotEmpty(set: Set<string>, value: string | undefined): void {
    if (value && value.trim()) {
      set.add(value.trim());
    }
  }

  private capitalize(str: string | undefined): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  private extractUsername(profile: string): string {
    if (!profile) return '';
    
    // Handle various social media URL formats
    const patterns = [
      /(?:instagram\.com|facebook\.com|twitter\.com|linkedin\.com|github\.com|tiktok\.com|youtube\.com|reddit\.com)\/(?:@)?([^\/\?]+)/,
      /^@?([a-zA-Z0-9_.-]+)$/
    ];

    for (const pattern of patterns) {
      const match = profile.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return profile;
  }

  private generateBasicCombinations(
    baseWords: string[],
    passwords: Set<string>,
    options: WordlistOptions
  ): void {
    baseWords.forEach(word => {
      passwords.add(word);

      if (options.includeNumbers) {
        this.numbers.forEach(num => {
          passwords.add(word + num);
          passwords.add(num + word);
        });
      }

      if (options.includeSpecialChars) {
        this.specialChars.forEach(char => {
          passwords.add(word + char);
          passwords.add(char + word);
        });
      }

      if (options.includeCombinations && baseWords.length > 1) {
        baseWords.forEach(otherWord => {
          if (word !== otherWord) {
            passwords.add(word + otherWord);
            passwords.add(word + '_' + otherWord);
            passwords.add(word + '.' + otherWord);
          }
        });
      }
    });
  }

  private generateDateCombinations(
    personalInfo: PersonalInfo,
    baseWords: string[],
    passwords: Set<string>,
    options: WordlistOptions
  ): void {
    const dates = [personalInfo.birthDate, personalInfo.partnerBirthDate, personalInfo.childBirthDate]
      .filter(date => date && date.length === 8);

    dates.forEach(dateStr => {
      const year = dateStr.slice(-4);
      const month = dateStr.slice(2, 4);
      const day = dateStr.slice(0, 2);
      const shortYear = dateStr.slice(-2);

      const dateVariations = [year, month, day, shortYear, month + day, day + month];

      baseWords.forEach(word => {
        dateVariations.forEach(dateVar => {
          passwords.add(word + dateVar);
          passwords.add(dateVar + word);
          passwords.add(word + '_' + dateVar);
        });
      });
    });

    // Add years separately
    this.years.forEach(year => {
      baseWords.forEach(word => {
        passwords.add(word + year);
        passwords.add(year + word);
      });
    });
  }

  private generateLeetVariations(
    currentPasswords: string[],
    passwords: Set<string>,
    options: WordlistOptions
  ): void {
    currentPasswords.forEach(password => {
      const leetPassword = this.toLeetSpeak(password);
      if (leetPassword !== password) {
        passwords.add(leetPassword);
      }
    });
  }

  private toLeetSpeak(text: string): string {
    return text.split('').map(char => this.leetMap[char.toLowerCase()] || char).join('');
  }

  private generateReversedWords(
    baseWords: string[],
    passwords: Set<string>,
    options: WordlistOptions
  ): void {
    baseWords.forEach(word => {
      const reversed = word.split('').reverse().join('');
      passwords.add(reversed);
      
      if (options.includeNumbers) {
        this.numbers.forEach(num => {
          passwords.add(reversed + num);
        });
      }
    });
  }

  private addCommonPasswordVariations(
    baseWords: string[],
    passwords: Set<string>,
    options: WordlistOptions
  ): void {
    this.commonPasswords.forEach(common => {
      passwords.add(common);
      
      baseWords.slice(0, 5).forEach(word => { // Limit to prevent explosion
        passwords.add(common + word);
        passwords.add(word + common);
        passwords.add(common + '_' + word);
      });
    });
  }

  private addKeyboardPatterns(passwords: Set<string>, options: WordlistOptions): void {
    this.keyboardPatterns.forEach(pattern => {
      passwords.add(pattern);
      
      if (options.includeNumbers) {
        this.numbers.slice(0, 5).forEach(num => {
          passwords.add(pattern + num);
        });
      }
    });
  }

  private addBrandNameCombinations(
    baseWords: string[],
    passwords: Set<string>,
    options: WordlistOptions
  ): void {
    const brands = ['apple', 'google', 'microsoft', 'facebook', 'amazon', 'netflix', 'spotify'];
    
    brands.forEach(brand => {
      passwords.add(brand);
      
      baseWords.slice(0, 3).forEach(word => { // Limit combinations
        passwords.add(brand + word);
        passwords.add(word + brand);
      });
    });
  }
}