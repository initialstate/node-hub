#!/bin/sh

# This script may need execution permission before an initial run:
# > chmod +x quickstart.command
# Alternatively, this can be installed remotely with:
# > curl -s https://raw.githubusercontent.com/InitialState/node-hub/master/quickstart.command | sh -s 8080 abcdef

# SETUP

# ensure that node is installed
if hash node 2>/dev/null; then
  echo "Node.js Pre-Installed"

else
  echo "Node.js Not Found"

  if hash nvm 2>/dev/null; then
    echo "NVM Pre-Installed"

  else
    echo "Installing NVM"

    # install NVM
    curl -s https://raw.githubusercontent.com/creationix/nvm/v0.16.1/install.sh | sh

    # initialize nvm
    export NVM_DIR=$(echo ~/.nvm)
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

    echo "NVM Installed (NVM_DIR: $NVM_DIR)"
  fi;

  echo "Installing Node.js"
  # install Node
  nvm install v5

  echo "Node.js Installed"
fi;

# ensure that the node-hub repo is available
if [ -d .git ]; then
  # Do nothing with an existing repo
  echo "Existing .git repository found";

else

  # Clone Hub Source
  echo "Cloning .git repository";
  git clone https://github.com/InitialState/node-hub.git

  # Move into the node-hub source root
  cd node-hub
fi;

# Set Initial State access key
export IS_API_ACCESS_KEY="place_access_key_here"

echo Installing Node Dependencies
# Install hub dependencies
npm install

echo Starting Node
# START HUB
npm start -- $1 $2
