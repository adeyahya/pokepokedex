import * as React from 'react'
import { Link, Router } from '../routes'
import Layout from '../components/layout'

class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      pokemon: [],
      isLoading: false,
      isError: false,
      errorMessage: ''
    }

    this.loadMore = this._loadMore.bind(this)
  }

  async componentDidMount() {
    this.setState({
      isLoading: true
    })

    const res = await fetch('http://pokeapi.salestock.net/api/v2/pokemon/')
    const data = await res.json()

    this.setState({
      isLoading: false,
      pokemon: data.results,
      nextPayload: data.next,
      totalPokemon: data.count
    })

    this.loadMore()
    this.loadMore()
  }

  async _loadMore() {
    this.setState({
      isLoading: true
    })

    const res = await fetch(this.state.nextPayload)
    const data = await res.json()

    this.setState({
      isLoading: false,
      pokemon: [...this.state.pokemon,...data.results],
      nextPayload: data.next
    })
  }

  render () {
    return (
      <Layout>
        <ul>
          { this.state.pokemon.map((poke, index) =>
            <li key={ index }>
              <Link route='post' params={{ id: index + 1 }}>
                <a>
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={poke.name}/>
                  <h2>{poke.name}</h2>
                </a>
              </Link>
            </li>
          ) }
        </ul>
        { !this.state.isLoading && this.state.nextPayload != null
        ? <button onClick={ this.loadMore }>Load More</button>
        : null }
        <style jsx>{`
          ul {
            margin: 0;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
          }

          ul li {
            list-style: none;
            padding: 0;
            margin: 0;
            margin-bottom: 15px;
            text-align: center;
            flex: 33.3333% 0 0;
          }

          h2 {
            margin-top: 0;
            font-size: 1.3rem;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Index
