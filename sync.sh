#!/usr/bin/env bash

cd "/mnt/c/Users/Aaron Traas/Documents/Notes"
gstatus=`git status --porcelain`

if [ ${#gstatus} -ne 0 ]
then
    git add --all
    git commit -m "$gstatus"

	git pull --rebase
    git push
else
	git pull
fi
