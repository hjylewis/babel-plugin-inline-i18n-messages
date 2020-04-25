import React, {useReducer, Suspense} from 'react'

const OtherComponent = React.lazy(() => import('./OtherComponent'));

export default () => {
  const [load, toggle] = useReducer((load) => !load, false);

  if (!load) {
    return (
      <button onClick={toggle}>Load Code split bundle</button>
    )
  } else {
    return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
    )
  }
}