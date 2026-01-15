# Check if server is reacheable on port 22, otherwise exit

if ! nc -z $server 22 2>/dev/null; then
    echo "Error: server is not reachable on port 22"
    exit 1
fi