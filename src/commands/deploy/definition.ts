import Cli from "cli-er";

const definition = Cli.defineCommand({
  description: "Deploy an application from a zip file",
  options: {
    location: {
      description: "Location of the zip file containing the application",
      required: true,
      positional: 0,
    },
    type: {
      description: "Type of application to deploy",
      enum: ["docker", "web"] as const,
      default: "docker",
    },
    variables: {
      description:
        "List of variables for docker applications in <KEY>=<VALUE> format, e.g. PORT=8080",
      aliases: ["vars"],
      type: "list",
      default: [],
    },
  },
});

export default definition;
