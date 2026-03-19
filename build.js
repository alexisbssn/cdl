#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PLACEHOLDER = '<!-- INCLUDE: includes/header.html -->';
const SRC_DIR = path.join(__dirname, 'src');
const INCLUDES_DIR = path.join(__dirname, 'includes');

function getHeaderContent(basePath) {
  const headerPath = path.join(INCLUDES_DIR, 'header.html');
  let header = fs.readFileSync(headerPath, 'utf8');
  return header.replace(/\{\{BASE_PATH\}\}/g, basePath);
}

function buildHtml() {
  function processFile(srcPath) {
    const srcRelative = path.relative(SRC_DIR, srcPath);
    const outPath = path.join(__dirname, srcRelative);
    const depth = srcRelative.split(path.sep).length - 1;
    const basePath = depth === 0 ? '' : '../'.repeat(depth);

    let content = fs.readFileSync(srcPath, 'utf8');
    if (!content.includes(PLACEHOLDER)) return;

    content = content.replace(/\{\{BASE_PATH\}\}/g, basePath);
    content = content.replace(PLACEHOLDER, getHeaderContent(basePath));
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, content);
    console.log(`[build] ${srcRelative}`);
  }

  function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name.endsWith('.html')) {
        processFile(fullPath);
      }
    }
  }

  walkDir(SRC_DIR);
}

function runTailwind(watch = false) {
  const args = ['tailwindcss', '-i', './input.css', '-o', './output.css'];
  if (watch) args.push('--watch');
  return spawn('npx', args, { stdio: 'inherit' });
}

const isWatch = process.argv.includes('--watch') || process.argv.includes('-w');

buildHtml();
runTailwind(false);

if (isWatch) {
  const chokidar = require('chokidar');
  const tailwind = runTailwind(true);

  const watcher = chokidar.watch(
    [path.join(SRC_DIR, '**/*.html'), path.join(INCLUDES_DIR, '**/*.html')],
    { ignoreInitial: true }
  );

  watcher.on('change', () => {
    buildHtml();
  });
  watcher.on('add', () => {
    buildHtml();
  });

  console.log('[build] Watching for changes...');

  process.on('SIGINT', () => {
    tailwind.kill();
    process.exit();
  });
}
