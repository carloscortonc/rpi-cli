List of available commands

# `init`
Perform initial configuration on a server
```
Usage:  rpi init

Initialize server tools and configuration
```

# `deploy`
Deploy an application

## `deploy.dockerc`
```
Usage:  rpi deploy dockerc [OPTIONS]

Deploy a docker-compose application

Options:
  --files, -f    List of docker-compose files (default: ["docker-compose.yaml"])
  --exclude, -e  List of paths to exclude from packaging e.g. "/dev" (default: ["/dev", "/etc"])
  --dry-run      Verify the list of entries that will be packaged, without performing deploy
  --logs         Show container logs after the indicated time (seconds). Use value <= 0 to skip (default: 5)
  -h, --help     Display global help, or scoped to a namespace/command
```

## `deploy.docker`
```
Usage:  rpi deploy docker <location> [OPTIONS]

Deploy a docker application

Options:
  --location         Location of the folder containing the application
  --name             Name to tag the application. By default, the folder/file name will be used
  --vars             List of variables for docker applications in <KEY>=<VALUE> format, e.g. PORT=8080 (default: [])
  --envfile          Environment variables file to provide when running the container
  --build-on-target  Build docker image on target machine instead of local (default: true)
  --logs             Show container logs after the indicated time (seconds). Use value <= 0 to skip (default: 5)
```

## `deploy.web`
```
Usage:  rpi deploy web <location> [OPTIONS]

Deploy a web application

Options:
  --location         Location of the folder containing the application
  --name             Name to tag the application. By default, the folder/file name will be used
  --build-on-target  Build docker image on target machine instead of local (default: true)
  --logs             Show container logs after the indicated time (seconds). Use value <= 0 to skip (default: 5)
```

# `config`
Manage configuration

## `config.get`
```
Usage:  rpi config get [key]

Read configuration values

Options:
  --key       Configuration key to read
```

## `config.set`
```
Usage:  rpi config set <key> <value>

Update configuration values

Options:
  --key       Configuration key to set
  --value     Configuration value to set
```