#!/bin/sh

# Automated test of Tutorials | Deploying your Smart Contracts to a Chain
# https://docs.erisindustries.com/tutorials/contractsdeploying/

set -o errexit
set -o xtrace

cd ../chainmaking
npm install
npm test
cd ../contractsdeploying

chain_dir=~/.eris/chains/simplechain
app_dir=~/.eris/apps/idi
rm -rf $app_dir
mkdir $app_dir
cp idi.sol epm.yaml $app_dir
cd $app_dir

sleep 5
eris contracts deploy --chain simplechain --address $(cat $chain_dir/addr1)

if [ -e $app_dir/epm.json ]; then
  echo Chain deployed successfully.
else
  echo There was a problem deploying His Excellency, President for Life, Field \
    Marshal Al Hadji Doctor Idi Amin Dada, VC, DSO, MC, Lord of All the Beasts \
    of the Earth and Fishes of the Seas and Conqueror of the British Empire in \
    Africa in General and Uganda in Particular.
fi
