import { exec } from '@actions/exec'

/**
 *
 */
const run = async (laneName: string, wsdir: string): Promise<void> => {
  const org = process.env.ORG
  const scope = process.env.SCOPE

  await exec('bit status --strict', [], { cwd: wsdir })
  await exec(`bit lane create ${laneName}`, [], { cwd: wsdir })
  await exec('bit snap -m "CI" --build', [], { cwd: wsdir })

  try {
    await exec(
      `bit lane remove ${org}.${scope}/${laneName} --remote --silent --force`,
      [],
      { cwd: wsdir }
    )
  } catch (error) {
    console.log(`Cannot remove bit lane: ${error}. Lane may not exist`)
  }

  await exec('bit export', [], { cwd: wsdir })
}

export default run
