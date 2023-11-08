#!/bin/bash

timeout 10s python ./code_output/agents_communication.py


timeout 10s python ./code_output/remote_agents_alice.py &


timeout 10s python ./code_output/remote_agents_bob.py

wait

echo "Both Python scripts have completed or timed out."