import * as fs from 'fs'

const template= function (fileName = 'demo') {
    return `import * as React from 'react'
import { View, Text, Image } from 'remax/ali'
import styles from './${fileName}.css'

export default () => {
  return (
    <View className="">
    </View>
  )
}`
}

export function fileExist(path:string) {
   try{
      fs.statSync(path)
      return  true
   } catch {
     return false
   }
}

export default function createTemplate(path:string|undefined = '', fileName:string) {
  // const encoding = { encoding: 'utf8'}
  fs.mkdirSync(`${path}/${fileName}`)
  fs.appendFileSync(`${path}/${fileName}/${fileName}.js`, template(fileName))
  fs.appendFileSync(`${path}/${fileName}/${fileName}.css`, '')
}