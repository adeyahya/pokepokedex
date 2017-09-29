import * as React from 'react'
import _ from 'lodash'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout'
import { nameNicer, getPokemonId } from '../lib'
import { Link } from '../routes'

class Post extends React.Component {
  static async getInitialProps({query, req}) {
    let theId = query.id.replace(/\s/g,'').toLowerCase()
    const res = await fetch(`http://pokeapi.salestock.net/api/v2/pokemon/${theId}`)
    const data = await res.json()
    return {
      data: data,
      status: res.status,
      idType: isNaN(theId) ? "string" : "number"
    }
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    const {
      name,
      types,
      abilities,
      moves,
      sprites,
      stats
    } = this.props.data

    if (this.props.status !== 200) {
      return (
        <Layout>
          <h1>
            {this.props.status === 404
            ? `Can't find any pokemon with ${this.props.idType === 'number' ? "Id" : "Name" } ${ decodeURIComponent(this.props.url.query.id) }`
            : `${this.props.status} Server Error!`}
          </h1>
        </Layout>
      )
    }

    return (
      <Layout>
        <h1>{nameNicer(name)}</h1>
        <p>
          {types.map((x,i) =>
            <span className="type" key={i}>{x.type.name}</span>
          )}
        </p>
        <img src={ sprites.front_default }/>
        {_.filter(sprites, o => o).filter(x => x != sprites.front_default).map((image, index) =>
          <img key={index} src={image}/>
        )}
        <h2>Abilities</h2>
        <ul>
          {abilities.map((x,i) =>
            <li key={i}>
              <Link route={`/ability/${x.ability.name}`}>
                <a>{nameNicer(x.ability.name)}</a>
              </Link>
            </li>
          )}
        </ul>

        <h2>Stats</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
          {stats.map((x,i) =>
            <tr key={i}>
              <td>{nameNicer(x.stat.name)}</td>
              <td>{x.base_stat}</td>
            </tr>
          )}
          </tbody>
        </table>

        <h2>Moves</h2>
        {moves.map((x,i) =>
          <span key={i}>{nameNicer(x.move.name)}, </span>
        )}

        <style jsx>{`
          table {
            width: 100%;
            max-width: 100%;
            margin-bottom: 1rem;
            background-color: transparent;
            border-collapse: collapse;
          }
          table thead th {
            vertical-align: bottom;
            border-bottom: 2px solid #e9ecef;
          }
          table th {
            vertical-align: top;
            padding: .75rem;
            border-top: 1px solid #e9ecef;
            text-align: left;
          }

          table td {
            padding: .75rem;
            vertical-align: top;
            border-top: 1px solid #e9ecef;
          }

          ul {
            padding: 0;
            margin: 0;
          }

          ul li {
            list-style: none;
            display: inline-block;
            margin-right: 12px;
            font-size: 1.4rem;
          }

          span.type {
            background: #3f51b5;
            margin: 0;
            margin-right: 10px;
            padding: 5px 15px;
            color: white;
            border-radius: 50px;
          }
          h1 {
            margin: 0;
            text-transform: capitalize;
          }
          span, li {
            text-transform: capitalize;
            line-height: 1.5;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Post
