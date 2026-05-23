# 🔍 ARVision

> Real-time AI-powered object recognition web app — point your camera at anything and instantly learn about it.

🌐 **Live Demo:** [arvision-frontend.onrender.com](https://arvision-frontend.onrender.com)

---

## ✨ Features

- 📷 **Real-time Object Detection** — Camera se live objects detect karta hai using TensorFlow.js (COCO-SSD model)
- 🧠 **AI-Powered** — 80+ objects recognize karta hai browser mein hi, koi server call nahi
- 📖 **Wikipedia Integration** — Detected object ki info turant Wikipedia se fetch karta hai
- 🗂️ **Object Catalog** — Saare registered objects browse karo
- 🔐 **Admin Panel** — Objects add/edit/delete karo with JWT authentication
- 📱 **Mobile Friendly** — Camera access mobile pe bhi kaam karta hai

---

## 🛠️ Tech Stack

### Frontend
| Technology | Use |
|---|---|
| React 18 | UI Framework |
| Vite | Build Tool |
| TailwindCSS | Styling |
| TensorFlow.js + COCO-SSD | Object Detection (browser-side) |
| React Router DOM | Routing |

### Backend
| Technology | Use |
|---|---|
| Node.js + Express | REST API |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| bcryptjs | Password Hashing |

---

## 🚀 Local Setup

### Prerequisites
- Node.js v18+
- MongoDB (local ya Atlas)
- Git

### 1. Clone the repo
```bash
git clone https://github.com/rounakm20/ARvision.git
cd ARvision
```

### 2. Backend setup
```bash
cd backend
npm install
```

`.env` file banao `backend/` folder mein:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/arvision
JWT_SECRET=your_secret_key_here
```

Backend run karo:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd fontend
npm install
```

`.env` file banao `fontend/` folder mein:
```env
VITE_API_URL=http://localhost:5000
```

Frontend run karo:
```bash
npm run dev
```

App open hogi: **http://localhost:5173**

---

## 📁 Project Structure

```
ARvision/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.middleware.js # JWT auth
│   ├── models/
│   │   ├── Admin.model.js     # Admin schema
│   │   └── object.model.js    # Object schema
│   ├── routes/
│   │   ├── auth.routes.js     # Login/Register
│   │   ├── object.routes.js   # Objects CRUD
│   │   └── wiki.routes.js     # Wikipedia proxy
│   ├── server.js
│   └── package.json
│
└── fontend/
    ├── src/
    │   ├── components/        # Navbar, HeroSection, etc.
    │   ├── hooks/             # useCamera, useDetection, useWiki
    │   ├── pages/             # Home, Scanner, Catalog, Detail, Admin
    │   └── utils/
    │       └── api.js         # API calls
    ├── index.html
    └── package.json
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Admin register |
| POST | `/api/auth/login` | Admin login |
| GET | `/api/auth/me` | Current admin info |

### Objects
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/objects` | Saare active objects |
| GET | `/api/objects/:id` | Single object |
| GET | `/api/objects/label/:cocoLabel` | Label se dhundo |
| POST | `/api/objects` | Naya object add karo (auth) |
| PUT | `/api/objects/:id` | Object update karo (auth) |
| DELETE | `/api/objects/:id` | Object delete karo (auth) |

### Wikipedia
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/wiki/:query` | Wikipedia summary fetch |

---

## 🌐 Deployment

| Service | Platform |
|---|---|
| Frontend | Render (Static Site) |
| Backend | Render (Web Service) |
| Database | MongoDB Atlas |

---

## 👤 Admin Panel

`/admin` route pe jao → Login karo → Objects manage karo

Admin account banana ke liye `/api/auth/register` endpoint use karo (Postman se).

---

## 📸 How it Works

1. `/scanner` page pe jao
2. Camera permission allow karo
3. Camera kisi object ki taraf point karo
4. AI model object detect karega (60%+ confidence)
5. Object ki info automatically dikhegi
6. "Details" pe click karo full Wikipedia info ke liye

---

## 🙏 Credits

- [TensorFlow.js](https://www.tensorflow.org/js) — Browser-side ML
- [COCO-SSD Model](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd) — Object detection
- [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/) — Object information
- [Render](https://render.com) — Hosting

---

Made with ❤️ by [Rounak Mishra](https://github.com/rounakm20)
