import React from 'react'

import { Helmet ,HelmetProvider} from 'react-helmet-async'

import './not-found.css'

function NotFound() {
  return (
    <HelmetProvider>
      <div className="not-found-container">
        <Helmet>
          <title>404 - Not Found</title>
        </Helmet>
        <h3>OOPS! PAGE NOT FOUND</h3>
        <div className="not-found-container1">
          <h1 className="not-found-text1">404</h1>
        </div>
        <div className="not-found-container2">
          <h2 className="not-found-text2">
            WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND
          </h2>
        </div>
      </div>
    </HelmetProvider>
  )
}

export default NotFound
