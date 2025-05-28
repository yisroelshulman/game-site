#!/bin/bash

start_deploy_time=$(date +%s%N)

ready="ready_to_deploy"
deploy_num="count.txt"

if [ ! -f "$ready" ]; then
    echo "not ready to deploy"
    exit 1
else
    echo "deploying website..."
fi

if [ ! -f "$deploy_num" ]; then
    echo 0 > count.txt
fi

count=$(cat "$deploy_num")

if ! [[ "$count" =~ ^-?[0-9]+$ ]]; then
    echo "invalid count: deploy failed"
    exit 1
fi

rm "$ready"

incremented=$((count + 1))
echo $incremented > count.txt

deploy_message=""
if [[ "$1" == "" ]]; then
    deploy_message="deploying website update, (depoyment # $incremented)."
else
    deploy_message="$1, (deployment # $incremented)."
fi

git add -u
git add .
git commit -m "$deploy_message"
git push

end_deploy_time=$(date +%s%N)
duration=$(( (end_deploy_time - start_deploy_time) / 1000000 ))

echo "website update deployed, deploment time $duration milliseconds!"
