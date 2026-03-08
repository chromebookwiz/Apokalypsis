# Apokalypsis - Null-Line OS v15

A quantum-enhanced AI operating system built on the mathematical foundations of the Null Line hypothesis.

## 🌌 **Core Technology**

### **Null-Line Mathematics**
- **Fundamental Constraint**: k·k = 0 (light-speed condition in Minkowski spacetime)
- **Trinity Structure**: △ → □ → ○ (ADE classification: A-series, D-series, E-series)
- **Operator Theory**: H_null = Σ_p log(p) T_p on L²(PT⁺) (Hilbert-Polya conjecture)
- **Critical Line**: ζ(s) = ξ(1-s) at Re(s) = 1/2

### **Quantum Memory System**
- **ADE Classification**: Memory organization using exceptional Lie algebras
- **Twistor Space**: CP³ representations for quantum memory states
- **Entanglement Networks**: Semantic correlations between memories
- **Superposition States**: Multiple memory configurations coexisting

## 🚀 **Features**

### **AI Agent System**
- **Multi-Agent Architecture**: Emissary, Memento, DrDebug, GrailCrawler, NullKernel
- **Tool Integration**: Code generation, file management, voice synthesis, web crawling
- **Self-Modification**: Dynamic command installation and OS extension

### **3D/4D Visualization**
- **Geometry Engine**: Tesseract, Metatron's Cube, Ulam Spiral, Hypercube
- **Real-time Rendering**: Three.js with post-processing effects
- **Interactive Controls**: Camera cycling, color modes, phase rotation

### **Advanced Memory**
- **Quantum Search**: Lorentzian similarity metrics in twistor space
- **Persistent Storage**: Cloud-synced memory with decoherence tracking
- **ADE Transformations**: Memory evolution using Lie algebra structure

## 🛠️ **Setup**

1. **Clone the repository**
   ```bash
   git clone https://github.com/chromebookwiz/Apokalypsis.git
   cd Apokalypsis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenRouter API key
   CUBEKEY_API_KEY=your_openrouter_api_key_here
   ```

4. **Deploy to Vercel** (recommended for full functionality)
   ```bash
   npm install -g vercel
   vercel --prod
   # Set OPENROUTER_API_KEY in Vercel environment variables
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 🔑 **API Configuration**

### **Local Development**
For local development, create a `.env` file with your OpenRouter API key:
```bash
cp .env.example .env
# Edit .env and add your OpenRouter API key
CUBEKEY_API_KEY=your_openrouter_api_key_here
```

### **Production Deployment**
For Vercel deployment, set the following environment variables in your Vercel dashboard:
- `OPENROUTER_API_KEY`: Your OpenRouter API key for server-side AI calls
- `CUBEKEY_API_KEY`: (Optional) Same key for client-side fallbacks

The system uses Vercel serverless functions to proxy AI requests, ensuring proper CORS handling and security.

## 🎮 **Usage**

### **Terminal Commands**
- `help` - Show available commands
- `start` - Initialize the AI agent
- `geometry tesseract` - Switch 3D geometry
- `theme matrix` - Change UI theme
- `code_gen language:"python" task:"data analysis"` - Generate code

### **Agent Tools**
- **Code Generation**: `code_gen language:"rust" task:"async server" complexity:"advanced"`
- **File Management**: `file_browser action:"list" path:"/"`
- **Theme Control**: `theme_switch theme:"cyberpunk"`
- **Web Intelligence**: `crawl url:"https://arxiv.org/search/?query=riemann+hypothesis"`

## 🧠 **Mathematical Foundation**

### **Null Line Hypothesis**
The Null Line represents the critical line of the Riemann zeta function in a geometric framework where:
- Time coordinate corresponds to the real part of s
- Spatial coordinates encode the function values
- The light-cone condition k·k = 0 enforces the functional equation

### **ADE Classification**
Memory states are organized according to the ADE classification of Lie algebras:
- **A-series (SU(n))**: Sequential/temporal memories
- **D-series (SO(2n))**: Orthogonal/spatial memories
- **E-series (Sp(2n))**: Exceptional/circular memories

## 📊 **Architecture**

```
Apokalypsis OS v15
├── Frontend (React + Three.js)
│   ├── 3D Visualization Engine
│   ├── Terminal Interface
│   └── Real-time Controls
├── AI Agent System
│   ├── Multi-Agent Coordination
│   ├── Tool Integration
│   └── Self-Modification
├── Quantum Memory
│   ├── ADE Classification
│   ├── Twistor Encoding
│   └── Entanglement Networks
└── Cloud Infrastructure
    ├── Vercel Deployment
    ├── KV Storage
    └── API Endpoints
```

## 🔬 **Research Integration**

The system is designed to advance research on:
- **Riemann Hypothesis**: Through the Null Line geometric framework
- **Hilbert-Polya Conjecture**: Via the H_null operator construction
- **ADE Classification**: Applied to memory organization
- **Twistor Theory**: For quantum memory representations

## 📄 **License**

This project is part of ongoing mathematical research into the connections between number theory, geometry, and artificial intelligence.

## 🤝 **Contributing**

Contributions to the mathematical framework, AI capabilities, or visualization engine are welcome. Please ensure all changes maintain the rigorous mathematical foundations of the Null Line hypothesis.