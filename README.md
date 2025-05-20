 # 📝 My Blog Editor

A full-featured blog editor built with the **MERN stack** that supports drafting, auto-saving, tag management, and publishing blogs with a rich text interface powered by **Draft.js**.

## 🚀 Features

- ✍️ **Rich Text Editing** with Draft.js  
- 💾 **Auto-Save Drafts** every 5 seconds while typing and every 30 seconds as fallback  
- 🏷️ **Tagging System** using comma-separated inputs  
- 📂 **Draft vs Published View**:  
  - Drafts open in edit mode  
  - Published blogs are view-only  
- 📄 **Clean Blog Dashboard** to view and manage all blogs  

## 🛠️ Tech Stack

- **Frontend**: React, Draft.js, Tailwind CSS, Heroicons  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose)  
- **Routing**: React Router  
- **Icons**: Heroicons


## 📦 API Endpoints

| Method | Endpoint               | Description                  |
|--------|------------------------|------------------------------|
| GET    | `/api/blogs`           | Fetch all blogs              |
| GET    | `/api/blogs/:id`       | Fetch single blog by ID      |
| POST   | `/api/blogs/save-draft`| Save or update a draft       |
| POST   | `/api/blogs/publish`   | Publish a blog               |

## 🧪 How It Works

- Drafts are saved with status `"draft"` and can be resumed later.
- Published blogs have status `"published"` and are locked from further editing.
- Draft.js content is serialized as JSON and stored in MongoDB.
- Blogs are previewed as cards with tag chips, truncated content, and status indicators.

## 🔧 Setup & Run

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/my-blog-editor.git
   cd my-blog-editor
   ```
2. **Install dependencies**
   ```bash
   cd backend
   npm install
   cd frontend
   npm install
   ```
3. **Run the app**
*Backend*
   ```bash
   npm start
   ```
   *Frontend*
   ```bash
   npm start
   ```
