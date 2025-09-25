export interface PersonalInfo {
  firstName: string;
  lastName: string;
  nickname: string;
  birthDate: string;
  
  // Partner information
  partnerName: string;
  partnerNickname: string;
  partnerBirthDate: string;
  
  // Children
  childName: string;
  childNickname: string;
  childBirthDate: string;
  
  // Other personal info
  petName: string;
  companyName: string;
  
  // Additional keywords
  keywords: string[];
}

export interface SocialMediaInfo {
  instagram: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  github: string;
  tiktok: string;
  youtube: string;
  reddit: string;
  discord: string;
  telegram: string;
}

export interface ReconInfo {
  email: string;
  phoneNumber: string;
  address: string;
  university: string;
  hobbies: string[];
  favoriteTeams: string[];
  favoriteMovies: string[];
  favoriteBooks: string[];
  favoriteGames: string[];
}

export interface WordlistOptions {
  includeSpecialChars: boolean;
  includeNumbers: boolean;
  includeLeetSpeak: boolean;
  includeDates: boolean;
  includeReversed: boolean;
  includeCombinations: boolean;
  minLength: number;
  maxLength: number;
  
  // Advanced options
  includeCommonPasswords: boolean;
  includeKeyboardPatterns: boolean;
  includeBrandNames: boolean;
  includeSeasons: boolean;
  includeColors: boolean;
  includePhrases: boolean;
}

export interface GeneratedWordlist {
  passwords: string[];
  count: number;
  generatedAt: Date;
  targetProfile: PersonalInfo;
  options: WordlistOptions;
}
