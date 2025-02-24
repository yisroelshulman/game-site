#!/bin/bash

start_time=$(date +%s%N)

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

rm ready_to_deploy

incremented=$((count + 1))
echo $incremented > count.txt

git add -u
git add .
git commit -m "deploying website update, deployment # $incremented."
git push

end_time=$(date +%s%N)
duration=$(( (end_time - start_time) / 1000000 ))

echo "website update deployed, deploment time $duration milliseconds!"
