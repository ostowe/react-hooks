// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import {
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  fetchPokemon,
} from '../pokemon'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  )
}

const createUpdater = (updatedState) => (prevState) => ({
  ...prevState,
  ...updatedState,
});

function PokemonInfo({ pokemonName }) {
  const [state, setState] = React.useState({
    status: 'idle',
    error: null,
    pokemond: null,
  });

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }

    setState(createUpdater({ status: 'pending' }));

    fetchPokemon(pokemonName)
      .then((pokemonData) => {
        setState(createUpdater({
          error: null,
          pokemon: pokemonData,
          status: 'resolved',
        }));
      })
      .catch((error) => {
        setState(createUpdater({
          error,
          pokemon: null,
          status: 'rejected',
        }));
      });
  }, [pokemonName]);

  switch (state.status) {
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />;

    case 'resolved':
      return <PokemonDataView pokemon={state.pokemon} />;

    case 'rejected':
      throw state.error;
      // return (
      //   <div role="alert">
      //     There was an error: <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
      //   </div>
      // );

    case 'idle':
    default:
      return <div>Submit a pokemon!</div>;
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <>
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        resetKeys={[pokemonName]}
      >
        <div className="pokemon-info-app">
          <div className="pokemon-info">
            <PokemonInfo pokemonName={pokemonName} />
          </div>
        </div>
      </ErrorBoundary>
    </>
  )
}

export default App
