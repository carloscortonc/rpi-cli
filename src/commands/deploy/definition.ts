import Cli from "cli-er";

const definition = Cli.defineCommand({
  description: "Deploy an application from a folder",
  options: {
    location: {
      description: "Location of the folder containing the application",
      required: true,
      positional: 0,
    },
    type: {
      description: "Type of application to deploy",
      enum: ["docker", "web"] as const,
      default: "docker",
    },
    name: {
      description: "Name to tag the application. By default, the folder/file name will be used",
    },
    buildOnTarget: {
      description: "Build docker image on target machine instead of local",
      type: "boolean",
      aliases: ["build-on-target"],
      default: true,
    },
    variables: {
      description: "List of variables for docker applications in <KEY>=<VALUE> format, e.g. PORT=8080",
      aliases: ["vars"],
      type: "list",
      default: [],
    },
  },
});

export default definition;
