#!/usr/bin/env node

/**
 * This script sets up the .npmrc file with the correct configuration
 * based on the environment (local development vs CI).
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get current file's directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get the root directory of the project
const rootDir = path.resolve(__dirname, '..')

// Default npmrc content
const npmrcContent = `registry=https://registry.npmjs.org/
@zirro:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${process.env.NODE_AUTH_TOKEN || 'dummy-token'}
always-auth=${process.env.CI ? 'true' : 'false'}
`

// Write to .npmrc file
fs.writeFileSync(path.join(rootDir, '.npmrc'), npmrcContent)

console.log('Successfully created .npmrc file')
