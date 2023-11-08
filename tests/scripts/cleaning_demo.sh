#!/bin/bash


timeout 15s python ./cleaning_demo/cleaner.py &
timeout 15s python ./cleaning_demo/user.py
wait


echo "Both Python scripts have completed or timed out."