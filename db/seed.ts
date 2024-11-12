import { clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO

	await db.insert(clients).values([
		{
			id: 1,
			name: 'John',
			lastName: 'Doe',
			age: 30,
			isActive: true
		},
		{
			id: 2,
			name: 'Matthew',
			lastName: 'Smith',
			age: 45,
			isActive: false
		},
		{
			id: 3,
			name: 'Jane',
			lastName: 'Doe',
			age: 25,
			isActive: true
		},
		{
			id: 4,
			name: 'Andrew',
			lastName: 'Wittaker',
			age: 30,
			isActive: false
		}
	])

	console.log('Seed executed');

}
