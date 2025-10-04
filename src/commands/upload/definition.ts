import Cli from "cli-er";

const definition = Cli.defineCommand({
  description: "Upload files to the server  ",
  options: {
    files: {
      description: "Location of the files to upload",
      required: true,
      positional: true,
    },
    destination: {
      description: 'Destination path on host (default: "~/registry/")',
      aliases: ["d", "dest"],
    },
  },
});

export default definition;
