const { expect } = require("chai")
const sinon = require("sinon")

const { isAuthenticated, isVerified, isAdmin } = require("../../../ideahacks/helpers/auth.js")

describe("ideahacks/helpers/auth.js...", () => {
	describe("isAuthentiated", () => {
		let next, req, res

		beforeEach(() => {
			// Before each test, reset spies and stubs
			next = sinon.spy()

			req = {
				isAuthenticated: function() {}
			}

			res = {
				redirect: sinon.spy()
			}
		})

		it("redirects unauthenticated users to /login", () => {
			sinon.stub(req, "isAuthenticated").returns(false)

			isAuthenticated(req, res, next)

			expect(next.calledOnce).to.be.false
			expect(res.redirect.calledOnce).to.be.true
			expect(res.redirect.firstCall.args[0]).to.equal("/login")
		})

		it("allows authenticated users to pass", () => {
			sinon.stub(req, "isAuthenticated").returns(true)

			isAuthenticated(req, res, next)

			expect(next.calledOnce).to.be.true
			expect(res.redirect.calledOnce).to.be.false
		})
	})

	describe("isVerified", () => {
		let next, req, res

		beforeEach(() => {
			// Before each test, reset spies and stubs
			next = sinon.spy()

			req = {
				isAuthenticated: function() {},
				user: {}
			}

			res = {
				redirect: sinon.spy()
			}
		})

		it("redirects unauthenticated users to /confirm", () => {
			sinon.stub(req, "isAuthenticated").returns(false)
			req.user.isVerified = true

			isVerified(req, res, next)

			expect(next.calledOnce).to.be.false
			expect(res.redirect.calledOnce).to.be.true
			expect(res.redirect.firstCall.args[0]).to.equal("/confirm")
		})

		it("redirects unverified users to /confirm", () => {
			sinon.stub(req, "isAuthenticated").returns(true)
			req.user.isVerified = false

			isVerified(req, res, next)

			expect(next.calledOnce).to.be.false
			expect(res.redirect.calledOnce).to.be.true
			expect(res.redirect.firstCall.args[0]).to.equal("/confirm")
		})

		it("allows authenticated and verified users to pass", () => {
			sinon.stub(req, "isAuthenticated").returns(true)
			req.user.isVerified = true

			isVerified(req, res, next)

			expect(next.calledOnce).to.be.true
			expect(res.redirect.calledOnce).to.be.false
		})
	})

	describe("isAdmin", () => {
		let next, req, res

		beforeEach(() => {
			// Before each test, reset spies and stubs
			next = sinon.spy()

			req = {
				isAuthenticated: function() {},
				user: {}
			}

			res = {
				redirect: sinon.spy()
			}
		})

		it("redirects unauthenticated users to /login", () => {
			sinon.stub(req, "isAuthenticated").returns(false)
			req.user.isAdmin = true

			isAdmin(req, res, next)

			expect(next.calledOnce).to.be.false
			expect(res.redirect.calledOnce).to.be.true
			expect(res.redirect.firstCall.args[0]).to.equal("/login")
		})

		it("redirects non-admin users to /login", () => {
			sinon.stub(req, "isAuthenticated").returns(true)
			req.user.isAdmin = false

			isAdmin(req, res, next)

			expect(next.calledOnce).to.be.false
			expect(res.redirect.calledOnce).to.be.true
			expect(res.redirect.firstCall.args[0]).to.equal("/login")
		})

		it("allows authenticated and admin-level users to pass", () => {
			sinon.stub(req, "isAuthenticated").returns(true)
			req.user.isAdmin = true

			isAdmin(req, res, next)

			expect(next.calledOnce).to.be.true
			expect(res.redirect.calledOnce).to.be.false
		})
	})
})
