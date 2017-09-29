import * as React from 'react'
import _ from 'lodash'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout'
import { nameNicer, getPokemonId } from '../lib'
import { Link } from '../routes'

class Abilities extends React.Component {
  static async getInitialProps({query, req}) {
    //remove all space with -, transform to lower case
    const name = decodeURIComponent(query.name).replace(/\s/g,"-").toLowerCase()
    const res = await fetch(`http://pokeapi.salestock.net/api/v2/ability/${name}`)
    const data = await res.json()
    return {
      data: data,
      status: res.status
    }
  }

  constructor() {
    super()
    this.state = {
      pokemon: [],
      isLoading: false,
      isError: false,
      errorMessage: '',
      imagesDir: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
    }
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    const {
      name,
      pokemon,
      effect_entries
    } = this.props.data

    if (this.props.status != 200) {
      return (
        <Layout>
          <h1>
            { this.props.status === 404
            ? "Pokemon not found!"
            : "Error Fetching Data!"}
          </h1>
        </Layout>
      )
    } else {
      return (
        <Layout>
          <h1>Pokemon with <span className="capitalize">{nameNicer(name)}</span> Ability</h1>
          <p>{effect_entries[0].effect}</p>
          <ul>
            { pokemon.map((poke, index) =>
              <li key={ index }>
                <Link route='post' params={{ id: getPokemonId(poke.pokemon.url) }}>
                  <a>
                    <figure>
                      <img src={`${ this.state.imagesDir + getPokemonId(poke.pokemon.url) }.png`} alt={poke.name}/>
                    </figure>
                    <h2>{nameNicer(poke.pokemon.name)}</h2>
                  </a>
                </Link>
              </li>
            )}
          </ul>

          <style jsx>{`
            span.capitalize {
              text-transform: capitalize;
              color: #3f51b5;
            }
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
}

export default Abilities
