<h1 align="center">rpi-cli</h1>

<p align="center">
  Cli utility for interacting with a server instance
</p>

## Target workflow - docker application

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

### Deploy on server

```sh
# create zip for target application
$ rpi zip project/dist project.zip
# deploy application
$ rpi deploy ./project.zip --vars PORT=8080
```

## Development

```sh
# install dependencies
yarn install
# build cli
yarn build-local
# link the package globally
npm link
# test cli
rpi -h
```
