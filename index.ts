import * as core from '@actions/core'
import run from './scripts/branch-lane'

try {
  const wsDir: string = process.env.WSDIR!

  const branchName = process.env.GITHUB_REF?.split('/').slice(-1)[0]

  if (!branchName) {
    throw new Error('Branch name is not found')
  }

  run(branchName, wsDir)
} catch (error) {
  core.setFailed((error as Error).message)
}
