const test = require('tape')
const sinon = require('sinon')
const { getCourses } = require('../../controllers/courses')
const Course = require('../../models/Course')

test('Courses: get all courses', async t => {
  const expectedCourses = ['a', 'b']

  const req = { params: {} }

  const res = {
    status: sinon.stub(),
    json: sinon.stub(),
    advancedResults: expectedCourses
  }
  res.status.returns(res)

  await getCourses(req, res, () => {})

  t.ok(res.status.calledWith(200), 'status 200')
  t.ok(res.json.calledWith(expectedCourses), 'json() was called with expected courses')

  t.end()
})

test('Courses: get all courses by bootcamp', async t => {
  sinon.stub(Course, 'find')

  const expectedCourses = ['Course 1', 'Course 2']
  Course.find.returns(expectedCourses)

  const req = {
    params: { bootcampId: 'abc' }
  }

  const res = {
    status: sinon.stub(),
    json: sinon.stub(),
    advancedResults: expectedCourses
  }
  res.status.returns(res)

  await getCourses(req, res, () => {})

  t.ok(res.status.calledWith(200), 'status 200')
  t.ok(res.json.calledWith({
    success: true,
    count: 2,
    data: expectedCourses
  }), 'json() was called with expected courses')

  Course.find.restore()
  t.end()
})
