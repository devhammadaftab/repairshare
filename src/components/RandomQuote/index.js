import './style.css';
import React, { Fragment, useEffect, useState } from "react";

function RandomQuote () {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetch('https://uselessfacts.jsph.pl/random.json')
      .then(response => response.json())
      .then(data => {
        setQuote(data);
        setLoading(false);
      });
  }, [])

  return (
    <div className='quoteWrapper'>
      {
        loading
          ? 'Loading quote...'
          : <Fragment>
            <div className='quotes'>
              {
                quote.text && (
                  <p className='quoteText'>
                    "{quote.text}"
                  </p>
                )
              }
              <div className='quoteLink'>
                <p>{quote.source}</p>
                {
                  quote.source_url &&
                  <a href={quote.source_url} target='_blank'>
                    <img src='/images/external-link.svg' alt='' />
                  </a>
                }
              </div>
            </div>
          </Fragment>
      }
    </div>
  );
}

export default RandomQuote;
