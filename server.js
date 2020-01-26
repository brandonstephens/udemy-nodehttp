const http = require('http')

const todos = [
  { id: 1, text: 'Do the thing' },
  { id: 2, text: 'Another thing to do' },
  { id: 3, text: 'That one thing' },
  { id: 4, text: 'Thing for the thing' },
]

const server = http.createServer((request, response) => {
  // response.statusCode = 200
  // response.setHeader('Content-Type', 'application/json')
  // response.setHeader('x-powered-by', 'Node.js')
  response.writeHead(200, {
    'Content-Type': 'application/json',
    'x-powered-by': 'Node.js',
  })

  let body = []
  request
    .on('data', chunk => {
      body.push(chunk)
    })
    .on('end', () => {
      body = Buffer.concat(body).toString()
      console.log(body)
    })

  console.log(request.headers.authorization)

  // response.write(JSON.stringify(todos))
  response.end(JSON.stringify({ success: true, data: todos }))
})

const PORT = 5000
server.listen(PORT, () => console.log(`🟡 Server Running on ${PORT}`))
