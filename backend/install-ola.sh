#!/bin/bash

# Define the expected directory name
expected_dir="backend"

# Extract the current directory name
current_dir=$(basename "$PWD")

# Compare and act accordingly
if [[ "$current_dir" != "$expected_dir" ]]; then
  echo "Error: This script must be run from the '$expected_dir' directory."
  echo "Please change your working directory to the proper one."
  exit 1
fi

# Check if the branch name is provided as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <branch_name>"
  exit 1
fi

# Assign the first argument to the branch variable
branch="$1"

# Define the repository URL
repo_url="https://github.com/jal9o3/OLA.git"

# Remove existing OLA installation, if any
rm -rf ./ola_server/OLA

# Clone the specified branch
git clone -b "$branch" --single-branch "$repo_url"

# Take the needed directory and remove the cloned repository
mv ./OLA/OLA ./ola_server
mv ./OLA/setup.py ./ola_server
rm -rf ./OLA
