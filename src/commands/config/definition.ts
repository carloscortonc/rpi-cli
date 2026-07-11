import Cli from "cli-er";

const definition = Cli.defineNamespace({
  description: "Read and update configuration values",
  default: "get",
  options: {
    get: {
      kind: "command",
      description: "Read configuration values (default command, can be ommited)",
      usage: "config [key]",
      options: {
        key: { kind: "option", type: "string", positional: 0, description: "Configuration key to read" },
      },
    },
    set: {
      kind: "command",
      description: "Update configuration values",
      options: {
        key: { kind: "option", type: "string", positional: 0, description: "Configuration key to set", required: true },
        value: {
          kind: "option",
          type: "string",
          positional: 1,
          description: "Configuration value to set",
          required: true,
        },
      },
    },
    del: {
      kind: "command",
      aliases: ["delete"],
      description: "Remove configuration values",
      options: {
        key: {
          kind: "option",
          type: "string",
          positional: 0,
          description: "Configuration key to delete",
          required: true,
        },
      },
    },
  },
});
export default definition;
