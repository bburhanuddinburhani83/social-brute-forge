"""
Advanced wordlist generation engine
"""

import re
from typing import Dict, List, Set
from datetime import datetime
import click

class WordlistGenerator:
    """Advanced password wordlist generator"""
    
    def __init__(self, verbose: bool = False):
        self.verbose = verbose
        
        # Base data
        self.common_passwords = [
            'password', 'admin', 'user', 'login', 'welcome', 'qwerty', 'asdf',
            'master', 'root', 'guest', 'test', 'secret', 'access', 'security',
            'password123', 'admin123', 'letmein', 'monkey', 'dragon', 'sunshine'
        ]
        
        self.years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026']
        self.special_chars = ['!', '@', '#', '$', '%', '^', '&', '*', '?', '~', '!']
        self.numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '01', '02', '03', '10', '11', '12', '99', '123', '321', '1234']
        
        self.seasons = ['spring', 'summer', 'autumn', 'winter', 'fall']
        self.colors = ['red', 'blue', 'green', 'yellow', 'black', 'white', 'purple', 'orange', 'pink', 'brown', 'grey', 'silver', 'gold']
        self.keyboard_patterns = ['qwerty', 'asdf', 'zxcv', '1234', '4321', 'abcd', 'xyz', 'qwe', 'asd', 'zxc']
        self.brands = ['apple', 'google', 'microsoft', 'facebook', 'amazon', 'netflix', 'spotify', 'tesla', 'nike', 'samsung']
        
        # Leet speak mapping
        self.leet_map = {
            'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5', 't': '7', 'l': '1', 'g': '9', 'z': '2'
        }
    
    def generate(self, personal_info: Dict, social_media: Dict, recon_info: Dict, options: Dict) -> Dict:
        """Generate comprehensive wordlist based on target intelligence"""
        
        if self.verbose:
            click.echo("🔍 Extracting base words...")
        
        base_words = self._extract_base_words(personal_info, social_media, recon_info)
        passwords = set()
        
        if self.verbose:
            click.echo(f"📝 Found {len(base_words)} base words")
            click.echo("⚙️  Applying generation patterns...")
        
        # Generation phases
        self._generate_basic_combinations(base_words, passwords, options)
        
        if options.get('include_dates', True):
            self._generate_date_combinations(personal_info, base_words, passwords, options)
        
        if options.get('include_leet_speak', True):
            self._generate_leet_variations(list(passwords), passwords, options)
        
        if options.get('include_reversed', True):
            self._generate_reversed_words(base_words, passwords, options)
        
        if options.get('include_common_passwords', True):
            self._add_common_password_variations(base_words, passwords, options)
        
        if options.get('include_keyboard_patterns', True):
            self._add_keyboard_patterns(passwords, options)
        
        if options.get('include_brand_names', True):
            self._add_brand_combinations(base_words, passwords, options)
        
        # Filter by length
        min_len = options.get('min_length', 4)
        max_len = options.get('max_length', 25)
        
        filtered_passwords = [
            pwd for pwd in passwords 
            if min_len <= len(pwd) <= max_len
        ]
        
        if self.verbose:
            click.echo(f"🔧 Filtered to {len(filtered_passwords)} passwords within length range ({min_len}-{max_len})")
        
        return {
            'passwords': sorted(filtered_passwords),
            'count': len(filtered_passwords),
            'generated_at': datetime.now(),
            'target_profile': personal_info,
            'options': options,
            'base_words_count': len(base_words),
            'total_before_filter': len(passwords)
        }
    
    def _extract_base_words(self, personal_info: Dict, social_media: Dict, recon_info: Dict) -> List[str]:
        """Extract all possible base words from collected intelligence"""
        words = set()
        
        # Personal information
        self._add_if_not_empty(words, personal_info.get('first_name', '').lower())
        self._add_if_not_empty(words, personal_info.get('last_name', '').lower())
        self._add_if_not_empty(words, personal_info.get('nickname', '').lower())
        self._add_if_not_empty(words, personal_info.get('partner_name', '').lower())
        self._add_if_not_empty(words, personal_info.get('partner_nickname', '').lower())
        self._add_if_not_empty(words, personal_info.get('child_name', '').lower())
        self._add_if_not_empty(words, personal_info.get('child_nickname', '').lower())
        self._add_if_not_empty(words, personal_info.get('pet_name', '').lower())
        self._add_if_not_empty(words, personal_info.get('company_name', '').lower())
        
        # Capitalized versions
        self._add_if_not_empty(words, self._capitalize(personal_info.get('first_name', '')))
        self._add_if_not_empty(words, self._capitalize(personal_info.get('last_name', '')))
        self._add_if_not_empty(words, self._capitalize(personal_info.get('nickname', '')))
        self._add_if_not_empty(words, self._capitalize(personal_info.get('partner_name', '')))
        self._add_if_not_empty(words, self._capitalize(personal_info.get('child_name', '')))
        self._add_if_not_empty(words, self._capitalize(personal_info.get('pet_name', '')))
        self._add_if_not_empty(words, self._capitalize(personal_info.get('company_name', '')))
        
        # Keywords
        for keyword in personal_info.get('keywords', []):
            self._add_if_not_empty(words, keyword.lower())
            self._add_if_not_empty(words, self._capitalize(keyword))
        
        # Social media usernames
        for platform, profile in social_media.items():
            if profile:
                username = self._extract_username(profile)
                self._add_if_not_empty(words, username.lower())
                self._add_if_not_empty(words, self._capitalize(username))
        
        # Recon information
        for hobby in recon_info.get('hobbies', []):
            self._add_if_not_empty(words, hobby.lower())
            self._add_if_not_empty(words, self._capitalize(hobby))
        
        for team in recon_info.get('favorite_teams', []):
            self._add_if_not_empty(words, team.lower())
            self._add_if_not_empty(words, self._capitalize(team))
        
        for movie in recon_info.get('favorite_movies', []):
            self._add_if_not_empty(words, movie.lower())
            self._add_if_not_empty(words, self._capitalize(movie))
        
        for book in recon_info.get('favorite_books', []):
            self._add_if_not_empty(words, book.lower())
            self._add_if_not_empty(words, self._capitalize(book))
        
        for game in recon_info.get('favorite_games', []):
            self._add_if_not_empty(words, game.lower())
            self._add_if_not_empty(words, self._capitalize(game))
        
        # Add seasons and colors
        words.update(self.seasons)
        words.update(self.colors)
        
        return [word for word in words if word and len(word) > 0]
    
    def _add_if_not_empty(self, word_set: Set[str], value: str) -> None:
        """Add word to set if not empty"""
        if value and value.strip():
            word_set.add(value.strip())
    
    def _capitalize(self, text: str) -> str:
        """Capitalize first letter"""
        if not text:
            return ''
        return text[0].upper() + text[1:].lower()
    
    def _extract_username(self, profile: str) -> str:
        """Extract username from social media URL or handle"""
        if not profile:
            return ''
        
        patterns = [
            r'(?:instagram\.com|facebook\.com|twitter\.com|linkedin\.com|github\.com|tiktok\.com|youtube\.com|reddit\.com)/(?:@)?([^/\?]+)',
            r'^@?([a-zA-Z0-9_.-]+)$'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, profile)
            if match:
                return match.group(1)
        
        return profile
    
    def _generate_basic_combinations(self, base_words: List[str], passwords: Set[str], options: Dict) -> None:
        """Generate basic word combinations"""
        for word in base_words:
            passwords.add(word)
            
            if options.get('include_numbers', True):
                for num in self.numbers:
                    passwords.add(word + num)
                    passwords.add(num + word)
            
            if options.get('include_special_chars', True):
                for char in self.special_chars:
                    passwords.add(word + char)
                    passwords.add(char + word)
            
            if options.get('include_combinations', True) and len(base_words) > 1:
                for other_word in base_words:
                    if word != other_word:
                        passwords.add(word + other_word)
                        passwords.add(word + '_' + other_word)
                        passwords.add(word + '.' + other_word)
    
    def _generate_date_combinations(self, personal_info: Dict, base_words: List[str], passwords: Set[str], options: Dict) -> None:
        """Generate date-based combinations"""
        dates = [
            personal_info.get('birth_date', ''),
            personal_info.get('partner_birth_date', ''),
            personal_info.get('child_birth_date', '')
        ]
        dates = [date for date in dates if date and len(date) == 8]
        
        for date_str in dates:
            year = date_str[-4:]
            month = date_str[2:4]
            day = date_str[:2]
            short_year = date_str[-2:]
            
            date_variations = [year, month, day, short_year, month + day, day + month]
            
            for word in base_words:
                for date_var in date_variations:
                    passwords.add(word + date_var)
                    passwords.add(date_var + word)
                    passwords.add(word + '_' + date_var)
        
        # Add years separately
        for year in self.years:
            for word in base_words:
                passwords.add(word + year)
                passwords.add(year + word)
    
    def _generate_leet_variations(self, current_passwords: List[str], passwords: Set[str], options: Dict) -> None:
        """Generate leet speak variations"""
        for password in current_passwords:
            leet_password = self._to_leet_speak(password)
            if leet_password != password:
                passwords.add(leet_password)
    
    def _to_leet_speak(self, text: str) -> str:
        """Convert text to leet speak"""
        return ''.join(self.leet_map.get(char.lower(), char) for char in text)
    
    def _generate_reversed_words(self, base_words: List[str], passwords: Set[str], options: Dict) -> None:
        """Generate reversed word variations"""
        for word in base_words:
            reversed_word = word[::-1]
            passwords.add(reversed_word)
            
            if options.get('include_numbers', True):
                for num in self.numbers[:5]:  # Limit to prevent explosion
                    passwords.add(reversed_word + num)
    
    def _add_common_password_variations(self, base_words: List[str], passwords: Set[str], options: Dict) -> None:
        """Add common password variations"""
        for common in self.common_passwords:
            passwords.add(common)
            
            for word in base_words[:5]:  # Limit combinations
                passwords.add(common + word)
                passwords.add(word + common)
                passwords.add(common + '_' + word)
    
    def _add_keyboard_patterns(self, passwords: Set[str], options: Dict) -> None:
        """Add keyboard pattern variations"""
        for pattern in self.keyboard_patterns:
            passwords.add(pattern)
            
            if options.get('include_numbers', True):
                for num in self.numbers[:5]:
                    passwords.add(pattern + num)
    
    def _add_brand_combinations(self, base_words: List[str], passwords: Set[str], options: Dict) -> None:
        """Add brand name combinations"""
        for brand in self.brands:
            passwords.add(brand)
            
            for word in base_words[:3]:  # Limit combinations
                passwords.add(brand + word)
                passwords.add(word + brand)