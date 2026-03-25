#!/bin/bash

# Contai Setup Script
# One-command installation for Contai AI Growth Engine

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_step() {
    echo -e "${BLUE}==> $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed!"
        echo ""
        echo "Please install Node.js v18 or higher:"
        echo "  - Visit: https://nodejs.org"
        echo "  - Or use nvm: https://github.com/nvm-sh/nvm"
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js v18 or higher is required (you have v$(node -v))"
        exit 1
    fi
    
    print_success "Node.js $(node -v) is installed"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed!"
        exit 1
    fi
    
    print_success "npm $(npm -v) is installed"
}

# Install dependencies
install_dependencies() {
    print_step "Installing dependencies..."
    npm install
    print_success "Dependencies installed"
}

# Setup .env file
setup_env() {
    print_step "Setting up environment file..."
    
    if [ -f .env ]; then
        print_warning ".env file already exists"
        read -p "Do you want to overwrite it? (y/N): " overwrite
        if [ "$overwrite" != "y" ]; then
            print_success "Keeping existing .env file"
            return
        fi
    fi
    
    echo ""
    echo "Get your FREE Gemini API key from:"
    echo "  https://makersuite.google.com/app/apikey"
    echo ""
    read -p "Enter your API key (or press Enter to skip): " api_key
    
    if [ -n "$api_key" ]; then
        echo "GEMINI_API_KEY=$api_key" > .env
        print_success ".env file created with your API key"
    else
        echo "GEMINI_API_KEY=your-api-key-here" > .env
        print_warning ".env file created - please add your API key manually"
    fi
}

# Setup config file
setup_config() {
    print_step "Setting up configuration file..."
    
    if [ -f config.json ]; then
        print_warning "config.json already exists"
        read -p "Do you want to overwrite it? (y/N): " overwrite
        if [ "$overwrite" != "y" ]; then
            print_success "Keeping existing config.json"
            return
        fi
    fi
    
    # Show available templates
    echo ""
    echo "Available config templates:"
    echo "  1. freelancer - Freelancers looking for gigs"
    echo "  2. jobseeker - Job seekers attracting recruiters"
    echo "  3. author - Authors launching books"
    echo "  4. educator - Educators selling courses"
    echo "  5. creator - Content creators growing audience"
    echo "  6. saas - B2B SaaS companies"
    echo "  7. ecommerce - E-commerce stores"
    echo "  8. crypto - Crypto projects"
    echo "  9. example - Blank template"
    echo ""
    read -p "Choose a template (1-9, or press Enter for example): " template_choice
    
    case $template_choice in
        1) cp config.freelancer.json config.json && print_success "Freelancer config copied" ;;
        2) cp config.jobseeker.json config.json && print_success "Job seeker config copied" ;;
        3) cp config.author.json config.json && print_success "Author config copied" ;;
        4) cp config.educator.json config.json && print_success "Educator config copied" ;;
        5) cp config.creator.json config.json && print_success "Creator config copied" ;;
        6) cp config.saas.json config.json && print_success "SaaS config copied" ;;
        7) cp config.ecommerce.json config.json && print_success "E-commerce config copied" ;;
        8) cp config.crypto.json config.json && print_success "Crypto config copied" ;;
        *) cp config.example.json config.json && print_success "Example config copied" ;;
    esac
    
    echo ""
    print_warning "Remember to edit config.json with your details!"
}

# Show next steps
show_next_steps() {
    echo ""
    echo "=================================="
    echo "  Contai Setup Complete! 🎉"
    echo "=================================="
    echo ""
    echo "Next steps:"
    echo ""
    
    if [ ! -f .env ] || grep -q "your-api-key-here" .env; then
        echo "1. Add your API key to .env file:"
        echo "   GEMINI_API_KEY=your-actual-api-key"
        echo ""
    fi
    
    echo "2. Edit config.json with your brand details"
    echo ""
    echo "3. Generate your first content:"
    echo "   node contai.js help"
    echo "   node contai.js thread \"your topic\" twitter"
    echo ""
    echo "4. Read the documentation:"
    echo "   - README.md - Overview"
    echo "   - QUICKSTART.md - 5-minute setup"
    echo "   - CONFIG_GUIDE.md - Configuration guide"
    echo "   - COMMANDS.md - All commands"
    echo ""
    echo "Happy creating! 🚀"
    echo ""
}

# Setup my-style.txt
setup_style() {
    print_step "Setting up style DNA file..."
    
    if [ -f my-style.txt ]; then
        print_warning "my-style.txt already exists"
        return
    fi
    
    echo ""
    echo "Do you want to setup Style Mirroring? (y/N)"
    echo "This will let you paste your own writing to train the AI on your voice."
    read -p "Choose (y/N): " style_choice
    
    if [ "$style_choice" == "y" ]; then
        cp my-style.example.txt my-style.txt
        print_success "my-style.txt created from example. Paste your own writing here!"
    else
        print_success "Skipping style setup. You can do this later."
    fi
}

# Main installation
main() {
    echo ""
    echo "=================================="
    echo "  Contai Installation Script"
    echo "=================================="
    echo ""
    
    check_node
    check_npm
    install_dependencies
    setup_env
    setup_config
    setup_style
    show_next_steps
}

# Run installation
main
