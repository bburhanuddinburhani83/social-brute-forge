"""
Output and export management module
"""

import click
import json
import csv
from typing import Dict, List
from datetime import datetime
import os

class OutputManager:
    """Handles wordlist output and export functionality"""
    
    def __init__(self, format: str = 'txt', verbose: bool = False):
        self.format = format
        self.verbose = verbose
    
    def save_results(self, result: Dict, filename: str) -> None:
        """Save wordlist results to file"""
        passwords = result['passwords']
        
        if self.format == 'txt':
            self._save_txt(passwords, filename)
        elif self.format == 'csv':
            self._save_csv(passwords, filename, result)
        elif self.format == 'json':
            self._save_json(result, filename)
        
        if self.verbose:
            click.echo(f"💾 Saved {len(passwords):,} passwords to {filename}")
    
    def preview_results(self, result: Dict, limit: int = 20) -> None:
        """Preview wordlist results"""
        passwords = result['passwords']
        total_count = len(passwords)
        
        click.echo(f"\n🔍 {click.style('Wordlist Preview', bold=True, fg='cyan')}")
        click.echo(f"📊 Total passwords: {total_count:,}")
        click.echo(f"👀 Showing first {min(limit, total_count)} passwords:\n")
        
        for i, password in enumerate(passwords[:limit], 1):
            click.echo(f"   {i:2d}. {password}")
        
        if total_count > limit:
            click.echo(f"\n   ... and {total_count - limit:,} more passwords")
        
        click.echo(f"\n⚡ Use without --preview to generate full wordlist")
    
    def display_statistics(self, result: Dict) -> None:
        """Display detailed generation statistics"""
        click.echo(f"\n📈 {click.style('Generation Statistics', bold=True, fg='green')}")
        
        # Basic stats
        click.echo(f"   Base words extracted: {result.get('base_words_count', 0):,}")
        click.echo(f"   Total combinations generated: {result.get('total_before_filter', 0):,}")
        click.echo(f"   Final passwords (after filtering): {result['count']:,}")
        
        # Length distribution
        passwords = result['passwords']
        if passwords:
            lengths = [len(p) for p in passwords]
            min_len = min(lengths)
            max_len = max(lengths)
            avg_len = sum(lengths) / len(lengths)
            
            click.echo(f"   Password length range: {min_len} - {max_len}")
            click.echo(f"   Average password length: {avg_len:.1f}")
        
        # Options used
        options = result.get('options', {})
        active_options = [k for k, v in options.items() if v and k.startswith('include_')]
        click.echo(f"   Active generation options: {len(active_options)}")
        
        click.echo(f"   Generation completed: {result['generated_at'].strftime('%Y-%m-%d %H:%M:%S')}")
    
    def _save_txt(self, passwords: List[str], filename: str) -> None:
        """Save passwords to text file"""
        # Ensure .txt extension
        if not filename.endswith('.txt'):
            filename += '.txt'
        
        with open(filename, 'w', encoding='utf-8') as f:
            for password in passwords:
                f.write(password + '\n')
    
    def _save_csv(self, passwords: List[str], filename: str, result: Dict) -> None:
        """Save passwords to CSV file with metadata"""
        # Ensure .csv extension
        if not filename.endswith('.csv'):
            filename += '.csv'
        
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            
            # Header
            writer.writerow(['password', 'length', 'category'])
            
            # Data
            for password in passwords:
                category = self._categorize_password(password)
                writer.writerow([password, len(password), category])
    
    def _save_json(self, result: Dict, filename: str) -> None:
        """Save complete results to JSON file"""
        # Ensure .json extension
        if not filename.endswith('.json'):
            filename += '.json'
        
        # Prepare data for JSON serialization
        json_result = {
            'passwords': result['passwords'],
            'count': result['count'],
            'generated_at': result['generated_at'].isoformat(),
            'target_profile': result['target_profile'],
            'options': result['options'],
            'statistics': {
                'base_words_count': result.get('base_words_count', 0),
                'total_before_filter': result.get('total_before_filter', 0)
            }
        }
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(json_result, f, indent=2, ensure_ascii=False)
    
    def _categorize_password(self, password: str) -> str:
        """Categorize password type for CSV output"""
        if any(c.isdigit() for c in password):
            if any(c in '!@#$%^&*?~' for c in password):
                return 'complex'
            return 'alphanumeric'
        elif any(c in '!@#$%^&*?~' for c in password):
            return 'alpha_special'
        else:
            return 'alphabetic'