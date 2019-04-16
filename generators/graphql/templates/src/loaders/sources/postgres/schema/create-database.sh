#!/bin/bash

# This will drop and create database.
# Note: Must be run from project root.

database_name="$1"
file_path="$2"

set -e;

echo "Drop database: ${database_name}\n"
dropdb ${database_name} --if-exists;

echo "Create database: ${database_name}\n"
createdb ${database_name};

echo "Apply database schema: ${database_name}\n"
psql -d ${database_name} -f ${file_path};
echo "\n"
