#!/bin/bash
# init-ec2.sh
# Run this once on a fresh Amazon Linux 2023 instance to set up Docker.

echo "--- Updating System ---"
sudo yum update -y

echo "--- Installing Docker ---"
sudo yum install docker -y

echo "--- Starting Docker Service ---"
sudo service docker start
sudo systemctl enable docker

echo "--- Adding User to Docker Group ---"
sudo usermod -a -G docker ec2-user

echo "--- Installation Complete ---"
echo "Please logout and log back in for group permissions to take effect."