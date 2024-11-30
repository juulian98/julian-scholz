module.exports = {
  "*.{ts,html}": (fileNames) =>
    `ng lint ${fileNames.map((fileName) => `--lint-file-patterns=${fileName}`).join(" ")} --fix`,
  "!(*.ts|*.html)": (fileNames) => `prettier --write ${fileNames.join(" ")}`,
};
