for f in *.json
do
  curl -X POST -H "Content-Type: application/json" -d "@$f" localhost:8080/person
  echo " <- $f"
done
