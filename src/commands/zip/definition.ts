import Cli from "cli-er";

const definition = Cli.defineCommand({
  description: "Generate a zip folder from the given location",
  options: {
    location: {
      description: "The location of the folder to zip",
      required: true,
      positional: 0,
    },
    destination: {
      description:
        'Final location for the generated zip. By default, this is obtained by concatenating ".zip" to `location`',
      positional: 1,
    },
  },
});
export default definition;
