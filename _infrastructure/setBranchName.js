const { CIRCLE_BRANCH } = process.env

const branchName =
  CIRCLE_BRANCH &&
  CIRCLE_BRANCH.replace('/npm_and_yarn', '')
    .replace(/[/|/.|_]/g, '-')
    .replace(/@/g, '')

console.log(branchName)

module.exports = branchName
