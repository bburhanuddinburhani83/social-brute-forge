# CyberWordlist Pro 🎯

An advanced password dictionary generator for authorized penetration testing and security assessments.

## ⚠️ LEGAL DISCLAIMER

**This tool is for authorized security testing only!** 

- Only use against systems you own or have explicit written permission to test
- Unauthorized access to computer systems is illegal in most jurisdictions
- Users are solely responsible for compliance with applicable laws
- The authors assume no liability for misuse of this tool

## 🚀 Features

### Advanced Intelligence Gathering
- **Personal Information**: Names, dates, family details, company info
- **Social Media Intelligence**: Extract usernames from 10+ platforms
- **Advanced Reconnaissance**: Hobbies, interests, favorites, education
- **Custom Keywords**: Add target-specific terms

### Smart Generation Patterns
- **Basic Combinations**: Words + numbers, special characters
- **Date Intelligence**: Birth dates, anniversaries, years
- **Leet Speak**: Convert letters to numbers (a→4, e→3, etc.)
- **Reversed Words**: Generate backwards variations
- **Keyboard Patterns**: Common typing patterns
- **Brand Integration**: Popular brand names
- **Common Passwords**: Dictionary attacks with personal info

### Professional Output Options
- **Multiple Formats**: TXT, CSV, JSON export
- **Length Filtering**: Customizable min/max password length
- **Statistics**: Detailed generation reports
- **Preview Mode**: Sample passwords before full generation
- **Batch Processing**: JSON configuration files

## 📦 Installation

### Prerequisites
- Python 3.7 or higher
- pip package manager

### Quick Install
```bash
# Clone the repository
git clone https://github.com/yourusername/cyberwordlist-pro.git
cd cyberwordlist-pro

# Install dependencies
pip install -r requirements.txt

# Make executable (Linux/Mac)
chmod +x cyberwordlist.py
```

### Windows Users
```cmd
# Clone and install
git clone https://github.com/yourusername/cyberwordlist-pro.git
cd cyberwordlist-pro
pip install -r requirements.txt

# Run directly
python cyberwordlist.py
```

## 🎮 Usage

### Interactive Mode (Recommended)
```bash
python cyberwordlist.py
```
Follow the interactive prompts to gather target intelligence.

### Quick Generation
```bash
# Basic wordlist with custom length
python cyberwordlist.py --output custom.txt --min-length 8 --max-length 16

# Preview mode - see samples without generating full list
python cyberwordlist.py --preview --verbose

# Different output formats
python cyberwordlist.py --format csv --output results.csv
python cyberwordlist.py --format json --output data.json
```

### Batch Processing
```bash
# Create configuration file (see examples/sample_config.json)
python cyberwordlist.py --config target_profile.json --output wordlist.txt
```

### Advanced Options
```bash
# Quiet mode for scripting
python cyberwordlist.py --quiet --config profile.json

# Verbose output for debugging
python cyberwordlist.py --verbose --preview

# Custom length ranges
python cyberwordlist.py --min-length 6 --max-length 20
```

## 📋 Command Line Options

| Option | Description | Default |
|--------|-------------|---------|
| `--config`, `-c` | Load JSON configuration file | Interactive mode |
| `--output`, `-o` | Output filename | `wordlist.txt` |
| `--format`, `-f` | Output format (txt/csv/json) | `txt` |
| `--min-length` | Minimum password length | `4` |
| `--max-length` | Maximum password length | `25` |
| `--quiet`, `-q` | Minimal output for scripting | `False` |
| `--verbose`, `-v` | Detailed progress information | `False` |
| `--preview`, `-p` | Show samples without full generation | `False` |
| `--batch` | Batch mode (requires --config) | `False` |
| `--help` | Show help message | - |
| `--version` | Show version information | - |

## 📁 Configuration Files

Create JSON files for batch processing:

```json
{
  "personal_info": {
    "first_name": "john",
    "last_name": "doe",
    "nickname": "johnny",
    "birth_date": "15061990",
    "company_name": "techcorp",
    "keywords": ["security", "hacker"]
  },
  "social_media": {
    "instagram": "john_doe_90",
    "twitter": "johndoe",
    "linkedin": "john-doe-security"
  },
  "recon_info": {
    "hobbies": ["gaming", "coding"],
    "favorite_teams": ["Yankees"]
  },
  "options": {
    "include_special_chars": true,
    "include_numbers": true,
    "include_leet_speak": true,
    "min_length": 8,
    "max_length": 20
  }
}
```

## 🔧 Advanced Features

### Social Media Intelligence
Automatically extracts usernames from various URL formats:
- Instagram: `instagram.com/username` → `username`
- LinkedIn: `linkedin.com/in/john-doe` → `john-doe`
- GitHub: `github.com/johndoe` → `johndoe`

### Pattern Generation
- **Date Combinations**: `name1990`, `1990name`, `name_1990`
- **Leet Speak**: `john` → `j0hn`, `admin` → `4dm1n`
- **Reversals**: `password` → `drowssap`
- **Combinations**: `john` + `doe` → `johndoe`, `john_doe`

### Export Formats

#### Text (Default)
```
password123
admin2023
john1990
johndoe
...
```

#### CSV
```csv
password,length,category
password123,11,alphanumeric
admin2023,9,alphanumeric
johndoe,7,alphabetic
```

#### JSON
```json
{
  "passwords": ["password123", "admin2023"],
  "count": 1250,
  "generated_at": "2024-01-15T10:30:00",
  "statistics": {
    "base_words_count": 15,
    "total_before_filter": 2847
  }
}
```

## 🎯 Best Practices

### Information Gathering
1. **Be Thorough**: More information = better wordlists
2. **Social Media**: Check all platforms, not just major ones
3. **Variations**: Include nicknames, shortened names, variations
4. **Dates**: Important dates beyond just birthdays

### Generation Options
1. **Length Filtering**: Match target password policies
2. **Pattern Selection**: Enable relevant patterns for target
3. **Preview First**: Use `--preview` to verify quality

### Security Testing
1. **Test Systematically**: Start with most likely passwords
2. **Combine Techniques**: Use with other password attacks
3. **Document Results**: Keep records of successful patterns

## 📊 Performance

### Generation Speed
- **Small targets** (<10 base words): < 1 second
- **Medium targets** (10-30 words): 1-10 seconds  
- **Large targets** (30+ words): 10-60 seconds

### Memory Usage
- **Typical wordlist** (1K-10K passwords): < 50MB RAM
- **Large wordlist** (100K+ passwords): 100-500MB RAM

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup
```bash
git clone https://github.com/yourusername/cyberwordlist-pro.git
cd cyberwordlist-pro

# Install development dependencies
pip install -r requirements-dev.txt

# Run tests
python -m pytest tests/
```

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Related Tools

- **CUPP**: The classic wordlist generator that inspired this tool
- **Hashcat**: Use generated wordlists with hashcat for password cracking
- **John the Ripper**: Another password cracker that works with custom wordlists
- **Mentalist**: GUI-based wordlist generator

## ⭐ Acknowledgments

- Inspired by the original CUPP tool by Mebus
- Thanks to the cybersecurity community for feedback and suggestions
- Built with modern Python practices for better maintainability

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/cyberwordlist-pro/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/cyberwordlist-pro/discussions)
- **Security**: For security-related issues, please email security@yourproject.com

---

**Remember: With great power comes great responsibility. Use this tool ethically and legally.**