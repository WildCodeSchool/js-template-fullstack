module.exports = {
  extends: ["@commitlint/config-conventional"],
  /*
   * Array of functions that return true if commitlint should ignore the given message.
   * The '() => true' function disable commitlint by default:
   * remove/change it to re-enable commitlint
   */
  ignores: [(/* commit */) => true],
};
