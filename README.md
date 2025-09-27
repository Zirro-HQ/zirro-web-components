# @zirro/web-components

A modern React component library built with TypeScript, Tailwind CSS, and semantic versioning.

## 🚀 Features

- **Modern Stack**: Built with React 18, TypeScript, and Tailwind CSS
- **Type Safe**: Full TypeScript support with strict type checking
- **Semantic Versioning**: Automated releases with semantic-release
- **Tree Shaking**: Optimized bundle size with ES modules
- **Accessible**: Built with accessibility in mind
- **Customizable**: Extensive theming and variant system
- **Developer Experience**: ESLint, Prettier, and comprehensive tooling

## 📦 Installation

```bash
npm install @zirro/web-components
# or
yarn add @zirro/web-components
# or
pnpm add @zirro/web-components
```

## 🎨 Setup

Import the CSS file in your app's entry point:

```typescript
import '@zirro/web-components/styles';
```

Or import it in your CSS:

```css
@import '@zirro/web-components/styles';
```

## 🧩 Usage

```tsx
import { Button } from '@zirro/web-components';

function App() {
  return (
    <Button variant='primary' size='lg'>
      Get Started
    </Button>
  );
}
```

## 🎨 Theming

The component library uses a comprehensive design token system built on Tailwind CSS. You can customize the theme by extending your Tailwind configuration:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your custom primary colors
        },
      },
    },
  },
};
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Build the library
npm run build

# Build Storybook
npm run build-storybook

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Project Structure

```
src/
├── components/          # Component implementations
│   ├── Button/
├── styles/             # Global styles and CSS
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── index.ts            # Main export file
```

## 📋 Scripts

- `dev` - Start development server
- `build` - Build the library for production
- `storybook` - Start Storybook development server
- `build-storybook` - Build Storybook for production
- `type-check` - Run TypeScript type checking
- `lint` - Run ESLint
- `lint:fix` - Fix ESLint errors automatically
- `format` - Format code with Prettier
- `format:check` - Check code formatting
- `clean` - Remove build artifacts

## 🚀 Release Process

This library uses semantic-release for automated versioning and publishing:

- **feat**: New features (minor version bump)
- **fix**: Bug fixes (patch version bump)
- **perf**: Performance improvements (patch version bump)
- **docs**: Documentation changes (patch version bump)
- **BREAKING CHANGE**: Breaking changes (major version bump)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Make your changes following the conventional commit format
4. Run tests and linting: `npm test && npm run lint`
5. Commit your changes: `git commit -m 'feat: add amazing feature'`
6. Push to the branch: `git push origin feat/amazing-feature`
7. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Storybook Deployment

The Storybook documentation is automatically deployed to GitHub Pages.

### Setup GitHub Pages

1. **Enable GitHub Pages** in your repository settings:
   - Go to `Settings` → `Pages`
   - Set **Source** to "GitHub Actions"

2. **Push to main branch** - deployment happens automatically

3. **Access your Storybook** at: `https://[username].github.io/[repository-name]/`

### Manual Testing

```bash
# Build Storybook locally
npm run build-storybook

# Preview the built version
npm run storybook:preview
```

The deployment includes:

- ✅ Automated builds on push/PR to main
- ✅ GitHub Pages deployment
- ✅ Static asset optimization
- ✅ Jekyll bypass for proper routing

## 🆘 Support

- 📖 [Documentation](https://github.com/zirro/zirro/tree/main/web-components)
- 🐛 [Issue Tracker](https://github.com/zirro/zirro/issues)
- 💬 [Discussions](https://github.com/zirro/zirro/discussions)

---

Built with ❤️ by the Zirro team
