# Create Bit Lane for each Git Branch for CI/CD Pipelines
For each new Branch in Git, a Bit lane is created in bit.cloud.

# GitHub Actions

This CD Task creates a Bit lane each Git Branch. Use it after creating the lane, use the `bit-tasks/commit-bitmap@v1` to update the Bitmap file.

## Inputs

### `ws-dir`

**Optional** The workspace directory path from the root. Default `"Dir specified in Init Task or ./"`.

## Example usage

**Note:** Use `bit-task/init@v1` as a prior step in your action before running Bit Verify. Also, use the `bit-tasks/commit-bitmap@v1` task after creating the new lane to update the Bitmap file in the branch.

```yaml
name: Test Bit Branch Lane
on:
  push:
    branches-ignore:
      - main # or your default branch
permissions:
  contents: write
jobs:
  release:
    runs-on: ubuntu-latest
    env:
      BIT_TOKEN: ${{ secrets.BIT_TOKEN }}
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Initialize Bit
        uses: bit-tasks/init@v1
        with:
          ws-dir: '<WORKSPACE_DIR_PATH>'
      - name: Bit Branch Lane
        uses: bit-tasks/branch-lane@v1
      - name: Bit Commit Bitmap
        uses: bit-tasks/commit-bitmap@v1
```

# Contributor Guide

Steps to create custom tasks in different CI/CD platforms.

## GitHub Actions

Go to the GithHub action task directory and build using NCC compiler. For example;

```
npm install
npm run build
git commit -m "Update task"
git tag -a -m "action release" v1 --force
git push --follow-tags
```

For more information refer [Create a javascript action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)

## GitLab CI/CD

For more information refer [Specify a custom CI/CD file](https://docs.gitlab.com/ee/ci/pipelines/settings.html#specify-a-custom-cicd-configuration-file)

## Azure DevOps

For more information refer [Add build task](https://learn.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops)
