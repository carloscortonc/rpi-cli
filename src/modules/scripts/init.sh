# script to install all required software on server
# ENV_VARIABLES:
#   INSTALL_NGINX: whether to configure nginx

# Check server
CURRDIR=$(dirname $0)
source $CURRDIR/check_server.sh

ssh -o ConnectTimeout=5 $USER@$IP 'bash -s' <<EOF

sudo apt-get update
sudo apt-get upgrade -y

# --- INSTALL DOCKER ---
curl -sSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# activate changes to groups
newgrp docker
# configure docker to start on boot
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
sudo service docker restart

# --- CONFIGURE NGINX ---
if [[ "$INSTALL_NGINX" == "1" ]]; then
  # clean container first, if running
  docker stop nginx &> /dev/null
  docker rm nginx &> /dev/null
  # start container using nginx image, running on port 80
  docker run --name nginx -d -p 80:80 --restart unless-stopped -v /var/www/html:/usr/share/nginx/html nginx
  # change owner of static-dir
  sudo chown $USER /var/www/html

  # configure nginx for SPAs on subfolders
  docker exec nginx sh -c "
    echo '
    server {
      listen 80;
      server_name  localhost;
      root /usr/share/nginx/html;
      index index.html;
      rewrite ^/([^/]+)/$ /\\\$1 permanent;
      location / {
        try_files \\\$uri =404;
      }
      location ~ ^/([^/]+).*$ {
        try_files \\\$uri /\\\$1/index.html =404;
      }
    }' > /etc/nginx/conf.d/default.conf;
    nginx -t
    nginx -s reload
  "

fi

# --- BASIC SETUP ---

EOF