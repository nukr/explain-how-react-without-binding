import test from 'ava'

function A (a) {
  this.a = a
}

A.prototype.onAdd = function onAdd () {
  return this
}

A.prototype.render = function renderA () {
  let b = new B('b', () => this.onAdd())
  return b.func()
}

function B (a, func) {
  this.a = a
  this.func = func
}

test((t) => {
  let a = new A('a')
  t.true(a.onAdd() instanceof A)
})

test((t) => {
  let a = new A('a')
  let b = new B('b', a.onAdd)
  t.true(b.func() instanceof B)
})

test((t) => {
  let a = new A('a')
  let b_ = new B('b_', () => a.onAdd())
  t.true(b_.func() instanceof A)
})
