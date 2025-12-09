#!/bin/bash
# deploy.sh
# Run this on the EC2 instance to pull and restart the app.
# Usage: ./deploy.sh <AWS_ACCOUNT_ID> <REGION>

ACCOUNT_ID=$1
REGION=$2
REPO_PREFIX="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com"

if [ -z "$ACCOUNT_ID" ] || [ -z "$REGION" ]; then
  echo "Usage: ./deploy.sh <AWS_ACCOUNT_ID> <REGION>"
  exit 1
fi

echo "--- Logging in to ECR ---"
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $REPO_PREFIX

echo "--- Pulling Latest Images ---"
docker pull $REPO_PREFIX/blog-backend:latest
docker pull $REPO_PREFIX/blog-frontend:latest

echo "--- Stopping Old Containers ---"
docker stop backend frontend || true
docker rm backend frontend || true

echo "--- Starting Backend ---"
docker run -d -p 3000:3000 \
  --name backend \
  --restart always \
  -e HF_API_KEY=hf_mock_key \
  $REPO_PREFIX/blog-backend:latest

echo "--- Starting Frontend ---"
docker run -d -p 80:80 \
  --name frontend \
  --restart always \
  $REPO_PREFIX/blog-frontend:latest

echo "--- Deployment Complete! ---"