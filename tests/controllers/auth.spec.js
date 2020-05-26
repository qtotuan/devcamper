const test = require('tape')
const sinon = require('sinon')
const { login } = require('../../controllers/auth')

test('Login: requires email and user', t => {
  t.plan(8)

  {
    const spy = sinon.spy()

    const mockReq = {
      body: {
        email: "foo@bar.de"
      }
    }
  
    login(mockReq, {}, spy)
  
    t.true(spy.called)
    t.equals(spy.args[0][0].name, 'Error', 'Next() was called with an error')
    t.equals(spy.args[0][0].statusCode, 400, 'Next() was called with 400 status code')
    t.equals(spy.args[0][0].message, 'Please provide an email and password', 'Next() was called with error message')
  }

  {
    const spy = sinon.spy()

    const mockReq = {
      body: {
        password: "123456"
      }
    }
  
    login(mockReq, {}, spy)
  
    t.true(spy.called)
    t.equals(spy.args[0][0].name, 'Error', 'Next() was called with an error')
    t.equals(spy.args[0][0].statusCode, 400, 'Next() was called with 400 status code')
    t.equals(spy.args[0][0].message, 'Please provide an email and password', 'Next() was called with error message')
  }

  t.end()
})
