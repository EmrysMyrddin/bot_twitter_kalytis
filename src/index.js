import fetch from 'node-fetch'
import express from 'express'
import _ from 'lodash'

const app = express()

const ONE_GRAPH_SECRET_KEY = process.env.ONE_GRAPH_SECRET_KEY
const ONE_GRAPH_URL = process.env.ONE_GRAPH_URL
const PORT = Number(process.env.PORT || '4000')

let lastMessage = null
const messages = [
  'Non.',
  'Bien sûre que non.',
  'Toujours pas.',
  'La réponse est non.',
  "C'est non.",
  "Je... non.",
  "Oui !\n\n\n Non je rigole.",
  "Nope",
  "C'est pas pour aujourd'hui (et sûrement pas demain non plus)",
  "Évitons les questions qui fâchent",
  "Je serais encore la demain",
  "C'est pour bientôt ! (non)",
]

const message = () =>`${
  lastMessage = _.without(messages, lastMessage)[Math.floor(Math.random() * (messages.length -1))]
}
@Covage_News

@CovageIDF_OUEST
@orange
@Orange_conseil
@60millions
@UFCquechoisir
@Kalytis_
`

app.all('/tweet', async (req, res) => {
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
