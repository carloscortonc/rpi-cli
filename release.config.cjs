const isPreview = !!process.env.DRY_RUN;

module.exports = {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    ["@semantic-release/release-notes-generator", { writerOpts: { commitGroupsSort: ["feat", "fix"] } }],
    "@semantic-release/changelog",
    ...(isPreview ? [] : ["@semantic-release/npm"]),
    "semantic-release-export-data",
    ["@semantic-release/git", { message: "chore(release): ${nextRelease.version}" }],
    [
      "@saithodev/semantic-release-backmerge",
      {
        backmergeBranches: [{ from: "main", to: "develop" }],
        backmergeStrategy: "merge",
        message: "chore(release): ${nextRelease.version} - sync main to develop",
      },
    ],
    ["@semantic-release/github", { successComment: false, failComment: false }],
  ],
};
