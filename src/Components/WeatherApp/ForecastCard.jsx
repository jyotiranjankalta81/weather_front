import React from 'react'

const ForecastCard = ({ date, temperature, conditions }) => {
  return (
    <div className='forecast-card'>
      <div className='date'>{date}</div>
      <div className='temperature'>{temperature}°C</div>
      <div className='conditions'>{conditions}</div>
    </div>
  )
}

export default ForecastCard
