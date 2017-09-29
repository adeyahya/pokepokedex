import { Link } from '../routes'

export default () => {
  return (
    <nav>
      <div className="container">
        <Link route="/">
          <a>PokePokeDex</a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          display: inline-block;
          z-index: 99;
        }

        nav .container {
          max-width: 500px;
          margin: 0 auto;
          background-color: #3F51B5;
          padding: 10px 20px;
          box-sizing: border-box;
          padding: 10px 20px;
          font-size: 2rem;
        }

        nav a {
          text-decoration: none;
          color: white;
        }

        nav a:hover {
          text-decoration: none;
          color: #fbfbfb;
        }
      `}</style>
    </nav>
  )
}
