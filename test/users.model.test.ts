import { Developer, LeadDeveloper, ScrumMaster, ProductOwner } from "../src/models/users.model";

describe('Test class Developer', () => {

  it('Developer-log', () => {
    // Arguments
    const name1 = 'Oha';
    const email1 = 'Oha';
    const role1 = 'Oha';

    // Method call
    const developer = new Developer(name1, email1, role1);
    developer.log();
  });

  it('Developer-getRole', () => {
    // Arguments
    const name2 = 'Oha';
    const email2 = 'Oha';
    const role2 = 'Oha';

    // Method call
    const developer = new Developer(name2, email2, role2);
    const result = developer.getRole();

    // Expect result
    expect(result).not.toBe(undefined);
  });

  it('Developer-getEmail', () => {
    // Arguments
    const name3 = 'Oha';
    const email3 = 'Oha';
    const role3 = 'Oha';

    // Method call
    const developer = new Developer(name3, email3, role3);
    const result = developer.getEmail();

    // Expect result
    expect(result).not.toBe(undefined);

  });

  it('Developer-getDescription', () => {
    // Arguments
    const name4 = 'Oha';
    const email4 = 'Oha';
    const role4 = 'Oha';

    // Method call
    const developer = new Developer(name4, email4, role4);
    developer.getDescription();
  });

});

describe('Test class LeadDeveloper', () => {

  it('LeadDeveloper-log', () => {
    // Arguments
    const name5 = 'Oha';
    const email5 = 'Oha';
    const role5 = 'Oha';

    // Method call
    const leadDeveloper = new LeadDeveloper(name5, email5, role5);
    leadDeveloper.log();
  });

  it('LeadDeveloper-getRole', () => {
    // Arguments
    const name6 = 'Oha';
    const email6 = 'Oha';
    const role6 = 'Oha';

    // Method call
    const leadDeveloper = new LeadDeveloper(name6, email6, role6);
    const result = leadDeveloper.getRole();

    // Expect result
    expect(result).not.toBe(undefined);

  });

  it('LeadDeveloper-getEmail', () => {
    // Arguments
    const name7 = 'Oha';
    const email7 = 'Oha';
    const role7 = 'Oha';

    // Method call
    const leadDeveloper = new LeadDeveloper(name7, email7, role7);
    const result = leadDeveloper.getEmail();

    // Expect result
    expect(result).not.toBe(undefined);

  });

  it('LeadDeveloper-getDescription', () => {
    // Arguments
    const name8 = 'Oha';
    const email8 = 'Oha';
    const role8 = 'Oha';

    // Method call
    const leadDeveloper = new LeadDeveloper(name8, email8, role8);
    leadDeveloper.getDescription();
  });

});

describe('Test class ScrumMaster', () => {

  it('ScrumMaster-log', () => {
    // Arguments
    const name9 = 'Oha';
    const email9 = 'Oha';
    const role9 = 'Oha';

    // Method call
    const scrumMaster = new ScrumMaster(name9, email9, role9);
    scrumMaster.log();
  });

  it('ScrumMaster-getRole', () => {
    // Arguments
    const name10 = 'Oha';
    const email10 = 'Oha';
    const role10 = 'Oha';

    // Method call
    const scrumMaster = new ScrumMaster(name10, email10, role10);
    const result = scrumMaster.getRole();

    // Expect result
    expect(result).not.toBe(undefined);

  });

  it('ScrumMaster-getEmail', () => {
    // Arguments
    const name11 = 'Oha';
    const email11 = 'Oha';
    const role11 = 'Oha';

    // Method call
    const scrumMaster = new ScrumMaster(name11, email11, role11);
    const result = scrumMaster.getEmail();

    // Expect result
    expect(result).not.toBe(undefined);

  });

  it('ScrumMaster-getDescription', () => {
    // Arguments
    const name12 = 'Oha';
    const email12 = 'Oha';
    const role12 = 'Oha';

    // Method call
    const scrumMaster = new ScrumMaster(name12, email12, role12);
    scrumMaster.getDescription();
  });

});

describe('Test class ProductOwner', () => {

  it('ProductOwner-log', () => {
    // Arguments
    const name13 = 'Oha';
    const email13 = 'Oha';
    const role13 = 'Oha';

    // Method call
    const productOwner = new ProductOwner(name13, email13, role13);
    productOwner.log();
  });

  it('ProductOwner-getRole', () => {
    // Arguments
    const name14 = 'Oha';
    const email14 = 'Oha';
    const role14 = 'Oha';

    // Method call
    const productOwner = new ProductOwner(name14, email14, role14);
    const result = productOwner.getRole();

    // Expect result
    expect(result).not.toBe(undefined);

  });

  it('ProductOwner-getEmail', () => {
    // Arguments
    const name15 = 'Oha';
    const email15 = 'Oha';
    const role15 = 'Oha';

    // Method call
    const productOwner = new ProductOwner(name15, email15, role15);
    const result = productOwner.getEmail();

    // Expect result
    expect(result).not.toBe(undefined);

  });

  it('ProductOwner-getDescription', () => {
    // Arguments
    const name16 = 'Oha';
    const email16 = 'Oha';
    const role16 = 'Oha';

    // Method call
    const productOwner = new ProductOwner(name16, email16, role16);
    productOwner.getDescription();
  });

});
