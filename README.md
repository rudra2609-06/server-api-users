# User Management System

A modern, full-stack user management application built with Next.js, featuring create, read, update, and delete (CRUD) functionality with a beautiful dark-themed UI.

## Features

✨ **Core Features**

- ✅ Create new user profiles
- ✅ Edit existing user information
- ✅ Delete user records
- ✅ Search users by username
- ✅ View all users in a responsive data table
- ✅ Form validation with error messages
- ✅ Beautiful dark-themed UI with Tailwind CSS

🎨 **UI/UX Features**

- Responsive design
- Interactive data table with sorting and pagination
- Smooth hover effects and transitions
- Form field validation
- Real-time search functionality
- Color-coded badges for hobbies and gender
- Professional button interactions with scale and shadow effects

## Tech Stack

- **Frontend**: Next.js 14+, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **ODM**: Mongoose
- **HTTP Client**: Axios
- **Table Component**: React Data Table Component
- **Package Manager**: Bun

## Project Structure

```
server-api-users/
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── route.js              # GET and POST endpoints
│   │       └── [id]/
│   │           └── route.js          # GET, DELETE, PATCH, PUT endpoints
│   ├── axios/
│   │   └── apiInstance.js            # Axios configuration
│   ├── configs/
│   │   └── db.js                     # MongoDB connection
│   ├── models/
│   │   └── users.model.js            # User schema
│   ├── globals.css
│   ├── layout.js
│   └── page.js                       # Main user management page
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── README.md
```

## Installation

### Prerequisites

- Node.js 18+ or Bun runtime
- MongoDB database (local or cloud)

### Setup Steps

1. **Clone or navigate to the project directory**

   ```bash
   cd server-api-users
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory:

   ```
   MONGODB_URI=mongodb://localhost:27017/user-management
   ```

4. **Start the development server**

   ```bash
   bun dev
   # or
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## API Endpoints

### Users Collection

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| GET    | `/api/users`      | Fetch all users       |
| POST   | `/api/users`      | Create a new user     |
| GET    | `/api/users/[id]` | Get user by ID        |
| PATCH  | `/api/users/[id]` | Update user (partial) |
| PUT    | `/api/users/[id]` | Replace entire user   |
| DELETE | `/api/users/[id]` | Delete user by ID     |

### Request Body (User Creation/Update)

```json
{
  "username": "string (required)",
  "email": "string (required, unique)",
  "password": "string (required)",
  "gender": "male | female (required)",
  "phoneNumber": "string",
  "address": "string",
  "hobbies": ["string"]
}
```

## Data Model

### User Schema

```javascript
{
  username: String (required),
  email: String (required, unique),
  password: String (required),
  gender: String (enum: ["male", "female"], required),
  phoneNumber: String,
  address: String,
  hobbies: [String] (default: [])
}
```

## Usage

### Creating a User

1. Fill in the form with all required fields
2. Select gender (Male/Female)
3. Check hobbies (Photography, Hiking, Chess)
4. Click "Save User" button
5. User will appear in the table below

### Editing a User

1. Find the user in the table
2. Click the "Edit" button
3. Form will populate with user data
4. Make changes as needed
5. Click "Update User" to save changes
6. Click "Cancel" to discard changes

### Deleting a User

1. Find the user in the table
2. Click the "Delete" button
3. User will be removed from the database and table

### Searching Users

1. Use the search bar above the table
2. Type username to filter in real-time
3. Leave empty to show all users

## Form Validation

The form includes validation for:

- ✓ Username (required)
- ✓ Email (required)
- ✓ Password (required)
- ✓ Gender (required)
- ✓ Phone Number (required)
- ✓ Address (required)
- ✓ Hobbies (at least one required)

Error messages appear below each field if validation fails.

## Database Connection

The application uses Mongoose to connect to MongoDB. Update the connection string in your `.env.local` file:

```
# MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/user-management

# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/user-management
```

## Styling

The application uses:

- **Tailwind CSS** for utility-first styling
- **Dark theme** with slate colors (#0f172a, #1e293b, #475569)
- **Responsive design** that works on mobile, tablet, and desktop
- **Custom hover effects** with smooth transitions and animations

## Development

### Available Scripts

```bash
# Start development server
bun dev

# Build for production
bun run build

# Start production server
bun start

# Run linter
bun run lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running locally or check your connection string
- Verify credentials if using MongoDB Atlas
- Check `.env.local` file for correct URI

### Port Already in Use

- The app runs on port 3000 by default
- Change port: `PORT=3001 bun dev`

### Data Not Appearing

- Check browser console for errors
- Verify MongoDB connection
- Clear browser cache and refresh

## Future Enhancements

- User authentication and authorization
- Role-based access control
- Email verification
- Password hashing
- Pagination on backend
- Advanced filtering options
- User profile pictures
- Activity logging
- Export to CSV/PDF

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please check:

1. The project structure and file organization
2. MongoDB connection settings
3. Environment variables in `.env.local`
4. Browser console for error messages
