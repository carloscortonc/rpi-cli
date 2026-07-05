# Check if server is reacheable on port 22, otherwise exit

# Bash's built-in TCP support
if timeout 5 bash -c "</dev/tcp/$IP/22" >/dev/null 2>&1; then
    return 0

# netcat
elif command -v nc >/dev/null 2>&1; then
    nc -z "$IP" 22 >/dev/null 2>&1
    return $?

else
    echo "Error: server is not reachable on port 22"
    exit 1
fi

