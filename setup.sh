echo "Script Will Start..."

echo ""

sleep 2

installDependencies() {

echo "Starting Installation In 5 Seconds.."

sleep 5

npm install discord.js@12.5.3

npm install quick.db@7.1.3

npm install reconlx@1.1.3

npm install discord-reply discord-buttons@4.0.0

npm install parse-ms moment canvas-senpai weather-js node-fetch common-tags

npm install

echo "Successfully Installed Packages, Type node index.js followed by enter to run :)"

}

dependencies() {

read -p "Can I Proceed With Discord-Bot Dependencies Installation And Setup?[Y/n]" installationConfirm

install=${installationConfirm,,}

if [ "$install" = "y" ]; then

installDependencies

elif [ "$install = "n" ]; then

echo "Run Script Again To Install :)"

exit

else

echo "Invalid Option"

echo ""

echo "Press Any Key To Continue"

read -n 1

dependencies

fi

}

NodeJSInstalled() {

read -p "Is NodeJs Installed?[Y/n]" input

answer=${input,,}

if [ $"input" = "y" ]; then

apt-get update && apt-get upgrade

node -v

npm -v

dependencies

elif [ "$input" = "n" ]; then

apt-get update && apt-get upgrade

apt-get install nodejs

npm -v 

node -v

dependencies

else

echo "Invalid Option"

echo""

echo "Press Any Key To Continue"

read -n 1

NodeJSInstalled

fi

}
