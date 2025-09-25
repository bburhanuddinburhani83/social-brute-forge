#!/usr/bin/env python3
"""
CyberWordlist Pro - Advanced Password Dictionary Generator
A comprehensive CLI tool for generating custom wordlists for authorized penetration testing.

Author: CyberWordlist Team
License: MIT
"""

import click
import json
import os
import sys
from typing import Dict, List, Optional
from datetime import datetime
from modules.questionnaire import DataCollector
from modules.generator import WordlistGenerator
from modules.output import OutputManager
from modules.utils import display_banner, validate_length, sanitize_filename

__version__ = "1.0.0"

@click.command()
@click.option('--config', '-c', type=click.Path(exists=True), help='Load configuration from JSON file')
@click.option('--output', '-o', default='wordlist.txt', help='Output filename (default: wordlist.txt)')
@click.option('--format', '-f', type=click.Choice(['txt', 'csv', 'json']), default='txt', help='Output format')
@click.option('--min-length', type=int, default=4, help='Minimum password length (default: 4)')
@click.option('--max-length', type=int, default=25, help='Maximum password length (default: 25)')
@click.option('--quiet', '-q', is_flag=True, help='Quiet mode - minimal output')
@click.option('--verbose', '-v', is_flag=True, help='Verbose mode - detailed output')
@click.option('--preview', '-p', is_flag=True, help='Preview mode - show sample passwords only')
@click.option('--batch', is_flag=True, help='Batch mode - no interactive prompts')
@click.version_option(version=__version__)
def main(config, output, format, min_length, max_length, quiet, verbose, preview, batch):
    """
    CyberWordlist Pro - Advanced Password Dictionary Generator
    
    Generate custom wordlists based on target intelligence for authorized security testing.
    
    Examples:
        cyberwordlist.py                          # Interactive mode
        cyberwordlist.py --config target.json     # Batch mode with config
        cyberwordlist.py --preview -v             # Preview with verbose output
        cyberwordlist.py -o custom.txt --format csv --min-length 8
    """
    
    # Display banner unless in quiet mode
    if not quiet:
        display_banner(__version__)
    
    # Validate parameters
    if not validate_length(min_length, max_length):
        click.echo("❌ Error: Minimum length cannot be greater than maximum length", err=True)
        sys.exit(1)
    
    # Sanitize output filename
    output = sanitize_filename(output)
    
    try:
        # Initialize components
        collector = DataCollector(quiet=quiet, verbose=verbose)
        generator = WordlistGenerator(verbose=verbose)
        output_manager = OutputManager(format=format, verbose=verbose)
        
        # Load data
        if config:
            if verbose:
                click.echo(f"📁 Loading configuration from {config}")
            data = load_config(config)
        elif batch:
            click.echo("❌ Error: Batch mode requires --config parameter", err=True)
            sys.exit(1)
        else:
            # Interactive data collection
            data = collector.collect_all_data()
        
        # Set generation options
        data['options'].update({
            'min_length': min_length,
            'max_length': max_length
        })
        
        # Generate wordlist
        if verbose:
            click.echo("🔄 Generating wordlist...")
        
        result = generator.generate(
            personal_info=data['personal_info'],
            social_media=data['social_media'],
            recon_info=data['recon_info'],
            options=data['options']
        )
        
        # Output results
        if preview:
            output_manager.preview_results(result, limit=20)
        else:
            output_manager.save_results(result, output)
            if not quiet:
                click.echo(f"✅ Wordlist generated successfully!")
                click.echo(f"📊 Total passwords: {result['count']:,}")
                click.echo(f"💾 Saved to: {output}")
        
        # Display statistics
        if verbose and not preview:
            output_manager.display_statistics(result)
            
    except KeyboardInterrupt:
        click.echo("\n\n❌ Operation cancelled by user")
        sys.exit(1)
    except Exception as e:
        click.echo(f"❌ Error: {str(e)}", err=True)
        if verbose:
            import traceback
            traceback.print_exc()
        sys.exit(1)

def load_config(config_path: str) -> Dict:
    """Load configuration from JSON file"""
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        raise click.ClickException(f"Invalid JSON in config file: {e}")
    except Exception as e:
        raise click.ClickException(f"Could not load config file: {e}")

if __name__ == '__main__':
    main()