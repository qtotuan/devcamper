const test = require('tape')
const sinon = require('sinon')
const asyncHandler = require('../../middleware/async')

test('asyncHandler should call next when the inner function throws', async t => {
  const customError = new Error('Something went wrong')
  const next = sinon.spy()

  const wrappedFunc = asyncHandler(async (req, res, next) => {
    throw customError
  })

  await wrappedFunc(null, null, next)

  t.ok(next.called)
  t.ok(next.calledWith(customError))
  t.end()
})

test('asyncHandler should call next within the inner function correctly', async t => {
  const next = sinon.spy()

  const wrappedFunc = asyncHandler(async (req, res, next) => {
    next('custom text')
  })

  await wrappedFunc(null, null, next)

  t.ok(next.called)
  t.ok(next.calledWith('custom text'))
  t.end()
})

test('asyncHandler should call next when the inner function is non-async and throws', async t => {
  const customError = new Error('Something went wrong')
  const next = sinon.spy()

  const wrappedFunc = asyncHandler((req, res, next) => {
    next(customError)
  })

  wrappedFunc(null, null, next)

  t.ok(next.called)
  t.ok(next.calledWith(customError))
  t.end()
})

test('asyncHandler should call next within the inner non-async function correctly', async t => {
  const next = sinon.spy()

  const wrappedFunc = asyncHandler((req, res, next) => {
    next('custom text')
  })

  wrappedFunc(null, null, next)

  t.ok(next.called)
  t.ok(next.calledWith('custom text'))
  t.end()
})
