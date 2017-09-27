import * as React from 'react'
import _ from 'lodash'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout'

function nameNicer(str) {
  return str.replace('-',' ')
}

class Post extends React.Component {
  static async getInitialProps({query}) {
    const res = await fetch(`http://pokeapi.salestock.net/api/v2/pokemon/${query.id}`)
    const data = await res.json()
    return {
      data: data
    }
  }

  componentDidMount() {
    console.log(this.props.data)
  }

  render() {
    return (
      <Layout>
        <h1>
          { this.props.data.name }
        </h1>
        <p>
          {this.props.data.types.map((x,i) =>
            <span index={i}>{x.type.name}, </span>
          )}
        </p>
        <img src={ this.props.data.sprites.front_default.replace('http://pokeapi.salestock.net/media/','https://raw.githubusercontent.com/PokeAPI/sprites/master/') } alt="" className="full"/>
        {_.filter(this.props.data.sprites, o => o).filter(x => x != this.props.data.sprites.front_default).map((image, index) =>
          <img src={image.replace('http://pokeapi.salestock.net/media/','https://raw.githubusercontent.com/PokeAPI/sprites/master/')} alt=""/>
        )}
        <h2>Abilities</h2>
        <ul>
          {this.props.data.abilities.map((x,i) =>
            <li key={i}>{nameNicer(x.ability.name)}</li>
          )}
        </ul>

        <h2>Moves</h2>
        {this.props.data.moves.map((x,i) =>
          <span key={i}>{nameNicer(x.move.name)}, </span>
        )}

        <h2>Stats</h2>
        <ul>
          {this.props.data.stats.map((x,i) =>
            <li key={i}>{nameNicer(x.stat.name)} : {x.base_stat}</li>
          )}
        </ul>


        <style jsx>{`
          h1 {
            margin: 0;
          }
          img.full {
            width: 100%;
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
