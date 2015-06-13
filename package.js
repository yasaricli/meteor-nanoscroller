Package.describe({
  name: 'yasaricli:nanoscroller',
  version: '0.0.1',
  summary: 'A jQuery plugin that offers a simplistic way of implementing Lion OS scrollbars.',
  git: 'https://github.com/yasaricli/meteor-nanoscroller.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  // files
  api.addFiles([
    'nanoscroller.js',
    'nanoscroller.css'], 'client');
});
