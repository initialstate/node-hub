#!/bin/sh

# This script may need execution permission before an initial run
# chmod +x quickstart.command

# SETUP

# ensure that node is installed
hash node &> /dev/null
if [ $? -eq 1 ]; then
  echo "Node Not Installed"

  hash nvm &> /dev/null
  if [ $? -eq 1 ]; then
    echo "Installing NVM"

    # install NVM
    curl https://raw.githubusercontent.com/creationix/nvm/v0.16.1/install.sh | sh

    # initialize nvm
    export NVM_DIR=$(echo ~/.nvm)
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
  fi;

  echo "Installing Node"
  # install Node
  nvm install v5

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
