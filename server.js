const http = require('http')

const todos = [
  { id: 1, text: 'Do the thing' },
  { id: 2, text: 'Another thing to do' },
  { id: 3, text: 'That one thing' },
  { id: 4, text: 'Thing for the thing' },
]

const server = http.createServer((request, response) => {
  const { method, url } = request

  let body = []
  request
    .on('data', chunk => {
      body.push(chunk)
    })
    .on('end', () => {
      body = Buffer.concat(body).toString()

      // 404 by default
      let statusCode = 404
      const responseObject = {
        success: false,
        data: null,
        error: null,
      }

      if (method === 'GET' && url === '/todos') {
        statusCode = 200
        responseObject.success = true
        responseObject.data = todos
      } else if (method === 'POST' && url === '/todos') {
        const { id, text } = JSON.parse(body)

        if (!id || !text) {
          // bad request
          statusCode = 400
          responseObject.error = 'missing id or text'
        } else {
          statusCode = 201
          todos.push({ id, text })
          responseObject.success = true
          responseObject.data = todos
        }
      }

      response.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'x-powered-by': 'Node.js',
      })

      response.end(JSON.stringify(responseObject))
    })
})

const PORT = 5000
server.listen(PORT, () => console.log(`🟡 Server Running on ${PORT}`))
