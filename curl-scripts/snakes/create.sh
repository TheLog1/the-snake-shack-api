#!/bin/bash

API="http://localhost:4741"
URL_PATH="/snakes"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
      "species": "'"${SPECIES}"'",
      "name": "'"${NAME}"'",
      "morph": "'"${MORPH}"'",
      "shed": "'"${SHED}"'",
      "fed": "'"${FED}"'"
  }'

echo
