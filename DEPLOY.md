Deployment targets: Render (backend) and Vercel (frontend)

Backend (Render):

1. Create a new Web Service on Render and connect your repository.
2. Set the build and start commands (or use the provided `render.yaml`):

   - Build command: `cd backend && npm ci`
   - Start command: `cd backend && npm start`

3. Add environment variables in the Render dashboard (do NOT commit secrets):

   - `MONGO_URI` (your production Mongo URI)
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `MAX_FILE_SIZE` (optional)

4. Deploy — Render will provide a public URL like `https://metmani-backend.onrender.com`.

Frontend (Vercel):

1. In Vercel, create a new project and import the `frontend` folder as the project root (or the repository and set the Root Directory to `frontend`).
2. Vercel will run `npm run build` by default. The Vite build output is `dist`.
3. Add an environment variable `VITE_API_URL` pointing to your backend URL (for example, `https://metmani-backend.onrender.com`).
4. Deploy — the site will be served from Vercel's domain.

Local development / linking frontend to backend:

1. For local dev, create a `frontend/.env` (we added a default) with:

   ```
   VITE_API_URL=http://localhost:5000
   ```

2. Start the backend (from `backend`):

   ```bash
   cd backend
   npm install
   npm run dev   # or `npm start` for production
   ```

3. Start the frontend (from `frontend`):

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. The frontend will call the backend using `VITE_API_URL`. For production, set `VITE_API_URL` in Vercel to your Render backend URL.

Notes & tips:
- The frontend now reads `VITE_API_URL` (fallback to `http://localhost:5000` for local dev). Configure this in Vercel under Project > Settings > Environment Variables.
- `render.yaml` is a simple template to help you create a Render service via repo-based deployment; fill `repo` and `branch` or use the dashboard.
- If you prefer a single origin, build the frontend locally (`cd frontend && npm run build`) and configure the backend to serve the `dist` folder.
