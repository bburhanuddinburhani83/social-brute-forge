"""
Interactive questionnaire module for data collection
"""

import click
from typing import Dict, List, Optional
import re
from datetime import datetime

class DataCollector:
    """Handles interactive data collection from user"""
    
    def __init__(self, quiet: bool = False, verbose: bool = False):
        self.quiet = quiet
        self.verbose = verbose
        
    def collect_all_data(self) -> Dict:
        """Collect all target information through interactive prompts"""
        if not self.quiet:
            click.echo("🎯 " + click.style("Target Intelligence Gathering", bold=True, fg='cyan'))
            click.echo("📝 Please provide information about your target (press Enter to skip optional fields)\n")
        
        data = {
            'personal_info': self._collect_personal_info(),
            'social_media': self._collect_social_media(),
            'recon_info': self._collect_recon_info(),
            'options': self._collect_options()
        }
        
        if not self.quiet:
            click.echo("\n✅ Data collection complete!")
        
        return data
    
    def _collect_personal_info(self) -> Dict:
        """Collect personal information"""
        if not self.quiet:
            click.echo(click.style("👤 Personal Information", bold=True, fg='yellow'))
        
        info = {}
        
        # Primary target info
        info['first_name'] = self._prompt("First name", required=True)
        info['last_name'] = self._prompt("Last name")
        info['nickname'] = self._prompt("Nickname/Username")
        info['birth_date'] = self._prompt_date("Birth date (DDMMYYYY)")
        
        # Partner info
        if click.confirm("Does the target have a partner/spouse?", default=False):
            info['partner_name'] = self._prompt("Partner's name")
            info['partner_nickname'] = self._prompt("Partner's nickname")
            info['partner_birth_date'] = self._prompt_date("Partner's birth date (DDMMYYYY)")
        else:
            info['partner_name'] = ""
            info['partner_nickname'] = ""
            info['partner_birth_date'] = ""
        
        # Children info
        if click.confirm("Does the target have children?", default=False):
            info['child_name'] = self._prompt("Child's name")
            info['child_nickname'] = self._prompt("Child's nickname")
            info['child_birth_date'] = self._prompt_date("Child's birth date (DDMMYYYY)")
        else:
            info['child_name'] = ""
            info['child_nickname'] = ""
            info['child_birth_date'] = ""
        
        # Other info
        info['pet_name'] = self._prompt("Pet name")
        info['company_name'] = self._prompt("Company name")
        
        # Keywords
        keywords_input = self._prompt("Additional keywords (comma-separated)")
        info['keywords'] = [k.strip() for k in keywords_input.split(',') if k.strip()] if keywords_input else []
        
        return info
    
    def _collect_social_media(self) -> Dict:
        """Collect social media information"""
        if not self.quiet:
            click.echo(f"\n{click.style('📱 Social Media Intelligence', bold=True, fg='magenta')}")
        
        platforms = {
            'instagram': 'Instagram profile/username',
            'facebook': 'Facebook profile/username',
            'twitter': 'Twitter/X handle',
            'linkedin': 'LinkedIn profile',
            'github': 'GitHub username',
            'tiktok': 'TikTok username',
            'youtube': 'YouTube channel',
            'reddit': 'Reddit username',
            'discord': 'Discord username',
            'telegram': 'Telegram username'
        }
        
        social_media = {}
        for platform, description in platforms.items():
            social_media[platform] = self._prompt(description)
        
        return social_media
    
    def _collect_recon_info(self) -> Dict:
        """Collect reconnaissance information"""
        if not self.quiet:
            click.echo(f"\n{click.style('🔍 Advanced Reconnaissance', bold=True, fg='red')}")
        
        info = {}
        
        # Contact info
        info['email'] = self._prompt("Email address")
        info['phone_number'] = self._prompt("Phone number")
        info['address'] = self._prompt("Address/Location")
        info['university'] = self._prompt("University/School")
        
        # Interests and preferences
        hobbies = self._prompt("Hobbies/Interests (comma-separated)")
        info['hobbies'] = [h.strip() for h in hobbies.split(',') if h.strip()] if hobbies else []
        
        teams = self._prompt("Favorite sports teams (comma-separated)")
        info['favorite_teams'] = [t.strip() for t in teams.split(',') if t.strip()] if teams else []
        
        movies = self._prompt("Favorite movies (comma-separated)")
        info['favorite_movies'] = [m.strip() for m in movies.split(',') if m.strip()] if movies else []
        
        books = self._prompt("Favorite books (comma-separated)")
        info['favorite_books'] = [b.strip() for b in books.split(',') if b.strip()] if books else []
        
        games = self._prompt("Favorite games (comma-separated)")
        info['favorite_games'] = [g.strip() for g in games.split(',') if g.strip()] if games else []
        
        return info
    
    def _collect_options(self) -> Dict:
        """Collect wordlist generation options"""
        if not self.quiet:
            click.echo(f"\n{click.style('⚙️  Generation Options', bold=True, fg='green')}")
        
        options = {}
        
        # Basic options
        options['include_special_chars'] = click.confirm("Include special characters (!@#$%)", default=True)
        options['include_numbers'] = click.confirm("Include numbers", default=True)
        options['include_leet_speak'] = click.confirm("Include leet speak (4 for a, 3 for e)", default=True)
        options['include_dates'] = click.confirm("Include date combinations", default=True)
        options['include_reversed'] = click.confirm("Include reversed words", default=True)
        options['include_combinations'] = click.confirm("Include word combinations", default=True)
        
        # Advanced options
        if click.confirm("Configure advanced options?", default=False):
            options['include_common_passwords'] = click.confirm("Include common passwords", default=True)
            options['include_keyboard_patterns'] = click.confirm("Include keyboard patterns", default=True)
            options['include_brand_names'] = click.confirm("Include brand names", default=True)
            options['include_seasons'] = click.confirm("Include seasons", default=True)
            options['include_colors'] = click.confirm("Include colors", default=True)
            options['include_phrases'] = click.confirm("Include phrases", default=False)
        else:
            # Default advanced options
            options.update({
                'include_common_passwords': True,
                'include_keyboard_patterns': True,
                'include_brand_names': True,
                'include_seasons': True,
                'include_colors': True,
                'include_phrases': False
            })
        
        return options
    
    def _prompt(self, text: str, required: bool = False) -> str:
        """Prompt user for input with validation"""
        while True:
            value = click.prompt(f"   {text}", default="", show_default=False, type=str).strip()
            
            if required and not value:
                click.echo("   ❌ This field is required!")
                continue
                
            return value
    
    def _prompt_date(self, text: str) -> str:
        """Prompt for date input with validation"""
        while True:
            date_str = click.prompt(f"   {text}", default="", show_default=False, type=str).strip()
            
            if not date_str:
                return ""
            
            # Validate date format (DDMMYYYY)
            if re.match(r'^\d{8}$', date_str):
                try:
                    day, month, year = int(date_str[:2]), int(date_str[2:4]), int(date_str[4:])
                    datetime(year, month, day)
                    return date_str
                except ValueError:
                    pass
            
            click.echo("   ❌ Invalid date format! Use DDMMYYYY (e.g., 15061990)")