export interface User {
	id?: number;
	name: string;
	email: string;
}

export const users: User[] = [
	{
		id: 1,
		name: "faizan",
		email: "faizan@gmail.com",
	},
	{
		id: 2,
		name: "Salman",
		email: "faizan@gmail.com",
	},
	{
		id: 3,
		name: "Kashif",
		email: "faizan@gmail.com",
	},
];

export const findAllUsers = (): User[] => {
	return users;
};

export const createUser = (newUser: User): User => {
	const id = users.length + 1;
	const user = { ...newUser, id };
	users.push(user);
	return user;
};
