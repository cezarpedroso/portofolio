# Cezar Pedroso - Portfolio Website

A professional portfolio website showcasing my skills, projects, and experience as a Software Engineering and IT student at William Penn University.

## 🌟 Features

- **Modern Design**: Clean, professional layout with a black theme
- **Interactive Cursor**: Custom cursor with light trail effects
- **GitHub Integration**: Dynamically fetches and displays GitHub repositories
- **Responsive Design**: Optimized for all devices and screen sizes
- **Smooth Animations**: Engaging user experience with CSS animations
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Resume Download**: Direct access to downloadable resume
- **Contact Information**: Easy ways to get in touch

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)
- **API**: GitHub REST API for repository data
- **Deployment**: GitHub Pages compatible

## 🚀 GitHub Pages Deployment

### Step-by-Step Deployment Instructions:

1. **Create a GitHub Repository**
   - Go to [GitHub.com](https://github.com) and sign in
   - Click the "+" icon and select "New repository"
   - Name it `portfolio` or `cezarpedroso.github.io` 
   - Make sure it's set to **Public**
   - Don't initialize with README (since you already have files)

2. **Upload Your Files**
   - Download all your portfolio files from this Replit project
   - In your new GitHub repository, click "uploading an existing file"
   - Drag and drop all files: `index.html`, `styles.css`, `script.js`, `README.md`, and the `assets` folder
   - Commit the files with message "Initial portfolio upload"

3. **Enable GitHub Pages**
   - In your repository, go to **Settings** tab
   - Scroll down to **Pages** section in the left sidebar
   - Under "Source", select **Deploy from a branch**
   - Choose **main** branch and **/ (root)** folder
   - Click **Save**

4. **Access Your Live Site**
   - GitHub will provide a URL like: `https://cezarpedroso.github.io/portfolio`
   - It may take 5-10 minutes for the site to be live
   - You'll see a green checkmark when deployment is successful

### Alternative: Using Git Commands
If you prefer using Git commands:
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

### Local Development

To run locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/cezarpedroso/portfolio.git
   cd portfolio
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 5000
   
   # Using Node.js
   npx serve -s . -l 5000
   