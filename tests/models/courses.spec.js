const test = require('tape')
const Course = require('../../models/Course')

test('Course', t => {
  const course = new Course()

  // Make sure that 'user', 'bootcamp', 'minimumSkill', 'tuition', 'weeks', 'description', 'title' are required
  course.validate(err => {
    t.ok(err.errors.user)
    t.ok(err.errors.bootcamp)
    t.ok(err.errors.title)
    t.ok(err.errors.description)
    t.ok(err.errors.weeks)
    t.ok(err.errors.tuition)
    t.ok(err.errors.minimumSkill)
    t.end()
  })
})
