List of available commands

# `init`
Perform initial configuration on a server
```sh
Usage:  rpi init

Initialize server tools and configuration
```

# `deploy`
Deploy an application

## `deploy.dockerc`
```sh
Usage:  rpi deploy dockerc [OPTIONS]

Deploy a docker-compose application

Options:
  --files, -f    List of docker-compose files (default: ["docker-compose.yaml"])
  --exclude, -e  List of paths to exclude from packaging e.g. "/dev" (default: ["/dev", "/etc"])
  --dry-run      Verify the list of entries that will be packaged, without performing deploy
  --logs         Show container logs after the indicated time (seconds). Use value <= 0 to skip (default: 5)
```

## `deploy.docker`
```sh
Usage:  rpi deploy docker <location> [OPTIONS]

Deploy a docker application

Options:
  --location         Location of the folder containing the application
  --name             Name to tag the application. By default, the folder/file name will be used
  --build-on-target  Build docker image on target machine instead of local (default: true)
  --logs             Show container logs after the indicated time (seconds). Use value <= 0 to skip (default: 5)
```

Example:
```sh
rpi deploy ./dist --name=server -- -e PORT=8080 -p 8080:8080 --privileged --restart=unless-stopped
```

> [!TIP]
> For more complex parameters, transition to a docker-compose.yaml file and simply use `rpi deploy`

## `deploy.web`
```sh
Usage:  rpi deploy web <location> [OPTIONS]

Deploy a web application

Options:
  --location         Location of the folder containing the application
  --name             Name to tag the application. By default, the folder/file name will be used
  --build-on-target  Build docker image on target machine instead of local (default: true)
  --logs             Show container logs after the indicated time (seconds). Use value <= 0 to skip (default: 5)
```

# `exec`

```sh
Usage:  rpi exec <args...>

Execute a command or file script on the server

Options:
  --args      Command, or path to a bash script to execute
```

# `upload`

```sh
Usage:  rpi upload <files...> [OPTIONS]

Upload files to the server

Options:
  --files     Location of the files to upload
  -d, --dest  Destination path on host (default: "~/registry/")
```

# `config`
Manage configuration

## `config.get`
```sh
Usage:  rpi config get [key]

Read configuration values

Options:
  --key       Configuration key to read
```

## `config.set`
```sh
Usage:  rpi config set <key> <value>

Update configuration values

Options:
  --key       Configuration key to set
  --value     Configuration value to set
```