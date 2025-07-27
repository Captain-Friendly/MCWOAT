#!/bin/sh
echo starting to run from docker
chmod +x ./main
./main || echo "Go binary failed to run"