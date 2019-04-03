#!/usr/bin/env bash
set -euox pipefail

echo "Build starting"

# Get the latest zumcoin/paper-zum
git submodule update --recursive --remote --merge

# Generate the static site
rm -rf ./_site
bundle exec jekyll build

# Setup paper-zum (auto copied by Jekyll) in the build folder
rm -rf _site/paper-zum/.git
mv _site/paper-zum _site/wallet

#bundle exec rake tests

echo "Build complete"
