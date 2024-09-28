List of available commands

# `init`
```
Usage:  rpi init

Initialize server tools and configuration
```

# `deploy`
```
Usage:  rpi deploy <location> [OPTIONS]

Deploy an application from a folder

Options:
  --location         Location of the folder containing the application
  --type             Type of application to deploy (allowed: ["docker", "web"], default: "docker")
  --name             Name to tag the application. By default, the folder/file name will be used
  --build-on-target  Build docker image on target machine instead of local (default: true)
  --vars             List of variables for docker applications in <KEY>=<VALUE> format, e.g. PORT=8080 (default: [])
  --envfile          Environment variables file to provide when running the container
```

# `config`
```
Usage:  rpi config <operation> [key] [value]

Read and update configuration values

Options:
  --operation  Operation to execute (default: "get")
  --key        Configuration key
  --value      For `set` operation, value to update
```