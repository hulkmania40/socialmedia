import React from 'react'

import love from '../images/love.png'
import '../css/Footer.css'

export default function Footer() {
  return (
    <div className='container-fluid text-center footer-main'>
      &copy; 2022 | Social Media App | All Rights Reserved | Made with <img src={love} alt="love" /> by Mubashir
        <a className='attribute' href="https://www.flaticon.com/free-icons/share" title="share icons">Share icons created by Freepik - Flaticon</a>
    </div>
  )
}
