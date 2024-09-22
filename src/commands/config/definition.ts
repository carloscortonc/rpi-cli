import Cli from "cli-er";

const definition = Cli.defineCommand({
  description: "Read and update configuration values",
  options: {
    operation: {
      positional: 0,
      description: "Operation to execute",
      required: true,
      // not including `enum` to allow "config key" as alias of "config get key"
      default: "get",
      requires: (v) => (v === "set" ? ["key", "value"] : []),
    },
    key: {
      positional: 1,
      description: "Configuration key",
    },
    value: {
      positional: 2,
      description: "For `set` operation, value to update",
      requires: ["key"],
    },
  },
});
export default definition;
