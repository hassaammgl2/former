
export const MOCK_FORMS = [
    {
        id: 'f1',
        title: 'Customer Satisfaction Survey',
        description: 'Help us improve our service by providing feedback.',
        status: 'published',
        submissionsCount: 124,
        createdAt: '2023-11-15T10:00:00Z',
        fields: [
            { id: 'field_1', type: 'heading', label: 'We value your feedback' },
            { id: 'field_2', type: 'text', label: 'Full Name', placeholder: 'John Doe', required: true },
            { id: 'field_3', type: 'email', label: 'Email Address', placeholder: 'john@example.com', required: true },
            { id: 'field_4', type: 'select', label: 'How did you find us?', options: ['Google', 'Social Media', 'Friend', 'Ads'] },
            { id: 'field_5', type: 'textarea', label: 'Your Comments', placeholder: 'Tell us more...' }
        ]
    },
    {
        id: 'f2',
        title: 'Job Application Form',
        description: 'Join our growing team at Acme Corp.',
        status: 'draft',
        submissionsCount: 0,
        createdAt: '2023-12-01T14:30:00Z',
        fields: [
            { id: 'j_1', type: 'text', label: 'Position Applied For', required: true },
            { id: 'j_2', type: 'file', label: 'Resume/CV', required: true }
        ]
    }
];

export const MOCK_SUBMISSIONS = [
    {
        id: 's1',
        formId: 'f1',
        submittedAt: '2023-12-05T09:15:00Z',
        data: {
            field_2: 'Alice Smith',
            field_3: 'alice@example.com',
            field_4: 'Google',
            field_5: 'Great service, really impressed!'
        }
    },
    {
        id: 's2',
        formId: 'f1',
        submittedAt: '2023-12-05T11:20:00Z',
        data: {
            field_2: 'Bob Johnson',
            field_3: 'bob@gmail.com',
            field_4: 'Ads',
            field_5: 'Pricing is a bit high, but quality is top notch.'
        }
    }
];