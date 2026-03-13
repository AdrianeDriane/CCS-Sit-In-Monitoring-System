#!/bin/sh
set -e

echo "Waiting for PostgreSQL..."
until npm run db:bootstrap; do
  echo "PostgreSQL not ready yet. Retrying in 3 seconds..."
  sleep 3
done

echo "Starting backend..."
exec npm run dev:docker
