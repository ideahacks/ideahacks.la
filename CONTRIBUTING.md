# Contributing to ideahacks.la

This document is meant to serve as a reference for anyone interested in
developing on ideahacks.la

repository --> just a term that refers to your project/folder/codebase

## git

Git is a version control program. We use it to manage this
project and make sure that one person's mistake does not break the
entire codebase, and that we can recover from failure efficiently.

If you have a Mac, you already have git installed. If you have windows,
you'll need to install it. However if you've already set up the website
on your computer, chances are you already have git.

[Learn how to use the command line from codecademy!](https://www.codecademy.com/learn/learn-the-command-line)  
[Learn how to use git from codecademy!](https://www.codecademy.com/learn/learn-git)

git commands cheat sheet:

```
git status // displays current status of your repo

git log // displays commit log on current branch (press q to exit)

git branch <branch-nam> // creates a new branch in the repo

git checkout <branch-name> // switches to specified branch in repo

// Will create the specified branch and switch over to it. Basically
// combines git branch and git checkout into one command
git checkout -b <branch-name>

// adds your changes into the staging area
// note: "git add ." will add all changes into the staging area
git add <filenames>

// Commits the changes that are within the staging area and adds
// a commit message to it
git commit -m "Insert commit message here"

// Pulls changes from origin onto the specified local branch
git pull origin <branch-name>

// Pushes changes on the specified local branch onto the one at origin
// (which is GitHub for this project)
git push origin <branch-name>

// Resets the entire repo back to the state of the last commit
git reset --hard
```

## Branch Naming Convention and Branch Lifecycle

Historically, this project has used a branch naming convention.
Branch naming conventions are great because it ensures that branch names
are unique (which is useful I promise) as well as other benefits. You
don't _have_ to follow this, but it would be nice.

`<your-name>/<purpose-of-this-branch>`

Examples:

```
jeffrey/main-page
patrick/info-updates
kathy/bugfix-rendering-issue
jeffrey/add-new-page
```

Branches should only live for a single purpose. Once that purpose has
been achieved and the branch has been merged into a base branch like
development or production, the branch should be deleted both on GitHub
and locally. This is just a workflow convention.

## GitHub and Making Pull Requests (PR)

GitHub is just a place for people to place a copy of their repository
at so that other developers can clone/pull from such remote copy, make
updates or improvements to it, and push it back to the remote copy. It
fosters a collaborative environment for developers to work on the same
project.

When you make changes to this project, **PLEASE DO SO ON YOUR OWN
BRANCH**. Then push your changes, which will show up on GitHub also
as a separate branch. Please **DO NOT BE ALARMED IF YOU ATTEMPT TO
COMMIT OR PUSH ONTO THE PRODUCTION OR DEVELOPMENT BRANCH**. Those two
branches are protected (so you can't push to them) and there are ways
to move your commits/changes onto a different branch.

Once you have pushed your changes from your own branch onto a branch
on GitHub, please go to the "Pull Request" tab on GitHub and create a
new Pull Request for your branch. A PR is basically just a request
to merge your changes onto a branch (dev or prod). Please tag
`@jeffreyxchan` or `@danielskathyd` in the "Reviewers" OR the
comment section of the PR and we'll review your code, give you feedback
to iterate on, and once your changes are beautiful, they will be
approved and merged.

## Making Front End Changes

All the "views" (HTML files) for this project are located in the
/views folder. All the CSS for this project is located in the
/public/css folder.

If you don't understand the .hbs file extension or the double curly
brace syntax within the files, don't worry about them.

While developing on the pages, feel free to delete all the code
that exists in there and start from scratch, if that's what you're
comfortable with doing.

[Learn HTML and CSS from w3schools!](https://www.w3schools.com/)  
[Learn HTML and CSS from codecademy!](https://www.codecademy.com/)

## Starting the Server

The only way to view your pages is to run the server, so that the
server can give your browser the HTML and CSS. To start the server,
just navigate into the repo and run `npm start`:

```
- $ cd ideahacks.la
- $ npm start
```

Once the server has started, you DO NOT have to restart it every time
you make a change to your page. You can stop server by pressing
`ctrl + c` when at your command line.

Note: If you would like to make entirely new pages (such as by creating
new HTML files), you would need to request for some back end work to
be done. The server is specifically configured to serve the already
existing pages at their respective URL's.
