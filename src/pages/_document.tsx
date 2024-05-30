import { Head, Html, Main, NextScript } from 'next/document'

import { initPocketBase } from '@/lib/pocketbase'

initPocketBase()

const Document: React.FC = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
