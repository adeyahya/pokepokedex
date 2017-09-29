import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Link, Router } from '../routes'
import { nameNicer, getPokemonId } from '../lib'
import Layout from '../components/layout'
import intersectionObserver from '../lib/intersection-observer'

class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      pokemon: [],
      isLoading: false,
      isError: false,
      errorMessage: '',
      imagesDir: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      endpoint: 'http://pokeapi.salestock.net/api/v2/pokemon/'
    }
    this.loadData = this._loadData.bind(this)
    this.intersectCallback = this._intersectCallback.bind(this)
  }

  async _loadData() {
    this.setState({ isLoading: true })

    const res = await fetch(this.state.endpoint)
    const data = await res.json()

    this.setState({
      isLoading: false,
      pokemon: [
        ...this.state.pokemon,
        ...data.results
      ],
      endpoint: data.next
    })
  }

  _intersectCallback(entries, observer) {
    entries.map(entry => {
      if (entry.isIntersecting) {
        this.loadData()
      }
    })
  }

  componentDidMount() {
    // load initial data
    this.loadData()

    // call Intersection Observer on the client
    // when there is window and document available
    intersectionObserver(window, document)
    const node = ReactDOM.findDOMNode(this)
    // intersection observer options
    const options = {
      root: null,
      rootMargin: '0px 0px 50px 0px'
    }
    const observer = new IntersectionObserver(this.intersectCallback, options)
    observer.observe(node.querySelector("#bottom-page"))
  }

  render() {
    let { pokemon, isLoading, isError, endpoint } = this.state
    return (
      <Layout>
        <ul>
          { pokemon.map((poke, index) =>
            <li key={ index }>
              <Link route='post' params={{ id: getPokemonId(poke.url) }}>
                <a>
                  <figure>
                    <img src={`${ this.state.imagesDir + getPokemonId(poke.url) }.png`} alt={poke.name}/>
                  </figure>
                  <h2>{nameNicer(poke.name)}</h2>
                </a>
              </Link>
            </li>
          )}
        </ul>

        {isLoading && endpoint != null
        ? <p className="loading">Loading Pokemon</p> : null}
        {endpoint == null
        ? <p className="loading">There's no more pokemon</p> : null}

        <div id="bottom-page"></div>

        <style jsx>{`
          p.loading {
            text-align: center;
            font-size: 2rem;
            padding: 30px 0;
            margin: 0;
            color: #ababab;
          }
          figure {
            width: 100%;
            margin: 0;
            padding: 0;
            position: relative;
            height: 100px;
          }

          figure img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          ul {
            margin: 0;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
          }

          a {
            color: #333;
            text-decoration: none;
          }

          ul li {
            list-style: none;
            padding: 0;
            margin: 0;
            margin-bottom: 15px;
            text-align: center;
            flex: 33.3333% 0 0;
          }

          @media (max-width: 426px) {
            ul li {
              flex: 50% 0 0;
            }
          }

          h2 {
            margin-top: 0;
            font-size: 1.3rem;
            text-transform: capitalize;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Index
