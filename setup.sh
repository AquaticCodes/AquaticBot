echo "Script Will Start..."

echo ""

sleep 2

installDependencies() {

echo "Starting Installation In 5 Seconds.."

sleep 5

npm install discord.js@12.5.3

npm install quick.db@7.1.3

npm install reconlx@1.1.3

}

NodeJSInstalled() {

read -p "Is NodeJs Installed?[Y/n]" input

answer=${input,,}

if [ "$input" = "y" ]; then

apt update && apt upgrade

apt-get install nodejs

npm -v 

node -v

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

}



