<h1 align="center">rpi-cli</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/rpi-cli" target="_blank">
    <img src="https://badgen.net/npm/v/rpi-cli" alt="NPM version">
  </a>
</p>

<p align="center">
  Cli utility for interacting with a server instance
</p>

## Installation

```sh
npm install rpi-cli
```

## Available commands

### `rpi init`
```
Usage:  rpi init

Initialize server tools and configuration
```

### `rpi deploy`
```
Usage:  rpi deploy <location> [OPTIONS]

Deploy an application from a folder

Options:
  --location         Location of the folder containing the application
  --type             Type of application to deploy (allowed: "docker", "web", default: "docker")
  --name             Name to tag the application. By default, the folder/file name will be used
  --build-on-target  Build docker image on target machine instead of local (default: true)
  --vars             List of variables for docker applications in <KEY>=<VALUE> format, e.g. PORT=8080 (default: [])
```

### `rpi config`
```
Usage:  rpi config <operation> [key] [value]

Read and update configuration values

Options:
  --operation  Operation to execute (default: "get")
  --key        Configuration key
  --value      For `set` operation, value to update
```

## Target workflow - Docker application

### File structure

```
.
└─ project
   ├── ...
   └── dist
      ├── Dockerfile
      └── ...
```

### Dockerfile content

Use `ARG` to declare variables passed with `rpi-deploy --vars` option (mainly `PORT`)

```Dockerfile
# ...

ARG PORT

EXPOSE $PORT

# ...
```

### Deploy

```sh
# deploy application - build on target server
$ rpi deploy dist --vars PORT=8080

# deploy application - build on local machine
$ rpi deploy dist --vars PORT=8080 --build-on-target=false
```

## Development

```sh
# install dependencies
npm i
# build cli
npm run build-local
# link the package globally
npm link
# test cli
rpi -h
```
