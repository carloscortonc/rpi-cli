# Check if server is reacheable on port SSH_PORT, otherwise exit
# ENV_VARIABLES:
#  - SSH_PORT: port to check for ssh (default=22)

PORT=${SSH_PORT:-22}

# Bash's built-in TCP support
if timeout 5 bash -c "</dev/tcp/$IP/$PORT" >/dev/null 2>&1; then
    return 0

# netcat
elif command -v nc >/dev/null 2>&1; then
    nc -z "$IP" $PORT >/dev/null 2>&1
    return $?

else
    echo "Error: server is not reachable on port $PORT"
    exit 1
fi

