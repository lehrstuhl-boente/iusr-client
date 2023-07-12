# IusR Client

Frontend for an open source code learning platform.

## Project Setup

### Development Environment

#### Setup Git and clone project

At the moment, there exist two repositories for this project, one on GitHub and one on GitLab. The GitHub repository is the official one, the GitLab repo is only used for deployment. We always push to both repos but only pull from the GitHub repo.

1. run `git clone git@github.com:lehrstuhl-boente/iusr-server.git`, this sets the pull remote to GitHub
2. run `git remote set-url origin --push --add git@gitlab.com:rwf-dev/lstboente/iusr-server.git`
3. run `git remote set-url origin --push --add git@github.com:lehrstuhl-boente/iusr-server.git`

#### Setup Nuxt Project

1. run `npm install` from root directory
2. run `npm run dev` to run development server

### Production Environment

Node.js Version 18.14

####

## Techstack

**Node Version:** 18.14  
**Framework:** Nuxt.js 3, https://nuxt.com/
