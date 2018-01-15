Git Intro assfd
# Working Directory
- Area where all of our files and directories and changes are living all the time

# Staging Area
- Files and directories that we explicitly add to the staging area

# Git Repository
- Where all our snapshots are stored

* ctrl + K - clear out workspace terminal
* ls -a - show .git directory. content include hidden elements
* In case if you make a mistake (make a tipo for ) and you go away from
    (master) state and have only 
    >       to takes away from this state type:
    ctrl + C


* git   --version



#Git Basics
* git init -create repository ".git"(it's actually hidden) and 
            will save there all changes that you'll make in files, 
            that are at this repo!

* git status - tells where you are in branches, which files are
               trecked/untracked (maybe most of them you want 
               to be in secret and you don't want to share them
               on github), which are added to commit


#Git Checkout
* git log - this will giv us a history or a log of all the commits
            that we've made in this repo. To get out of this You
            can type Q. 
* git checkout <commit id> - git takes us to the <commit id> time (HEAD).
                When we made the <commit id> changes. And we don't in 
                (master) time. We are in (HEAD <commit id>) time. Here we
                can inspecting (looking out) old version of the code. It
                kind of takes me out of current flow or normal workflow 
                of git. This is the message that git givs to me:

*               You are in 'detached HEAD' state. You can look around, make experimental
                changes and commit them, and you can discard any commits you make in this
                state without impacting any branches by performing another checkout.

                If you want to create a new branch to retain commits you create, you may
                do so (now or later) by using -b with the checkout command again. Example:

                                    git checkout -b <new-branch-name>

* git checkout master - that takes us back forword in time to the 
                        (master) workflow
                
* Look out the situation when we want to 
  REVERT FROM OUR CURRENT STATE TO A 
  SNAPSHOT MADE ON A CERTAIN COMMIT: 
  (in fact there are a lot of ways of 
  doing this, but look maybe the shortest)
  It has two steps:
    1)  git revert --no-commit 0766c053..HEAD
    2)  git commit




* git add <file> - add new <file> to .git
* git add *.<type of files (html/txt...)> - adding multiple files
            of a certain type
* git add . - add more than one file that have changed
* git add -A - adding all files and directories (including hidden)


* git rm <file> - completely remove file from file system
* git rm --cached <file> - remove from Git but and not remove from
                filesystem




* git reset HEAD <file> - for TAKES OFF file from the stage area
                (marks in green color)

* we can create the special hidden file where add some FILES which we
    want to UNTRACK (ignore):
   
    touch .gitignore
    
    After that that files (which have added to .gitignore) will don't
    show in stage area

* mv <file1> <file2> - to RENAME file1 into file2
    

* git commit -m "..." - note (message) what changes you did between
                        quote marks

       
           /----0----0----0
          /              /
   0-----0----0----0----0

# Git Branches

* git branch  - Listing all branches   
    
* git checkout -b <new branch name> - Adding a branch and swiching to them

* git checkout <branch name> - Changing branches

* git merge <merging branch name>- Merging a branch 
    First of all we have to swich to the main branch and after that attach
    second branch

* git branch -d <branch name> - Removing (deleting) a branch





#Cloning and Github Intro
* What is Github?
* Cloning an existing repo

#Pushing to Github
* Creating a repo on github
* Adding a remote
* Pushing to github