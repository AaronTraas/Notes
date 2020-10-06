#!/usr/bin/env bash

cd NOTES_FOLDER
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
