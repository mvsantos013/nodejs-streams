/*
Author: Mateus Santos
Date: 2023-03-27
Description: This file solves the problem of reading a large file A and writing it
to a file B, but on even lines, the file B should have the second word skipped.
*/
import fs, { ReadStream, WriteStream } from 'fs'
import { Transform } from 'stream'
import { pipeline } from 'stream/promises'

export const transformFile = (srcFile: string, dstFile: string) => {
  // ReadStream for reading source file
  const readStream: ReadStream = fs.createReadStream(srcFile, {
    encoding: 'utf-8',
  })

  // WriteStream for writing to destination file
  const writeStream: WriteStream = fs.createWriteStream(dstFile, {
    encoding: 'utf-8',
  })

  let lineCount: number = 1 // auxiliary variable to count lines

  // TransformStream for applying the business logic transformation
  const transformStream: Transform = new Transform({
    transform: (chunk: string, encoding: string, cb: Function) => {
      const lines: string[] = chunk.toString().split('\n')
      // Iterate over lines in chunk
      for (let i = 0; i < lines.length; i++) {
        const line: string = lines[i]
        const words: string[] = line.split(' ')
        const isOdd: boolean = lineCount % 2 !== 0
        lineCount++
        if (isOdd) {
          // Odd lines don't get affected
          transformStream.push(`${line}\n`)
        } else {
          // Even lines loses the second word
          const firstWord: string = words[0]
          const newLine: string[] = [firstWord, ...words.slice(2)]
          transformStream.push(`${newLine.join(' ')}\n`)
        }
      }
      cb()
    },
  })
  return pipeline(readStream, transformStream, writeStream)
}

// const main = async () => {
//   transformFile('A.txt', 'B.txt')
//     .then(() => {
//       console.log('File A has been fully read and processed.')
//       console.log('File B has been written.')
//     })
//     .catch((err) => {
//       console.error('An error occurred:', err)
//     })
// }
// main()
