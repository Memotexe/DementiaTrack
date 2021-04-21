describe('Given the Login Screen', () => 
{
  it('When we enter correct credentials and press login, we are taken to the dashboard', () => 
  {
    cy.visit('localhost:8000/#/login')

    cy.get('.form-control').first()
      .type('test')

    cy.get('.form-control').last()
      .type('test')

    cy.get('.btn-primary')
      .click()

    cy.contains('Dashboard')
  })

  it('When we enter incorrect credentials and press login, we are left on the login screen', () => 
  {
    cy.visit('localhost:8000/#/login')

    cy.get('.form-control').first()
      .type('test')

    cy.get('.form-control').last()
      .type('bad')

    cy.get('.btn-primary')
      .click()

    cy.contains('Login')
  })

  it('When we press the register link, we are taken to the register page', () => 
  {
    cy.visit('localhost:8000/#/login')

    cy.contains('Register')
      .click()

    cy.contains('Confirm Password')
  })
})

describe('Given the register screen', () =>
{
  it('When we press the login link, we are taken to the login page', () => 
  {
    cy.visit('localhost:8000/#/register')

    cy.contains('Login')
      .click()

    cy.contains('Don\'t have an account?')
  })
})