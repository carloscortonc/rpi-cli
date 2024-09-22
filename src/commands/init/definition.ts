import Cli from "cli-er";

const definition = Cli.defineCommand({
  description: "Initialize server tools and configuration",
  options: {
    /* id: {
      description:
        "Identifier for the server. Leave blank to set as default server",
      positional: 0,
      default: "default",
    }, */
  },
});

export default definition;
