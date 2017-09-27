import Link from 'next/link'
import Head from 'next/head'

export default ({ children, title = 'PokePokeDex' }) => (
  <div className="container">
    <Head>
      <title>{ title }</title>
    </Head>
    { children }

    <style jsx>{`
      .container {
        max-width: 500px;
        margin: 0 auto;
        background-color: white;
        padding: 0 15px 100px;
        box-sizing: border-box;
      }
    `}</style>
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }
      html,body {
        margin: 0;
        padding: 0;
      }
      body {
        font-family: SF Optimized, system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
        letter-spacing: -0.01em;
        font-size: 16px;
        background-color: #f9f9f9;
      }
    `}</style>
  </div>
)
