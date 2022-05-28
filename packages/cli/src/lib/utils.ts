import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

/**
 * Check a directory path
 * @param filePath <string> - the absolute or relative path.
 * @returns <boolean> true if the path exists, otherwise false.
 */
const directoryExists = (filePath: string): boolean => fs.existsSync(filePath)

/**
 * Read and return an object of a local JSON file located at a specific path.
 * @param filePath <string> - the absolute or relative path.
 * @returns <any>
 */
export const readJSONFile = (filePath: string): any => {
  if (!directoryExists(filePath)) throw new Error(`Oops, looks like that the provided file path does not exist!`)

  return JSON.parse(fs.readFileSync(filePath).toString())
}

/**
 * Read a local .json file at a given path.
 * @param filePath <string>
 * @returns <any>
 */
export const readLocalJsonFile = (filePath: string): any => {
  const filename = fileURLToPath(import.meta.url)
  const dirname = path.dirname(filename)

  return readJSONFile(path.join(dirname, filePath))
}
