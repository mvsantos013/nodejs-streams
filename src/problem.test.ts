import fs from 'fs'
import { transformFile } from './problem'
jest.setTimeout(30000)

describe('transformFile', () => {
  it('should transform the file correctly', async () => {
    const srcFile: string = 'test/fixtures/source.txt'
    const dstFile: string = 'test/fixtures/destination.txt'
    await transformFile(srcFile, dstFile)
    const expectedOutput = 'A B C D E.\nD E G F A.\nA B.\nJ K L.\n'

    const actualOutput = fs.readFileSync(dstFile, 'utf-8')
    expect(actualOutput).toEqual(expectedOutput)
  })

  it('should throw an error if the source file does not exist', async () => {
    const srcFile: string = 'nonexistent.txt'
    const dstFile: string = 'test/fixtures/destination.txt'

    await expect(transformFile(srcFile, dstFile)).rejects.toThrow(
      "ENOENT: no such file or directory, open 'nonexistent.txt'",
    )
  })
})
