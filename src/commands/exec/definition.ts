import Cli from "cli-er";

const definition = Cli.defineCommand({
  description: "Execute a command or file script on the server",
  options: {
    args: {
      type: "string",
      description: "Command, or path to a bash script to execute",
      positional: true,
      required: true,
      stdin: true,
    },
  },
});

export default definition;
