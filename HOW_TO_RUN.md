# How to Run the Project

This is a React + TypeScript + Vite application. Follow the steps below to set up and run the project locally.

## Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

## Installation

1.  Open your terminal in the project directory.
2.  Install the dependencies by running:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

## Running the Application

1.  Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

2.  Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

## Building for Production

To create a production build, run:

```bash
npm run build
```

## Previewing Production Build

To preview the production build locally, run:

```bash     
npm run preview
```

## Deployment to GitHub Pages

Follow these steps to host your project on GitHub Pages.

### 1. Prepare Your Repository

Ensure your project is structured correctly:
- **Project Structure**: This is a Vite project, so your source files are in `src/` and the build output will be in `dist/`.
- **Base Path**: The `vite.config.ts` is already configured with `base: './'` for relative asset paths.

### 2. The Deployment Procedure

We recommend using the `gh-pages` package which has been already set up in this repository.

#### Method: Using Terminal (Recommended)

1.  **Initialize Git** (if not already done):
    ```bash
    git init
    ```
2.  **Add your files and commit**:
    ```bash
    git add .
    git commit -m "Initial commit for GH Pages"
    ```
3.  **Add your remote repository**:
    ```bash
    git remote add origin https://github.com/DINESHSURRYA/HellCaster.git
    ```
4.  **Deploy**:
    Run the following command to build the project and push the `dist` folder to the `gh-pages` branch:
    ```bash
    npm run deploy
    ```

### 3. Accessing Your Site

Once you run `npm run deploy`, GitHub will start a "workflow" to build your site.

1.  Wait about 1–2 minutes.
2.  Go to your repository on GitHub.
3.  Navigate to **Settings > Pages**.
4.  You will see a bar at the top saying: "Your site is live at..." followed by a URL.

The URL format is typically: `https://<your-username>.github.io/<repository-name>/`

### Important Tips

- **Automatic Updates**: Every time you want to update your live site, simply run `npm run deploy`.
- **Custom Domains**: You can link a custom domain in the **Pages** settings menu on GitHub.
- **Private Repositories**: Hosting from private repositories is free, but the website itself will be public.
