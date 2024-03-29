import React, { useContext } from 'react'
import { AppContext } from "./AppContext"
import Login from './Login'
import SubmissionsContainer from './SubmissionsContainer'
import DealList from './DealList'
import MerchantsPage from './MerchantsPage'
import MerchantsDocumentsList from './MerchantsDocumentsList'
import PageNotFound from './PageNotFound'
import { Route, Switch } from 'react-router-dom'

function App() {

  const {user, isLoading} = useContext(AppContext)

  if (isLoading) return <div></div>
  if (!user) return <Login />

  return (

    <Switch>
      <Route exact path="/">
        <SubmissionsContainer />
      </Route>
      <Route exact path='/deal-list'>
        {user.boss ? <DealList /> : <PageNotFound />}
      </Route>
      <Route exact path='/deal-list/:name'>
        {user.boss ? <MerchantsPage /> : <PageNotFound />}
      </Route>
      <Route exact path='/deal-list/:name/documents'>
        {user.boss ? <MerchantsDocumentsList /> : <PageNotFound />}
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>  
  )
}
export default App