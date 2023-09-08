import { test, expect, type Page } from '@playwright/test';

test.describe('Employees', () => {
	const testUser = {
		firstName: 'William',
		lastName: 'Randolph'
	};

	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	async function goToAddPage(page: Page) {
		await page.getByRole('navigation').getByRole('link', { name: 'Add' }).click();
	}

	async function addEmployee(
		page: Page,
		firstName = testUser.firstName,
		lastName = testUser.lastName
	) {
		await page.getByLabel('First name').fill(firstName);
		await page.getByLabel('Last name').fill(lastName);
		await page.getByLabel('Email').fill('w.randolph@example.com');
		await page.getByRole('button', { name: 'Save' }).click();
	}

	test('user can see the employees table', async ({ page }) => {
		await expect(page).toHaveTitle('Svelte EMS');
		await expect(page.getByRole('navigation')).toBeVisible();
		await expect(page.getByRole('heading', { name: 'All Employees' })).toBeVisible();
		await expect(page.getByRole('cell', { name: 'Full Name' })).toBeVisible();
	});

	test('user can add a new employee and be redirected to the profile page', async ({ page }) => {
		// Open the 'Add…' page and add one
		await goToAddPage(page);
		await expect(page.getByRole('heading', { name: 'Add an Employee' })).toBeVisible();
		await addEmployee(page);

		// Redirected to the newly added employee profile
		await page.waitForURL('/employees/*');
		await expect(page.getByRole('heading', { name: 'Employee Profile' })).toBeVisible();
		await expect(page.getByLabel('First name')).toHaveValue(testUser.firstName);
		await expect(page.getByLabel('Last name')).toHaveValue(testUser.lastName);
	});
	test('user can click an employee name in the table to see the profile', async ({ page }) => {
		// Create the employee to open
		await goToAddPage(page);
		await addEmployee(page);
		await page.goto('/');
		await expect(page.getByRole('heading', { name: 'All Employees' })).toBeVisible();

		// Open the employee profile
		await page
			.getByRole('link', { name: `${testUser.firstName} ${testUser.lastName}` })
			.last()
			.click();

		await expect(page.getByRole('heading', { name: 'Employee Profile' })).toBeVisible();
		await expect(page.getByLabel('First name')).toHaveValue(testUser.firstName);
	});

	test('user can delete an employee', async ({ page }) => {
		// Create the employee to delete
		await goToAddPage(page);

		// Use a unique test name so the final check does not catch one of the existing test users
		const testNameId = String(Date.now());
		const firstName = 'FirstName' + testNameId;
		const lastName = 'LastName' + testNameId;
		await addEmployee(page, firstName, lastName);

		await page.waitForURL('/employees/add');
		await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
		await page.getByRole('button', { name: 'Delete' }).click();

		await page.waitForURL('/');
		await expect(page.getByRole('heading', { name: 'All Employees' })).toBeVisible();
		await expect(page.getByRole('cell', { name: `${firstName} ${lastName}` })).not.toBeVisible();
	});
});
