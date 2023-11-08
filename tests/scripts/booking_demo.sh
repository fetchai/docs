#!/bin/bash


timeout 15s python ./booking_demo/restaurant.py &
timeout 15s python ./booking_demo/user.py
wait

echo "Both Python scripts have completed or timed out."