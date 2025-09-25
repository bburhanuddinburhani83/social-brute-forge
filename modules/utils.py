"""
Utility functions and helpers
"""

import click
import re
import os

def display_banner(version: str) -> None:
    """Display application banner"""
    banner = f"""
╔══════════════════════════════════════════════════════════════╗
║                    CyberWordlist Pro v{version}                    ║
║              Advanced Password Dictionary Generator          ║
║                                                              ║
║        🎯 Target Intelligence • 🔧 Smart Generation          ║
║        📱 Social Media Intel • 🔍 Advanced Patterns         ║
╚══════════════════════════════════════════════════════════════╝

⚠️  WARNING: This tool is for authorized security testing only!
   Using this tool against systems without explicit permission 
   is illegal and unethical. Always ensure proper authorization.

"""
    click.echo(click.style(banner, fg='cyan', bold=True))

def validate_length(min_length: int, max_length: int) -> bool:
    """Validate password length parameters"""
    if min_length < 1:
        return False
    if max_length < min_length:
        return False
    if max_length > 100:  # Reasonable upper limit
        return False
    return True

def sanitize_filename(filename: str) -> str:
    """Sanitize filename for safe file operations"""
    # Remove or replace invalid characters
    filename = re.sub(r'[<>:"/\\|?*]', '_', filename)
    
    # Remove leading/trailing spaces and dots
    filename = filename.strip(' .')
    
    # Ensure it's not empty
    if not filename:
        filename = 'wordlist'
    
    return filename

def format_number(num: int) -> str:
    """Format number with thousands separator"""
    return f"{num:,}"

def estimate_generation_time(base_words: int, options: dict) -> str:
    """Estimate wordlist generation time"""
    # Simple estimation based on options and base words
    complexity_factor = 1
    
    if options.get('include_combinations', True):
        complexity_factor *= 2
    if options.get('include_leet_speak', True):
        complexity_factor *= 1.5
    if options.get('include_dates', True):
        complexity_factor *= 1.3
    
    estimated_passwords = base_words * complexity_factor * 10
    
    if estimated_passwords < 1000:
        return "< 1 second"
    elif estimated_passwords < 10000:
        return "1-5 seconds"
    elif estimated_passwords < 100000:
        return "5-30 seconds"
    else:
        return "30+ seconds"

def validate_date_format(date_str: str) -> bool:
    """Validate date string format (DDMMYYYY)"""
    if not re.match(r'^\d{8}$', date_str):
        return False
    
    try:
        day, month, year = int(date_str[:2]), int(date_str[2:4]), int(date_str[4:])
        
        if not (1 <= day <= 31):
            return False
        if not (1 <= month <= 12):
            return False
        if not (1900 <= year <= 2030):
            return False
        
        return True
    except ValueError:
        return False

def create_sample_config() -> dict:
    """Create a sample configuration for batch mode"""
    return {
        "personal_info": {
            "first_name": "john",
            "last_name": "doe",
            "nickname": "johnny",
            "birth_date": "15061990",
            "partner_name": "jane",
            "partner_nickname": "",
            "partner_birth_date": "",
            "child_name": "",
            "child_nickname": "",
            "child_birth_date": "",
            "pet_name": "buddy",
            "company_name": "techcorp",
            "keywords": ["hacker", "security", "crypto"]
        },
        "social_media": {
            "instagram": "john_doe_90",
            "facebook": "john.doe.90",
            "twitter": "johndoe",
            "linkedin": "john-doe-security",
            "github": "johndoe90",
            "tiktok": "",
            "youtube": "",
            "reddit": "johnny90",
            "discord": "johndoe#1234",
            "telegram": "johndoe90"
        },
        "recon_info": {
            "email": "john.doe@email.com",
            "phone_number": "+1234567890",
            "address": "New York",
            "university": "MIT",
            "hobbies": ["gaming", "coding", "cybersecurity"],
            "favorite_teams": ["Yankees", "Lakers"],
            "favorite_movies": ["Matrix", "Hackers"],
            "favorite_books": ["1984", "Neuromancer"],
            "favorite_games": ["Counter-Strike", "Minecraft"]
        },
        "options": {
            "include_special_chars": True,
            "include_numbers": True,
            "include_leet_speak": True,
            "include_dates": True,
            "include_reversed": True,
            "include_combinations": True,
            "include_common_passwords": True,
            "include_keyboard_patterns": True,
            "include_brand_names": True,
            "include_seasons": True,
            "include_colors": True,
            "include_phrases": False,
            "min_length": 4,
            "max_length": 25
        }
    }