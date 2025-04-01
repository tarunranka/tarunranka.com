export default {
	name: 'resume',
	title: 'Resume',
	type: 'object',
	fields: [
		{
			name: 'name',
			title: 'Full Name',
			type: 'string',
		},
		{
			name: 'email',
			title: 'Email',
			type: 'string',
		},
		{
			name: 'overview',
			title: 'Overview',
			type: 'array',
			of: [{ type: 'block' }],
		},
		{
			name: 'experience',
			title: 'Experience',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'role', title: 'Role', type: 'string' },
						{ name: 'company', title: 'Company', type: 'string' },
						{ name: 'duration', title: 'Duration', type: 'string' },
						{ name: 'technologies', title: 'Technologies', type: 'string' },
						{
							name: 'responsibilities',
							title: 'Responsibilities',
							type: 'array',
							of: [{ type: 'block' }],
						},
					],
				},
			],
		},
		{
			name: 'education',
			title: 'Education',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'institution', title: 'Institution', type: 'string' },
						{ name: 'degree', title: 'Degree', type: 'string' },
						{ name: 'duration', title: 'Duration', type: 'string' },
						{
							name: 'details',
							title: 'Details',
							type: 'array',
							of: [{ type: 'block' }],
						},
					],
				},
			],
		},
		{
			name: 'technologies',
			title: 'Technologies',
			type: 'array',
			of: [{ type: 'string' }],
		},
		{
			name: 'databases',
			title: 'Databases',
			type: 'array',
			of: [{ type: 'string' }],
		},
		{
			name: 'tooling',
			title: 'Tooling',
			type: 'array',
			of: [{ type: 'string' }],
		},
	],
}
