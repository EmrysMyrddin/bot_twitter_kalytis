import fetch from 'node-fetch'
import express from 'express'
import _ from 'lodash'

import messages from "./messages";
import footer from "./footer";

const app = express()

const ONE_GRAPH_SECRET_KEY = process.env.ONE_GRAPH_SECRET_KEY
const ONE_GRAPH_URL = process.env.ONE_GRAPH_URL
const PORT = Number(process.env.PORT || '4000')

let lastMessage = null

const message = () =>`${
  lastMessage = _.without(messages, lastMessage)[Math.floor(Math.random() * (messages.length -1))]
}${footer}`

app.all('/tweet', async (req, res) => {
  if(req.headers.authorization !== process.env.AUTHORIZATION_KEY) return res.status(403).send()
  
  const status = message()
  console.log(status)
  const result = await query({
    query: /* GraphQL */`
      mutation($status: String!) {
        twitter {
          postStatus(input: { status: $status }) {
            tweet {
              id
            }
          }
        }
      }
    `,
    variables: {
      status,
    }
  })
  
  res.setHeader("Content-Type", 'application/json')
  res.send(result)
})

app.listen(PORT, () => {
  console.info(`listening on port ${PORT}`)
})


async function query(operation) {
  const result = await fetch(ONE_GRAPH_URL, {
    method: 'POST',
    headers: {
      'Authentication': `Bearer ${ONE_GRAPH_SECRET_KEY}`
    },
    body: JSON.stringify(operation, null, 2)
  })
  
  if(!result.ok) throw result
  return result.json()
}
