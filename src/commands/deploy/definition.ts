import Cli from "cli-er";

const definition = Cli.defineNamespace({
  description: "Deploy an application from a folder or file",
  default: "dockerc",
  options: {
    dockerc: {
      kind: "command",
      description: "Deploy a docker-compose application. Use '--' to include additional docker-compose options",
      options: {
        files: {
          kind: "option",
          description: "List of docker-compose files",
          type: "list",
          default: ["docker-compose.yaml"],
          aliases: ["files", "f"],
        },
        exclude: {
          kind: "option",
          description: 'List of paths to exclude from packaging e.g. "/dev"',
          type: "list",
          default: ["/dev", "/etc"],
          aliases: ["exclude", "e"],
        },
        dryRun: {
          kind: "option",
          description: "Verify the list of entries that will be packaged, without performing deploy",
          type: "boolean",
          aliases: ["--dry-run"],
        },
      },
    },
    docker: {
      kind: "command",
      description: "Deploy a docker application",
      options: {
        location: {
          description: "Location of the folder containing the application",
          required: true,
          positional: 0,
        },
        name: {
          description: "Name to tag the application. By default, the folder/file name will be used",
        },
        buildOnTarget: {
          kind: "option",
          description: "Build docker image on target machine instead of local",
          type: "boolean",
          aliases: ["build-on-target"],
          default: true,
        },
      },
    },
    web: {
      kind: "command",
      description: "Deploy a web application",
      options: {
        location: {
          description: "Location of the folder containing the application",
          required: true,
          positional: 0,
        },
        name: {
          description: "Name to tag the application. By default, the folder/file name will be used",
        },
      },
    },
    logs: {
      kind: "option",
      description: "Show container logs after the indicated time (seconds). Use value <= 0 to skip",
      type: "number",
      default: 5,
    },
  },
});

export default definition;
