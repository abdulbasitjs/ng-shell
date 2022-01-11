Skip to sidebar navigation
Skip to content
Linked Applications
Bitbucket
Projects
Repositories
Search for code, commits or repositories
Search for code, commits or repositories…
Help
Administration
Inbox1
Logged in as Umar (Aftab)
Single Portal
Clone

Source
Repository settings
You have an empty repository
To get started you will need to run these commands in your terminal.

New to Git? Learn the basic Git commands
Configure Git for the first time
git config --global user.name "Umar"
git config --global user.email "umar.aftab.1797@slashnext.net"
Working with your repository
I just want to clone this repository
If you want to simply clone this empty repository then run this command in your terminal.

git clone http://10.0.8.169:7990/scm/sp/single-portal-frontend.git
My code is ready to be pushed
If you already have code ready to be pushed to this repository then run this in your terminal.

cd existing-project
git init
git add --all
git commit -m "Initial Commit"
git remote add origin http://10.0.8.169:7990/scm/sp/single-portal-frontend.git
git push -u origin master
My code is already tracked by Git
If your code is already tracked by Git then set this repository as your "origin" to push to.

cd existing-project
git remote set-url origin http://10.0.8.169:7990/scm/sp/single-portal-frontend.git
git push -u origin --all
git push origin --tags
All done with the commands?
