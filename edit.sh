#!/bin/bash
set -o errexit
set -o pipefail
set -o nounset

if [[ $# -eq 0 ]]; then
  echo "Please provide post title you want to create or edit"
  exit
fi

POST=$(find _posts -maxdepth 1 -iname "*$1.md")

if [[ $POST == "" ]]; then
  POST="_posts/$(date +"%Y-%m-%d")-$1.md"
  cat <<EOF > $POST
---
layout: post
title: "$1"
---

EOF
fi

sleep 1 && open http://127.0.0.1:9090/edit.html#$POST &
pad --local --replace --timeout=-1
