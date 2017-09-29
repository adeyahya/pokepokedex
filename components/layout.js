import Head from 'next/head'
import Router from 'next/router'
import { Link } from '../routes'
import NProgress from 'nprogress'
import Navbar from './navbar'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default ({ children, title = 'PokePokeDex' }) => (
  <div className="container">
    <Head>
      <title>{ title }</title>
      <link rel="stylesheet" href="/static/nprogress.css"/>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    </Head>
    <Navbar></Navbar>

    { children }

    <style jsx>{`
      .container {
        max-width: 500px;
        min-height: 100vh;
        margin: 0 auto;
        background-color: white;
        padding: 1rem 20px 5rem;
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
        padding-top: 60px;
        background-color: #fbfbfb;
      }
    `}</style>
  </div>
)
