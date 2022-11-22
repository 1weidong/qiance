const middleware = {}

middleware['terminal'] = require('../middleware/terminal.js')
middleware['terminal'] = middleware['terminal'].default || middleware['terminal']

export default middleware
