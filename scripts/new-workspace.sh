#!/bin/bash

# Variables
name=$1

# Create a new workspace folder
if [ ! -d "./packages/$name" ] 
then
  mkdir ./packages/$name
  cd ./packages/$name
  npm init -y
fi