import * as React from 'react'
import { Router } from '../routes'

class Search extends React.Component {
  constructor() {
    super()
    this.handleForm = this._handleForm.bind(this)
    this.handleFormAbility = this._handleFormAbility.bind(this)
  }

  _handleForm(e) {
    e.preventDefault()
    Router.pushRoute('post', {id: this.input.value})
  }

  _handleFormAbility(e) {
    e.preventDefault()
    Router.pushRoute('ability', {name: this.inputAbility.value})
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.handleForm }>
          <input type="text" placeholder="Search pokemon by id/name" ref={ input => this.input = input }/>
          <button type="submit">Search</button>
        </form>
        <form onSubmit={ this.handleFormAbility }>
          <input type="text" placeholder="Filter pokemon by ability name" ref={ input => this.inputAbility = input }/>
          <button type="submit">Filter Pokemon</button>
        </form>

        <style jsx>{`
          form {
            display: flex;
            width: 100%;
            margin-bottom: 1rem;
          }

          form input {
            flex: 1 0 0;
          }
        `}</style>
      </div>
    )
  }
}

export default Search
